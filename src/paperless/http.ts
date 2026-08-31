import type { Logger } from "../runtime/logger.js";
import { httpError, networkError } from "./errors.js";

export type QueryValue = string | number | boolean | null | undefined | Array<string | number>;
export type QueryParams = Record<string, QueryValue>;

export interface RequestOptions {
  method?: string;
  query?: QueryParams;
  /** JSON request body. Mutually exclusive with `form`. */
  json?: unknown;
  /** Multipart body, used for uploads. */
  form?: FormData;
  headers?: Record<string, string>;
  timeoutMs?: number;
  signal?: AbortSignal;
  accept?: string;
}

export interface PaperlessHttpOptions {
  baseUrl: string;
  token: string;
  logger: Logger;
  retries?: number;
  timeoutMs?: number;
  uploadTimeoutMs?: number;
  /** API version to request; `undefined` lets the server pick its default. */
  apiVersion?: number | undefined;
}

const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);
const IDEMPOTENT_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
const MAX_BACKOFF_MS = 8_000;

/** DRF routes require the trailing slash; APPEND_SLASH redirects lose the body on POST. */
export function normalizePath(path: string): string {
  let value = path.startsWith("/") ? path : `/${path}`;
  const queryIndex = value.indexOf("?");
  if (queryIndex !== -1) value = value.slice(0, queryIndex);
  if (!value.endsWith("/")) value = `${value}/`;
  return value;
}

export function buildQuery(query: QueryParams | undefined): string {
  if (!query) return "";
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value)) {
      if (value.length === 0) continue;
      // paperless-ngx filters (`tags__id__in`, `fields`, …) take comma-separated lists.
      params.set(key, value.join(","));
    } else {
      params.set(key, String(value));
    }
  }
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

function backoffMs(attempt: number, retryAfterHeader: string | null): number {
  if (retryAfterHeader) {
    const seconds = Number(retryAfterHeader);
    if (Number.isFinite(seconds) && seconds >= 0) {
      return Math.min(seconds * 1000, MAX_BACKOFF_MS);
    }
  }
  const base = Math.min(300 * 2 ** attempt, MAX_BACKOFF_MS);
  return base + Math.floor(Math.random() * 250);
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Thin transport over the paperless-ngx REST API.
 *
 * Owns authentication, API-version negotiation, timeouts, retries and error
 * normalization. It knows nothing about documents or tags — resource clients
 * layer that on top.
 */
export class PaperlessHttp {
  readonly baseUrl: string;
  #token: string;
  #logger: Logger;
  #retries: number;
  #timeoutMs: number;
  #uploadTimeoutMs: number;
  #apiVersion: number | undefined;

  constructor(options: PaperlessHttpOptions) {
    this.baseUrl = options.baseUrl.replace(/\/+$/, "");
    this.#token = options.token;
    this.#logger = options.logger;
    this.#retries = options.retries ?? 3;
    this.#timeoutMs = options.timeoutMs ?? 30_000;
    this.#uploadTimeoutMs = options.uploadTimeoutMs ?? 300_000;
    this.#apiVersion = options.apiVersion;
  }

  get apiVersion(): number | undefined {
    return this.#apiVersion;
  }

  /** Called by the capability probe once the server's ceiling is known. */
  setApiVersion(version: number | undefined): void {
    this.#apiVersion = version;
  }

  url(path: string, query?: QueryParams): string {
    return `${this.baseUrl}/api${normalizePath(path)}${buildQuery(query)}`;
  }

  #headers(options: RequestOptions): Headers {
    const headers = new Headers();
    headers.set("Authorization", `Token ${this.#token}`);
    headers.set(
      "Accept",
      options.accept ??
        (this.#apiVersion === undefined
          ? "application/json"
          : `application/json; version=${this.#apiVersion}`),
    );
    if (options.json !== undefined) headers.set("Content-Type", "application/json");
    for (const [key, value] of Object.entries(options.headers ?? {})) {
      headers.set(key, value);
    }
    return headers;
  }

  /** Issues the request, retrying transient failures. Returns the raw Response. */
  async raw(path: string, options: RequestOptions = {}): Promise<Response> {
    const method = (options.method ?? "GET").toUpperCase();
    const target = this.url(path, options.query);
    const timeoutMs = options.timeoutMs ?? (options.form ? this.#uploadTimeoutMs : this.#timeoutMs);

    let attempt = 0;
    for (;;) {
      const timeoutSignal = AbortSignal.timeout(timeoutMs);
      const signal = options.signal
        ? AbortSignal.any([options.signal, timeoutSignal])
        : timeoutSignal;

      const started = Date.now();
      let response: Response;
      try {
        const init: RequestInit = { method, headers: this.#headers(options), signal };
        if (options.json !== undefined) init.body = JSON.stringify(options.json);
        else if (options.form !== undefined) init.body = options.form;
        response = await fetch(target, init);
      } catch (cause) {
        // A caller-driven abort is not a transport failure; surface it as-is.
        if (options.signal?.aborted) throw networkError(cause, method, path);
        if (attempt < this.#retries && !(cause instanceof Error && cause.name === "TimeoutError")) {
          const delay = backoffMs(attempt, null);
          this.#logger.debug("request failed, retrying", { method, path, attempt, delay });
          attempt += 1;
          await sleep(delay);
          continue;
        }
        throw networkError(cause, method, path);
      }

      this.#logger.debug("paperless request", {
        method,
        path,
        status: response.status,
        ms: Date.now() - started,
        attempt,
      });

      const retryable =
        RETRYABLE_STATUS.has(response.status) &&
        (response.status === 429 || IDEMPOTENT_METHODS.has(method));

      if (retryable && attempt < this.#retries) {
        const delay = backoffMs(attempt, response.headers.get("retry-after"));
        this.#logger.warn("paperless transient failure, retrying", {
          method,
          path,
          status: response.status,
          attempt,
          delay,
        });
        attempt += 1;
        // Drain so the socket can be reused.
        await response.arrayBuffer().catch(() => undefined);
        await sleep(delay);
        continue;
      }

      if (!response.ok) throw httpError(response.status, await readBody(response), method, path);
      return response;
    }
  }

  /** Issues the request and decodes a JSON body. `204 No Content` yields `undefined`. */
  async json<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const response = await this.raw(path, options);
    if (response.status === 204) return undefined as T;
    const text = await response.text();
    if (!text) return undefined as T;
    try {
      return JSON.parse(text) as T;
    } catch (cause) {
      throw httpError(
        response.status,
        `Expected JSON but got: ${text.slice(0, 200)}`,
        (options.method ?? "GET").toUpperCase(),
        path,
      );
    }
  }
}

async function readBody(response: Response): Promise<unknown> {
  const text = await response.text().catch(() => "");
  if (!text) return undefined;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}
