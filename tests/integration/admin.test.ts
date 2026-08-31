import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { afterEach, describe, expect, it } from "vitest";

import type { ResolvedConfig } from "../../src/config/schema.js";
import { createSession } from "../../src/runtime/createServer.js";
import { silentLogger } from "../../src/runtime/logger.js";
import { testConfig } from "../helpers/config.js";
import { installFakePaperless } from "../helpers/fakePaperless.js";

let cleanup: Array<() => void | Promise<void>> = [];

afterEach(async () => {
  for (const fn of cleanup.reverse()) await fn();
  cleanup = [];
});

async function connect(
  config: ResolvedConfig = testConfig({ toolsets: ["core", "admin", "search", "bulk"] }),
) {
  const { server } = await createSession(config, silentLogger());
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "test", version: "0" });
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  cleanup.push(async () => {
    await client.close();
    await server.close();
  });
  return client;
}

function textOf(result: CallToolResult): string {
  return result.content
    .filter((block): block is { type: "text"; text: string } => block.type === "text")
    .map((block) => block.text)
    .join("\n");
}

describe("tasks", () => {
  it("reports status and the documents a job produced", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const text = textOf(
      (await client.callTool({ name: "task_list", arguments: {} })) as CallToolResult,
    );

    expect(text).toContain("Consume file");
    expect(text).toContain("Success");
    expect(text).toContain("needs attention");
  });

  it("surfaces a single task with its timings", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const text = textOf(
      (await client.callTool({ name: "task_get", arguments: { id: 900 } })) as CallToolResult,
    );

    expect(text).toContain("abc-123");
    expect(text).toContain("12s");
  });
});

describe("trash", () => {
  it("lists deleted documents with when they were deleted", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const text = textOf(
      (await client.callTool({ name: "trash_list", arguments: {} })) as CallToolResult,
    );

    expect(text).toContain("ACME invoice 2026-04");
    expect(text).toContain("2026-04-10");
  });

  it("restores without demanding confirmation, since restoring is not destructive", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const result = (await client.callTool({
      name: "trash_restore",
      arguments: { document_ids: [100] },
    })) as CallToolResult;

    expect(result.isError).toBeFalsy();
    const post = fake.requests.find(
      (request) => request.method === "POST" && request.path === "/api/trash/",
    );
    expect(post?.body).toEqual({ action: "restore", documents: [100] });
  });

  it("refuses to empty the trash without confirmation, and says how much is at stake", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect(
      testConfig({ toolsets: ["core", "admin", "search", "bulk"], mode: "admin" }),
    );
    const result = (await client.callTool({
      name: "trash_empty",
      arguments: {},
    })) as CallToolResult;

    expect(result.isError).toBe(true);
    expect(textOf(result)).toMatch(/cannot be undone/i);
    expect(
      fake.requests.some((request) => request.method === "POST" && request.path === "/api/trash/"),
    ).toBe(false);
  });

  it("keeps permanent deletion behind admin mode", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const names = (await client.listTools()).tools.map((tool) => tool.name);

    expect(names).toContain("trash_restore");
    expect(names).not.toContain("trash_empty");
  });
});

describe("users", () => {
  it("never renders the password field the API returns", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const result = (await client.callTool({
      name: "user_list",
      arguments: {},
    })) as CallToolResult;

    const serialized = JSON.stringify(result);
    expect(serialized).toContain("tester");
    expect(serialized).not.toContain("pbkdf2");
    expect(serialized).not.toContain("password");
  });
});

describe("search and statistics", () => {
  it("summarises the archive", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const text = textOf(
      (await client.callTool({ name: "statistics_get", arguments: {} })) as CallToolResult,
    );

    expect(text).toContain("74");
    expect(text).toContain("application/pdf");
    // The inbox tag id is resolved to its name.
    expect(text).toContain("Invoice");
  });

  it("groups global search hits by object type", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const text = textOf(
      (await client.callTool({
        name: "search_global",
        arguments: { query: "invoice" },
      })) as CallToolResult,
    );

    expect(text).toContain("documents:");
    expect(text).toContain("tags:");
    expect(text).toContain("ACME invoice 2026-04");
  });
});

describe("custom field values", () => {
  it("merges into the existing values instead of replacing them", async () => {
    const fake = installFakePaperless({
      "GET /api/documents/100/": () => ({
        json: {
          id: 100,
          custom_fields: [
            { field: 40, value: "EUR100.00" },
            { field: 41, value: "Unpaid" },
          ],
        },
      }),
      "PATCH /api/documents/100/": (request) => ({
        json: { id: 100, title: "x", tags: [], ...(request.body as object) },
      }),
    });
    cleanup.push(fake.restore);

    const client = await connect();
    await client.callTool({
      name: "document_update",
      arguments: { id: 100, custom_fields: [{ field: 41, value: "Paid" }] },
    });

    const patch = fake.requests.find((request) => request.method === "PATCH");
    const sent = (patch?.body as { custom_fields: Array<{ field: number; value: unknown }> })
      .custom_fields;
    // Field 40 must survive; paperless replaces the whole set on PATCH.
    expect(sent).toEqual([
      { field: 40, value: "EUR100.00" },
      { field: 41, value: "Paid" },
    ]);
  });

  it("clears a field when asked to remove it", async () => {
    const fake = installFakePaperless({
      "GET /api/documents/100/": () => ({
        json: { id: 100, custom_fields: [{ field: 40, value: "EUR100.00" }] },
      }),
      "PATCH /api/documents/100/": (request) => ({
        json: { id: 100, title: "x", tags: [], ...(request.body as object) },
      }),
    });
    cleanup.push(fake.restore);

    const client = await connect();
    await client.callTool({
      name: "document_update",
      arguments: { id: 100, remove_custom_fields: [40] },
    });

    const patch = fake.requests.find((request) => request.method === "PATCH");
    expect((patch?.body as { custom_fields: unknown[] }).custom_fields).toEqual([]);
  });
});

describe("pdf operations via bulk edit", () => {
  it("sends the page operations edit_pdf expects", async () => {
    const fake = installFakePaperless({
      "POST /api/documents/bulk_edit/": () => ({ json: { result: "OK" } }),
    });
    cleanup.push(fake.restore);

    const client = await connect();
    const result = (await client.callTool({
      name: "documents_bulk_edit",
      arguments: {
        documents: [100],
        method: "edit_pdf",
        pdf_operations: [{ page: 2 }, { page: 1, rotate: 90 }],
      },
    })) as CallToolResult;

    expect(result.isError).toBeFalsy();
    const post = fake.requests.find((request) => request.path === "/api/documents/bulk_edit/");
    expect((post?.body as { parameters: { operations: unknown[] } }).parameters.operations).toEqual(
      [{ page: 2 }, { page: 1, rotate: 90 }],
    );
  });

  it("asks for the password rather than sending an invalid request", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const result = (await client.callTool({
      name: "documents_bulk_edit",
      arguments: { documents: [100], method: "remove_password" },
    })) as CallToolResult;

    expect(result.isError).toBe(true);
    expect(textOf(result)).toMatch(/password/i);
  });
});
