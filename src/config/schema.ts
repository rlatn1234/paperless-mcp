import { z } from "zod";
import type { LogLevel } from "../runtime/logger.js";

/**
 * Toolsets partition the tool surface. paperless-ngx exposes well over a
 * hundred operations; registering all of them unconditionally would spend tens
 * of thousands of tokens on tool definitions alone and blunt the model's
 * ability to pick the right one. Operators opt in to what they need.
 */
export const TOOLSETS = [
  "core",
  "taxonomy",
  "search",
  "bulk",
  "views",
  "sharing",
  "workflows",
  "mail",
  "admin",
  "ai",
  "versions",
] as const;

export type Toolset = (typeof TOOLSETS)[number];

export const DEFAULT_TOOLSETS: readonly Toolset[] = ["core", "taxonomy", "search", "bulk"];

/**
 * `readonly` refuses to even register mutating tools, so a misbehaving model
 * cannot call what does not exist. `admin` additionally unlocks user, group and
 * instance-configuration tools.
 */
export type Mode = "readonly" | "write" | "admin";

export interface ResolvedConfig {
  baseUrl: string;
  token: string;
  transport: "stdio" | "http";
  port: number;
  toolsets: readonly Toolset[];
  mode: Mode;
  logLevel: LogLevel;
  downloadDir: string | undefined;
  /** Hard ceiling on the characters a single tool result may return. */
  maxResponseChars: number;
  /** Default page size for list tools when the caller does not pass one. */
  defaultPageSize: number;
  maxPageSize: number;
  /** Refuse destructive bulk operations touching more objects than this. */
  maxDestructive: number;
  requestTimeoutMs: number;
  uploadTimeoutMs: number;
  retries: number;
  /** Pin the negotiated API version instead of probing for it. */
  apiVersion: number | undefined;
  /**
   * Register the upstream (nloui/paperless-mcp) tool names as aliases.
   *
   * Off by default: an alias duplicates the whole input schema in `tools/list`,
   * and the schema is the expensive part — the aliases alone cost more than
   * every real tool's description put together. Migrators can switch them on.
   */
  legacyToolNames: boolean;
  /**
   * Also emit `structuredContent` alongside the rendered text.
   *
   * Off by default: most clients feed both to the model, so a JSON copy of what
   * the text already says doubles the token cost of every call.
   */
  structuredOutput: boolean;
}

export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ConfigError";
  }
}

/**
 * Accepts what people actually paste: trailing slashes, an accidental `/api`
 * suffix, a bare host. Returns an origin the HTTP layer can append `/api/...`
 * to.
 */
export function normalizeBaseUrl(raw: string): string {
  let value = raw.trim();
  if (!value) throw new ConfigError("paperless-ngx base URL is empty.");
  if (!/^https?:\/\//i.test(value)) value = `http://${value}`;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new ConfigError(`"${raw}" is not a valid URL. Example: https://paperless.example.com`);
  }

  let path = url.pathname.replace(/\/+$/, "");
  if (/\/api$/i.test(path)) path = path.slice(0, -4);
  return `${url.origin}${path}`;
}

export function parseToolsets(raw: string | undefined): readonly Toolset[] {
  if (!raw?.trim()) return DEFAULT_TOOLSETS;
  const requested = raw
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean);

  if (requested.includes("full") || requested.includes("all")) return TOOLSETS;

  const unknown = requested.filter((part) => !TOOLSETS.includes(part as Toolset));
  if (unknown.length > 0) {
    throw new ConfigError(
      `Unknown toolset(s): ${unknown.join(", ")}. Valid values: ${TOOLSETS.join(", ")}, full.`,
    );
  }
  return [...new Set(requested as Toolset[])];
}

const modeSchema = z.enum(["readonly", "write", "admin"]);
const logLevelSchema = z.enum(["debug", "info", "warn", "error", "silent"]);

function intFromEnv(value: string | undefined, fallback: number, label: string): number {
  if (value === undefined || value.trim() === "") return fallback;
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) {
    throw new ConfigError(`${label} must be a non-negative number, got "${value}".`);
  }
  return Math.floor(parsed);
}

function boolFromEnv(value: string | undefined, fallback: boolean): boolean {
  if (value === undefined || value.trim() === "") return fallback;
  return !["0", "false", "no", "off"].includes(value.trim().toLowerCase());
}

export interface CliArgs {
  positional: string[];
  http: boolean;
  port: number | undefined;
  verbose: boolean;
}

export function parseCliArgs(argv: readonly string[]): CliArgs {
  const positional: string[] = [];
  let http = false;
  let port: number | undefined;
  let verbose = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index] as string;
    if (arg === "--http") {
      http = true;
    } else if (arg === "--verbose" || arg === "-v") {
      verbose = true;
    } else if (arg === "--port") {
      const next = argv[index + 1];
      if (next === undefined) throw new ConfigError("--port requires a value.");
      const parsed = Number(next);
      if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 65535) {
        throw new ConfigError(`--port must be a valid port number, got "${next}".`);
      }
      port = parsed;
      index += 1;
    } else if (arg.startsWith("--port=")) {
      const parsed = Number(arg.slice("--port=".length));
      if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 65535) {
        throw new ConfigError(`--port must be a valid port number, got "${arg}".`);
      }
      port = parsed;
    } else if (arg.startsWith("-")) {
      throw new ConfigError(`Unknown option "${arg}".`);
    } else {
      positional.push(arg);
    }
  }

  return { positional, http, port, verbose };
}

