import { spawn } from "node:child_process";
import { createServer, type Server } from "node:http";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const ENTRY = fileURLToPath(new URL("../../src/index.ts", import.meta.url));

let server: Server;
let baseUrl: string;

beforeAll(async () => {
  server = createServer((_req, res) => {
    res.writeHead(401, { "content-type": "application/json" });
    res.end(JSON.stringify({ detail: "Invalid token." }));
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  if (typeof address === "string" || address === null) throw new Error("no port");
  baseUrl = `http://127.0.0.1:${address.port}`;
});

afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

function run(args: string[]): Promise<{ code: number | null; stdout: string; stderr: string }> {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, ["--import", "tsx", ENTRY, ...args], {
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk: Buffer) => (stdout += chunk.toString()));
    child.stderr.on("data", (chunk: Buffer) => (stderr += chunk.toString()));
    child.stdin.end();
    child.on("close", (code) => resolve({ code, stdout, stderr }));
  });
}

describe("cli", () => {
  it("prints usage and exits cleanly for --help", async () => {
    const result = await run(["--help"]);
    expect(result.code).toBe(0);
    expect(result.stdout).toContain("paperless-mcp");
  }, 30_000);

  it("exits 1 with an actionable message when the token is rejected", async () => {
    // Regression guard: exiting from the rejection handler while fetch sockets
    // were still closing aborted the process on Windows with a libuv
    // assertion, so clients saw a crash instead of the reason.
    const result = await run([baseUrl, "bad-token"]);

    expect(result.code).toBe(1);
    expect(result.stderr).toContain("Hint:");
    expect(result.stderr).not.toContain("Assertion failed");
  }, 30_000);

  it("keeps startup errors off stdout so the JSON-RPC stream stays clean", async () => {
    const result = await run([baseUrl, "bad-token"]);
    expect(result.stdout).toBe("");
  }, 30_000);
});
