import type { ResolvedConfig } from "../../src/config/schema.js";

export function testConfig(overrides: Partial<ResolvedConfig> = {}): ResolvedConfig {
  return {
    baseUrl: "http://paperless.test",
    token: "test-token",
    transport: "stdio",
    port: 3000,
    toolsets: ["core", "taxonomy", "search", "bulk"],
    mode: "write",
    logLevel: "silent",
    downloadDir: undefined,
    maxResponseChars: 8000,
    defaultPageSize: 25,
    maxPageSize: 100,
    maxDestructive: 50,
    requestTimeoutMs: 5000,
    uploadTimeoutMs: 5000,
    retries: 0,
    apiVersion: undefined,
    legacyToolNames: false,
    structuredOutput: false,
    ...overrides,
  };
}
