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

async function connect(config: ResolvedConfig = testConfig({ toolsets: ["taxonomy", "views"] })) {
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

describe("taxonomy tools", () => {
  it("covers every taxonomy resource with full CRUD", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const names = (await client.listTools()).tools.map((tool) => tool.name);

    for (const resource of [
      "tag",
      "correspondent",
      "document_type",
      "storage_path",
      "custom_field",
    ]) {
      for (const verb of ["list", "create", "update", "delete"]) {
        expect(names, `${resource}_${verb} is missing`).toContain(`${resource}_${verb}`);
      }
    }
    expect(names).toContain("storage_path_test");
  });

  it("fetches the detail endpoint when a list tool is given an id", async () => {
    // Retrieval is folded into the list tools so that `GET /{id}/` is covered
    // without spending a second tool definition per resource.
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const result = (await client.callTool({
      name: "tag_list",
      arguments: { id: 1 },
    })) as CallToolResult;

    expect(result.isError).toBeFalsy();
    expect(textOf(result)).toContain("Invoice");
    expect(fake.requests.some((request: RecordedRequest) => request.path === "/api/tags/1/")).toBe(
      true,
    );
  });

  it("renders a storage path template without changing anything", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const result = (await client.callTool({
      name: "storage_path_test",
      arguments: { path: "archive/{created_year}/{title}", document: 100 },
    })) as CallToolResult;

    expect(textOf(result)).toContain("archive/2026/acme-invoice.pdf");
    const call = fake.requests.find((request) => request.path === "/api/storage_paths/test/");
    expect(call?.body).toEqual({ path: "archive/{created_year}/{title}", document: 100 });
  });

  it("shows select options so a select field is usable", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const text = textOf(
      (await client.callTool({ name: "custom_field_list", arguments: {} })) as CallToolResult,
    );

    expect(text).toContain("monetary");
    expect(text).toContain("Unpaid");
  });

  it("refuses to delete taxonomy objects without confirmation", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    for (const [tool, id] of [
      ["tag_delete", 1],
      ["storage_path_delete", 30],
      ["custom_field_delete", 40],
    ] as const) {
      const result = (await client.callTool({
        name: tool,
        arguments: { id },
      })) as CallToolResult;
      expect(result.isError, `${tool} should refuse`).toBe(true);
      expect(textOf(result)).toMatch(/confirmation/i);
    }

    expect(
      fake.requests.some((request) => request.method === "DELETE"),
      "nothing should have been deleted",
    ).toBe(false);
  });

  it("names what a delete would affect, so the user can judge it", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const result = (await client.callTool({
      name: "tag_delete",
      arguments: { id: 1 },
    })) as CallToolResult;

    const text = textOf(result);
    expect(text).toContain("Invoice");
    expect(text).toContain("12 document");
  });

  it("updates a correspondent with PATCH, not a full replacement", async () => {
    const fake = installFakePaperless({
      "PATCH /api/correspondents/10/": (request) => ({
        json: { id: 10, name: (request.body as { name: string }).name, document_count: 7 },
      }),
    });
    cleanup.push(fake.restore);

    const client = await connect();
    const result = (await client.callTool({
      name: "correspondent_update",
      arguments: { id: 10, name: "ACME Limited" },
    })) as CallToolResult;

    expect(result.isError).toBeFalsy();
    const call = fake.requests.find((request) => request.method === "PATCH");
    expect(call?.body).toEqual({ name: "ACME Limited" });
  });

  it("normalizes the matching algorithm from either spelling", async () => {
    const fake = installFakePaperless({
      "POST /api/tags/": (request) => ({ json: { id: 9, name: "x", ...(request.body as object) } }),
    });
    cleanup.push(fake.restore);

    const client = await connect();
    await client.callTool({
      name: "tag_create",
      arguments: { name: "Regex tag", match: "inv.*", matching_algorithm: "regex" },
    });
    await client.callTool({
      name: "tag_create",
      arguments: { name: "Numeric tag", match: "inv", matching_algorithm: 3 },
    });

    const posts = fake.requests.filter((request) => request.path === "/api/tags/");
    for (const post of posts) {
      expect((post.body as { matching_algorithm: number }).matching_algorithm).toBe(3);
    }
  });
});

describe("saved views", () => {
  it("shows the filter rules that define a view", async () => {
    const fake = installFakePaperless();
    cleanup.push(fake.restore);

    const client = await connect();
    const text = textOf(
      (await client.callTool({ name: "saved_view_list", arguments: { id: 50 } })) as CallToolResult,
    );

    expect(text).toContain("Unpaid invoices");
    expect(text).toContain("rule_type");
  });

  it("merges UI settings instead of replacing the whole blob", async () => {
    const fake = installFakePaperless({
      "GET /api/ui_settings/": () => ({
        json: { user: { id: 1, username: "tester" }, settings: { theme: "dark", locale: "en" } },
      }),
      "POST /api/ui_settings/": () => ({ json: { success: true } }),
    });
    cleanup.push(fake.restore);

    const client = await connect();
    await client.callTool({
      name: "ui_settings_update",
      arguments: { settings: { locale: "de" } },
    });

    const post = fake.requests.find(
      (request) => request.method === "POST" && request.path === "/api/ui_settings/",
    );
    // theme must survive: paperless overwrites the object wholesale.
    expect(post?.body).toEqual({ settings: { theme: "dark", locale: "de" } });
  });
});
