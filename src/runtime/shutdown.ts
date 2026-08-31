/**
 * Ends the process without calling `process.exit()` directly.
 *
 * Calling `process.exit()` from a rejection handler while fetch still has
 * sockets closing aborts the process on Windows with a libuv assertion
 * (`!(handle->flags & UV_HANDLE_CLOSING)`), so the client sees a crash instead
 * of the error message and a clean exit code. Setting `exitCode` lets the loop
 * drain first; the unref'd timer is a backstop for anything that refuses to
 * let go.
 */
export function endProcess(code: number, graceMs = 2000): void {
  process.exitCode = code;
  setTimeout(() => {
    process.exit(code);
  }, graceMs).unref();
}
