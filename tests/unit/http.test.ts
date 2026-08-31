import { afterEach, describe, expect, it, vi } from "vitest";

import { PaperlessError } from "../../src/paperless/errors.js";
import { buildQuery, normalizePath, PaperlessHttp } from "../../src/paperless/http.js";
import { silentLogger } from "../../src/runtime/logger.js";

function client(overrides: Partial<ConstructorParameters<typeof PaperlessHttp>[0]> = {}) {
  return new PaperlessHttp({
    baseUrl: "http://paperless.test",
    token: "secret-token",
    logger: silentLogger(),
    retries: 0,
    timeoutMs: 1000,
    ...overrides,
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("normalizePath", () => {
  it("adds the leading and trailing slash DRF requires", () => {
    expect(normalizePath("documents")).toBe("/documents/");
  });

  it("drops a query string so it cannot be double-encoded", () => {
    expect(normalizePath("/documents/?page=2")).toBe("/documents/");
  });
});

describe("buildQuery", () => {
  it("omits empty values", () => {
    expect(buildQuery({ a: undefined, b: null, c: "" })).toBe("");
  });

  it("joins arrays with commas the way paperless filters expect", () => {
    expect(buildQuery({ tags__id__in: [3, 7] })).toBe("?tags__id__in=3%2C7");
  });

  it("serializes booleans", () => {
    expect(buildQuery({ is_tagged: false })).toBe("?is_tagged=false");
  });
});

describe("PaperlessHttp", () => {
  it("sends token auth and the negotiated API version", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const http = client({ apiVersion: 9 });
    await http.json("/documents/");

    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("http://paperless.test/api/documents/");
    const headers = new Headers(init.headers);
    expect(headers.get("authorization")).toBe("Token secret-token");
    expect(headers.get("accept")).toBe("application/json; version=9");
  });

  it("omits the version parameter until one is negotiated", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await client().json("/documents/");

    const [, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(new Headers(init.headers).get("accept")).toBe("application/json");
  });

  it("returns undefined for 204 rather than failing to parse", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response(null, { status: 204 })),
    );
    await expect(client().json("/tags/1/", { method: "DELETE" })).resolves.toBeUndefined();
  });

  it("turns a DRF field-error body into a structured error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () =>
          new Response(JSON.stringify({ name: ["tag with this name already exists."] }), {
            status: 400,
          }),
      ),
    );

    const error = await client()
      .json("/tags/", { method: "POST", json: { name: "Invoice" } })
      .catch((caught: unknown) => caught);

    expect(error).toBeInstanceOf(PaperlessError);
    const paperlessError = error as PaperlessError;
    expect(paperlessError.code).toBe("validation");
    expect(paperlessError.fieldErrors).toEqual({
      name: ["tag with this name already exists."],
    });
    expect(paperlessError.toToolText()).toContain("name: tag with this name already exists.");
  });

  it("explains a rejected token", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(
        async () => new Response(JSON.stringify({ detail: "Invalid token." }), { status: 401 }),
      ),
    );

    const error = (await client()
      .json("/documents/")
      .catch((caught: unknown) => caught)) as PaperlessError;

    expect(error.code).toBe("unauthorized");
    expect(error.hint).toMatch(/API token/);
  });

  it("retries a 503 on idempotent requests", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(new Response("", { status: 503 }))
      .mockResolvedValueOnce(new Response(JSON.stringify({ ok: true }), { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(client({ retries: 2 }).json("/documents/")).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("does not retry a failed POST, to avoid duplicating writes", async () => {
    const fetchMock = vi.fn(async () => new Response("", { status: 500 }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(
      client({ retries: 2 }).json("/documents/post_document/", { method: "POST", json: {} }),
    ).rejects.toBeInstanceOf(PaperlessError);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
