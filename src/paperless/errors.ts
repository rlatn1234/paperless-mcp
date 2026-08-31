/**
 * Normalized paperless-ngx API errors.
 *
 * The upstream server speaks Django REST Framework, which reports problems in
 * several shapes: `{"detail": "..."}`, `{"field": ["msg"]}`, a bare string, or
 * HTML for proxy-level failures. Callers should never have to care — every
 * failure surfaces as a `PaperlessError` carrying a machine-readable code and a
 * `hint` that tells the model what to try next.
 */

export type PaperlessErrorCode =
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "validation"
  | "conflict"
  | "rate_limited"
  | "server_error"
  | "network"
  | "timeout"
  | "unsupported"
  | "unknown";

export interface PaperlessErrorInit {
  code: PaperlessErrorCode;
  message: string;
  status?: number;
  detail?: string;
  fieldErrors?: Record<string, string[]>;
  hint?: string;
  method?: string;
  path?: string;
  cause?: unknown;
}

export class PaperlessError extends Error {
  readonly code: PaperlessErrorCode;
  readonly status: number | undefined;
  readonly detail: string | undefined;
  readonly fieldErrors: Record<string, string[]> | undefined;
  readonly hint: string | undefined;
  readonly method: string | undefined;
  readonly path: string | undefined;

  constructor(init: PaperlessErrorInit) {
    super(init.message, init.cause === undefined ? undefined : { cause: init.cause });
    this.name = "PaperlessError";
    this.code = init.code;
    this.status = init.status;
    this.detail = init.detail;
    this.fieldErrors = init.fieldErrors;
    this.hint = init.hint;
    this.method = init.method;
    this.path = init.path;
  }

  /** Multi-line rendering handed to the model when a tool call fails. */
  toToolText(): string {
    const lines = [this.message];
    if (this.detail && this.detail !== this.message) lines.push(this.detail);
    if (this.fieldErrors) {
      for (const [field, messages] of Object.entries(this.fieldErrors)) {
        lines.push(`  - ${field}: ${messages.join("; ")}`);
      }
    }
    if (this.hint) lines.push(`Hint: ${this.hint}`);
    return lines.join("\n");
  }
}

function codeForStatus(status: number): PaperlessErrorCode {
  if (status === 401) return "unauthorized";
  if (status === 403) return "forbidden";
  if (status === 404) return "not_found";
  if (status === 409) return "conflict";
  if (status === 429) return "rate_limited";
  if (status === 400 || status === 422) return "validation";
  if (status >= 500) return "server_error";
  return "unknown";
}

function hintForStatus(status: number, method: string, path: string): string | undefined {
  switch (status) {
    case 401:
      return "The API token was rejected. Check PAPERLESS_API_KEY / the token argument, and that it belongs to this paperless instance.";
    case 403:
      return "Authenticated but not permitted. The token's user may lack object permissions, or the object is owned by another user.";
    case 404:
      return `No object at ${method} ${path}. Verify the id with the matching list tool, or the endpoint may not exist on this paperless-ngx version.`;
    case 405:
      return "This paperless-ngx version does not accept that HTTP method here — the feature may have been added in a later release.";
    case 413:
      return "The upload exceeded the server limit. Split the file or raise the reverse-proxy body size limit.";
    case 429:
      return "Rate limited. Retries were already attempted; wait before issuing more calls.";
    default:
      if (status >= 500) {
        return "paperless-ngx returned a server error. Check the instance logs (log_list tool, or docker logs) for the traceback.";
      }
      return undefined;
  }
}

/** Pull a human message plus per-field errors out of a DRF error body. */
function parseBody(body: unknown): { detail?: string; fieldErrors?: Record<string, string[]> } {
  if (typeof body === "string") {
    const trimmed = body.trim();
    if (!trimmed) return {};
    // Proxy/HTML error pages are noise — keep a short excerpt only.
    if (trimmed.startsWith("<")) return { detail: `${trimmed.slice(0, 200)}…` };
    return { detail: trimmed.slice(0, 1000) };
  }
  if (!body || typeof body !== "object") return {};

  const record = body as Record<string, unknown>;
  if (typeof record["detail"] === "string") return { detail: record["detail"] };

  const fieldErrors: Record<string, string[]> = {};
  for (const [key, value] of Object.entries(record)) {
    if (Array.isArray(value)) {
      fieldErrors[key] = value.map((item) => String(item));
    } else if (typeof value === "string") {
      fieldErrors[key] = [value];
    }
  }
  if (Object.keys(fieldErrors).length > 0) return { fieldErrors };
  return { detail: JSON.stringify(body).slice(0, 1000) };
}

export function httpError(
  status: number,
  body: unknown,
  method: string,
  path: string,
): PaperlessError {
  const { detail, fieldErrors } = parseBody(body);
  const code = codeForStatus(status);
  const init: PaperlessErrorInit = {
    code,
    status,
    message: `paperless-ngx ${method} ${path} failed with HTTP ${status}`,
    method,
    path,
  };
  if (detail !== undefined) init.detail = detail;
  if (fieldErrors !== undefined) init.fieldErrors = fieldErrors;
  const hint = hintForStatus(status, method, path);
  if (hint !== undefined) init.hint = hint;
  return new PaperlessError(init);
}

export function networkError(cause: unknown, method: string, path: string): PaperlessError {
  const aborted =
    cause instanceof Error && (cause.name === "AbortError" || cause.name === "TimeoutError");
  return new PaperlessError({
    code: aborted ? "timeout" : "network",
    message: aborted
      ? `paperless-ngx ${method} ${path} timed out`
      : `Could not reach paperless-ngx for ${method} ${path}`,
    hint: aborted
      ? "Raise PAPERLESS_TIMEOUT_MS, or narrow the request (smaller page_size, fewer documents)."
      : "Check PAPERLESS_URL, that the instance is running, and that this host can reach it.",
    method,
    path,
    cause,
  });
}

export function unsupported(feature: string, reason: string): PaperlessError {
  return new PaperlessError({
    code: "unsupported",
    message: `${feature} is not available on this paperless-ngx instance`,
    detail: reason,
    hint: "Upgrade paperless-ngx, or use an equivalent tool that works on this version.",
  });
}

export function toPaperlessError(error: unknown): PaperlessError {
  if (error instanceof PaperlessError) return error;
  if (error instanceof Error) {
    return new PaperlessError({ code: "unknown", message: error.message, cause: error });
  }
  return new PaperlessError({ code: "unknown", message: String(error) });
}