export const USAGE = `paperless-mcp — MCP server for paperless-ngx

Usage:
  paperless-mcp <baseUrl> <token>            start on stdio
  paperless-mcp --http [--port 3000]         start an HTTP server

Credentials may also come from the environment:
  PAPERLESS_URL           base URL of the paperless-ngx instance
  PAPERLESS_API_KEY       API token (aliases: API_KEY, PAPERLESS_TOKEN)

Options:
  --http                  serve Streamable HTTP instead of stdio
  --port <n>              HTTP port (default 3000, or PORT)
  --verbose               debug logging on stderr

Environment:
  PAPERLESS_TOOLSETS      comma list of ${TOOLSETS.join(",")} or "full"
                          (default: ${DEFAULT_TOOLSETS.join(",")})
  PAPERLESS_MODE          readonly | write | admin        (default: write)
  PAPERLESS_DOWNLOAD_DIR  where downloaded files are written
  PAPERLESS_LOG_LEVEL     debug | info | warn | error | silent
  PAPERLESS_API_VERSION   pin the API version instead of probing
  PAPERLESS_MAX_DESTRUCTIVE  max objects a destructive bulk call may touch
  PAPERLESS_TIMEOUT_MS    per-request timeout (default 30000)
  PAPERLESS_LEGACY_TOOL_NAMES=1  also expose the upstream tool names as aliases
`;

export function resolveConfig(argv: readonly string[], env: NodeJS.ProcessEnv): ResolvedConfig {
  const cli = parseCliArgs(argv);

  const rawBaseUrl = cli.positional[0] ?? env["PAPERLESS_URL"] ?? env["PAPERLESS_BASE_URL"];
  const token =
    cli.positional[1] ?? env["PAPERLESS_API_KEY"] ?? env["PAPERLESS_TOKEN"] ?? env["API_KEY"];

  if (!rawBaseUrl || !token) {
    throw new ConfigError(`Missing paperless-ngx URL and/or API token.\n\n${USAGE}`);
  }

  const modeResult = modeSchema.safeParse(env["PAPERLESS_MODE"] ?? "write");
  if (!modeResult.success) {
    throw new ConfigError(
      `PAPERLESS_MODE must be one of readonly, write, admin (got "${env["PAPERLESS_MODE"]}").`,
    );
  }

  const envLevel = env["PAPERLESS_LOG_LEVEL"];
  const levelResult = logLevelSchema.safeParse(cli.verbose ? "debug" : (envLevel ?? "info"));
  if (!levelResult.success) {
    throw new ConfigError(
      `PAPERLESS_LOG_LEVEL must be one of debug, info, warn, error, silent (got "${envLevel}").`,
    );
  }

  const apiVersionRaw = env["PAPERLESS_API_VERSION"];
  let apiVersion: number | undefined;
  if (apiVersionRaw !== undefined && apiVersionRaw.trim() !== "") {
    const parsed = Number(apiVersionRaw);
    if (!Number.isInteger(parsed) || parsed < 1) {
      throw new ConfigError(
        `PAPERLESS_API_VERSION must be a positive integer, got "${apiVersionRaw}".`,
      );
    }
    apiVersion = parsed;
  }

  const maxPageSize = intFromEnv(env["PAPERLESS_MAX_PAGE_SIZE"], 100, "PAPERLESS_MAX_PAGE_SIZE");
  const defaultPageSize = Math.min(
    intFromEnv(env["PAPERLESS_PAGE_SIZE"], 25, "PAPERLESS_PAGE_SIZE"),
    maxPageSize,
  );

  const downloadDir = env["PAPERLESS_DOWNLOAD_DIR"]?.trim();

  return {
    baseUrl: normalizeBaseUrl(rawBaseUrl),
    token,
    transport: cli.http ? "http" : "stdio",
    port: cli.port ?? intFromEnv(env["PORT"], 3000, "PORT"),
    toolsets: parseToolsets(env["PAPERLESS_TOOLSETS"]),
    mode: modeResult.data,
    logLevel: levelResult.data,
    downloadDir: downloadDir ? downloadDir : undefined,
    maxResponseChars: intFromEnv(
      env["PAPERLESS_MAX_RESPONSE_CHARS"],
      8000,
      "PAPERLESS_MAX_RESPONSE_CHARS",
    ),
    defaultPageSize,
    maxPageSize,
    maxDestructive: intFromEnv(env["PAPERLESS_MAX_DESTRUCTIVE"], 50, "PAPERLESS_MAX_DESTRUCTIVE"),
    requestTimeoutMs: intFromEnv(env["PAPERLESS_TIMEOUT_MS"], 30_000, "PAPERLESS_TIMEOUT_MS"),
    uploadTimeoutMs: intFromEnv(
      env["PAPERLESS_UPLOAD_TIMEOUT_MS"],
      300_000,
      "PAPERLESS_UPLOAD_TIMEOUT_MS",
    ),
    retries: intFromEnv(env["PAPERLESS_RETRIES"], 3, "PAPERLESS_RETRIES"),
    apiVersion,
    legacyToolNames: boolFromEnv(env["PAPERLESS_LEGACY_TOOL_NAMES"], false),
    structuredOutput: boolFromEnv(env["PAPERLESS_STRUCTURED_OUTPUT"], false),
  };
}
