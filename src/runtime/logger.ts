/**
 * Structured logger.
 *
 * Every line goes to **stderr**. In stdio transport mode stdout carries the
 * JSON-RPC stream, so a single stray `console.log` corrupts the session.
 */

export type LogLevel = "debug" | "info" | "warn" | "error" | "silent";

const LEVEL_VALUE: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
  silent: 99,
};

/** Keys whose values must never reach a log line. */
const SECRET_KEY =
  /^(authorization|token|api[_-]?key|password|secret|cookie|set-cookie|refresh_token|access_token)$/i;

const REDACTED = "[redacted]";

/** Recursively replace secret-looking values. Depth-capped to stay cheap. */
export function redact(value: unknown, depth = 0): unknown {
  if (depth > 6) return "[deep]";
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map((item) => redact(item, depth + 1));
  if (value instanceof Error) return { name: value.name, message: value.message };

  const out: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    out[key] = SECRET_KEY.test(key) ? REDACTED : redact(item, depth + 1);
  }
  return out;
}

export interface Logger {
  debug(message: string, fields?: Record<string, unknown>): void;
  info(message: string, fields?: Record<string, unknown>): void;
  warn(message: string, fields?: Record<string, unknown>): void;
  error(message: string, fields?: Record<string, unknown>): void;
  child(bindings: Record<string, unknown>): Logger;
  readonly level: LogLevel;
}

function write(
  level: Exclude<LogLevel, "silent">,
  threshold: number,
  bindings: Record<string, unknown>,
  message: string,
  fields?: Record<string, unknown>,
): void {
  if (LEVEL_VALUE[level] < threshold) return;
  const line = {
    time: new Date().toISOString(),
    level,
    msg: message,
    ...bindings,
    ...(fields ? (redact(fields) as Record<string, unknown>) : {}),
  };
  process.stderr.write(`${JSON.stringify(line)}\n`);
}

export function createLogger(
  level: LogLevel = "info",
  bindings: Record<string, unknown> = {},
): Logger {
  const threshold = LEVEL_VALUE[level];
  return {
    level,
    debug: (message, fields) => write("debug", threshold, bindings, message, fields),
    info: (message, fields) => write("info", threshold, bindings, message, fields),
    warn: (message, fields) => write("warn", threshold, bindings, message, fields),
    error: (message, fields) => write("error", threshold, bindings, message, fields),
    child: (extra) => createLogger(level, { ...bindings, ...extra }),
  };
}

/** Logger that swallows everything — used in tests. */
export function silentLogger(): Logger {
  return createLogger("silent");
}
