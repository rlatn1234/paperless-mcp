import { describe, expect, it } from "vitest";

import {
  ConfigError,
  DEFAULT_TOOLSETS,
  normalizeBaseUrl,
  parseCliArgs,
  parseToolsets,
  resolveConfig,
  TOOLSETS,
} from "../../src/config/schema.js";

describe("normalizeBaseUrl", () => {
  it("keeps a plain origin unchanged", () => {
    expect(normalizeBaseUrl("https://paperless.example.com")).toBe("https://paperless.example.com");
  });

  it("strips trailing slashes", () => {
    expect(normalizeBaseUrl("https://paperless.example.com///")).toBe(
      "https://paperless.example.com",
    );
  });

  it("strips an accidental /api suffix so paths are not doubled", () => {
    expect(normalizeBaseUrl("https://paperless.example.com/api/")).toBe(
      "https://paperless.example.com",
    );
  });

  it("preserves a sub-path deployment", () => {
    expect(normalizeBaseUrl("https://host.example.com/paperless/")).toBe(
      "https://host.example.com/paperless",
    );
  });

  it("assumes http:// when no scheme is given", () => {
    expect(normalizeBaseUrl("localhost:8000")).toBe("http://localhost:8000");
  });

  it("rejects an empty value", () => {
    expect(() => normalizeBaseUrl("   ")).toThrow(ConfigError);
  });
});

describe("parseToolsets", () => {
  it("falls back to the default profile", () => {
    expect(parseToolsets(undefined)).toEqual(DEFAULT_TOOLSETS);
  });

  it("expands full to every toolset", () => {
    expect(parseToolsets("full")).toEqual(TOOLSETS);
  });

  it("parses and de-duplicates a list", () => {
    expect(parseToolsets("core, admin ,core")).toEqual(["core", "admin"]);
  });

  it("rejects unknown names instead of silently ignoring them", () => {
    expect(() => parseToolsets("core,nope")).toThrow(/Unknown toolset/);
  });
});

describe("parseCliArgs", () => {
  it("reads positional url and token", () => {
    const args = parseCliArgs(["https://p.example", "token123"]);
    expect(args.positional).toEqual(["https://p.example", "token123"]);
    expect(args.http).toBe(false);
  });

  it("supports --port with a separate value and with =", () => {
    expect(parseCliArgs(["--http", "--port", "8080"]).port).toBe(8080);
    expect(parseCliArgs(["--http", "--port=8081"]).port).toBe(8081);
  });

  it("rejects unknown flags", () => {
    expect(() => parseCliArgs(["--nope"])).toThrow(ConfigError);
  });
});

describe("resolveConfig", () => {
  it("prefers CLI positionals over the environment", () => {
    const config = resolveConfig(["https://cli.example", "cli-token"], {
      PAPERLESS_URL: "https://env.example",
      PAPERLESS_API_KEY: "env-token",
    });
    expect(config.baseUrl).toBe("https://cli.example");
    expect(config.token).toBe("cli-token");
  });

  it("accepts the upstream API_KEY variable name", () => {
    const config = resolveConfig([], {
      PAPERLESS_URL: "https://env.example",
      API_KEY: "legacy-token",
    });
    expect(config.token).toBe("legacy-token");
  });

  it("explains what is missing rather than failing obscurely", () => {
    expect(() => resolveConfig([], {})).toThrow(/Missing paperless-ngx URL/);
  });

  it("maps --verbose onto debug logging", () => {
    const config = resolveConfig(["https://p.example", "t", "--verbose"], {});
    expect(config.logLevel).toBe("debug");
  });

  it("clamps the default page size to the maximum", () => {
    const config = resolveConfig(["https://p.example", "t"], {
      PAPERLESS_PAGE_SIZE: "500",
      PAPERLESS_MAX_PAGE_SIZE: "100",
    });
    expect(config.defaultPageSize).toBe(100);
  });

  it("rejects a nonsensical mode", () => {
    expect(() => resolveConfig(["https://p.example", "t"], { PAPERLESS_MODE: "sudo" })).toThrow(
      /PAPERLESS_MODE/,
    );
  });
});
