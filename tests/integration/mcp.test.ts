import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { afterEach, describe, expect, it } from "vitest";
import type { ResolvedConfig } from "../../src/config/schema.js";
import { createSession } from "../../src/runtime/createServer.js";
import { silentLogger } from "../../src/runtime/logger.js";
import { testConfig } from "../helpers/config.js";
import { installFakePaperless, type RecordedRequest } from "../helpers/fakePaperless.js";

let cleanup: Array<() => void | Promise<void>> = [];

afterEach(async () => {
  for (const fn of cleanup.reverse()) await fn();
  cleanup = [];
});

async function connect(config: ResolvedConfig = testConfig()) {
  const { server, registration } = await createSession(config, silentLogger());
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "test", version: "0" });

  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  cleanup.push(async () => {
    await client.close();
    await server.close();
  });

  return { client, registration };
}

function textOf(result: CallToolResult): string {
  return result.content
    .filter((block): block is { type: "text"; text: string } => block.type === "text")
    .map((block) => block.text)
    .join("\n");
}

describe("MCP surface", () => {
  it("lists the document and taxonomy tools", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const { client } = await connect();
    const { tools } = await client.listTools();
    const names = tools.map((tool) => tool.name);

    expect(names).toContain("document_search");
    expect(names).toContain("document_get");
    expect(names).toContain("tag_list");
    expect(names).toContain("documents_bulk_edit");
    // Aliases are opt-in: each one duplicates a full input schema in the
    // listing, which is the expensive part of the tool budget.
    expect(names).not.toContain("search_documents");
  });

  it("exposes the upstream names when legacy aliases are enabled", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const { client } = await connect(testConfig({ legacyToolNames: true }));
    const names = (await client.listTools()).tools.map((tool) => tool.name);

    expect(names).toContain("document_search");
    expect(names).toContain("search_documents");
    expect(names).toContain("bulk_edit_tags");
  });

  it("returns tool output as text content, not an empty result", async () => {
    // Regression guard for the upstream defect: handlers returned raw API
    // objects, which the SDK parses into `content: []`, so nothing reached the
    // model.
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const { client } = await connect();
    const result = (await client.callTool({ name: "tag_list", arguments: {} })) as CallToolResult;

    expect(result.isError).toBeFalsy();
    expect(result.content.length).toBeGreaterThan(0);
    expect(textOf(result)).toContain("Invoice");
  });

  it("renders search hits with names instead of bare foreign keys", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const { client } = await connect();
    const result = (await client.callTool({
      name: "document_search",
      arguments: { query: "invoice" },
    })) as CallToolResult;

    const text = textOf(result);
    expect(text).toContain("ACME invoice 2026-04");
    expect(text).toContain("ACME Ltd");
    expect(text).toContain("Invoice");
  });

  it("asks paperless to omit OCR bodies from search results", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const { client } = await connect();
    await client.callTool({ name: "document_search", arguments: { query: "invoice" } });

    const search = fake.requests.find(
      (request: RecordedRequest) =>
        request.path === "/api/documents/" && request.query.get("query") === "invoice",
    );
    expect(search).toBeDefined();
    const fields = search?.query.get("fields") ?? "";
    expect(fields).toContain("title");
    expect(fields).not.toContain("content");
  });

  it("reports API failures in-band so the model can recover", async () => {
    const fake = installFakePaperless({
      "GET /api/documents/404/": () => ({ status: 404, json: { detail: "Not found." } }),
    });
    cleanup.push(fake.restore);

    const { client } = await connect();
    const result = (await client.callTool({
      name: "document_get",
      arguments: { id: 404 },
    })) as CallToolResult;

    expect(result.isError).toBe(true);
    expect(textOf(result)).toMatch(/Hint:/);
  });

  it("refuses a destructive bulk edit without confirmation", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const { client } = await connect();
    const result = (await client.callTool({
      name: "documents_bulk_edit",
      arguments: { documents: [100], method: "delete" },
    })) as CallToolResult;

    expect(result.isError).toBe(true);
    expect(textOf(result)).toMatch(/confirmation/i);
    expect(
      fake.requests.some((request) => request.path === "/api/documents/bulk_edit/"),
      "no write should have been attempted",
    ).toBe(false);
  });

  it("hides mutating tools entirely in read-only mode", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const { client } = await connect(testConfig({ mode: "readonly" }));
    const names = (await client.listTools()).tools.map((tool) => tool.name);

    expect(names).toContain("document_search");
    expect(names).not.toContain("document_delete");
    expect(names).not.toContain("documents_bulk_edit");
    expect(names).not.toContain("tag_create");
  });

  it("keeps concurrent sessions independent", async () => {
    // The upstream HTTP path reused one McpServer across transports, so
    // concurrent requests could answer on each other's connection.
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const [first, second] = await Promise.all([connect(), connect()]);
    const [a, b] = await Promise.all([
      first.client.callTool({ name: "tag_list", arguments: {} }) as Promise<CallToolResult>,
      second.client.callTool({ name: "document_search", arguments: {} }) as Promise<CallToolResult>,
    ]);

    expect(textOf(a)).toContain("Invoice");
    expect(textOf(b)).toContain("ACME invoice 2026-04");
  });
});
