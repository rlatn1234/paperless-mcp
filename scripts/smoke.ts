/**
 * End-to-end smoke test against a real paperless-ngx instance.
 *
 * Spawns the built server exactly the way an MCP client does, then exercises
 * the read-only tools. Nothing here writes to the archive.
 *
 *   PAPERLESS_URL=https://paperless.example.com \
 *   PAPERLESS_API_KEY=... \
 *   npm run smoke
 *
 * Prints result sizes and timings, never document contents — the point is to
 * prove the wiring works, not to dump someone's archive into a terminal.
 */

import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

const baseUrl = process.env["PAPERLESS_URL"];
const token = process.env["PAPERLESS_API_KEY"] ?? process.env["API_KEY"];

if (!baseUrl || !token) {
  console.error("Set PAPERLESS_URL and PAPERLESS_API_KEY before running the smoke test.");
  process.exitCode = 1;
} else {
  await main(baseUrl, token);
}

async function main(url: string, apiKey: string): Promise<void> {
  const entry = fileURLToPath(new URL("../dist/index.js", import.meta.url));

  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [entry],
    env: {
      PAPERLESS_URL: url,
      PAPERLESS_API_KEY: apiKey,
      PAPERLESS_LOG_LEVEL: "warn",
      PAPERLESS_TOOLSETS: "full",
    },
    stderr: "inherit",
  });

  const client = new Client({ name: "smoke", version: "0" });
  await client.connect(transport);

  const { tools } = await client.listTools();
  console.log(`connected · ${tools.length} tools registered`);

  let failures = 0;

  const check = async (
    label: string,
    name: string,
    args: Record<string, unknown>,
  ): Promise<void> => {
    const started = Date.now();
    try {
      const result = (await client.callTool({ name, arguments: args })) as CallToolResult;
      const text = result.content
        .filter((block): block is { type: "text"; text: string } => block.type === "text")
        .map((block) => block.text)
        .join("\n");
      const ms = Date.now() - started;

      if (result.isError) {
        failures += 1;
        console.log(`  FAIL  ${label} (${ms} ms)\n        ${text.split("\n").join("\n        ")}`);
        return;
      }
      // Row count stands in for "did it come back with anything sensible".
      const rows = Math.max(0, text.split("\n").filter((line) => line.startsWith("| ")).length - 2);
      console.log(`  ok    ${label} (${ms} ms, ${rows} rows, ${text.length} chars)`);
    } catch (error) {
      failures += 1;
      console.log(`  FAIL  ${label}: ${error instanceof Error ? error.message : String(error)}`);
    }
  };

  await check("tag_list", "tag_list", {});
  await check("correspondent_list", "correspondent_list", {});
  await check("document_type_list", "document_type_list", {});
  await check("document_search (browse)", "document_search", { page_size: 5 });
  await check("document_search (query)", "document_search", { query: "a", page_size: 3 });
  await check("document_search (untagged)", "document_search", { is_tagged: false, page_size: 3 });
  await check("storage_path_list", "storage_path_list", {});
  await check("custom_field_list", "custom_field_list", {});
  await check("saved_view_list", "saved_view_list", {});
  await check("ui_settings_get", "ui_settings_get", {});
  await check("statistics_get", "statistics_get", {});
  await check("search_global", "search_global", { query: "inv" });
  await check("search_autocomplete", "search_autocomplete", { term: "inv" });
  await check("system_status", "system_status", {});
  await check("task_list", "task_list", { page_size: 5 });
  await check("trash_list", "trash_list", { page_size: 5 });
  await check("user_list", "user_list", {});
  await check("group_list", "group_list", {});
  await check("document_next_asn", "document_next_asn", {});

  // Follow-up calls need a real id, so take one from a minimal search.
  const first = (await client.callTool({
    name: "document_search",
    arguments: { page_size: 1 },
  })) as CallToolResult;
  const firstText = first.content
    .filter((block): block is { type: "text"; text: string } => block.type === "text")
    .map((block) => block.text)
    .join("\n");
  const id = Number(/^\|\s*(\d+)\s*\|/m.exec(firstText)?.[1]);

  if (Number.isInteger(id)) {
    console.log(`using document ${id} for detail checks`);
    await check("document_get", "document_get", { id, include_content: false });
    await check("document_metadata", "document_metadata", { id });
    await check("document_notes_list", "document_notes_list", { id });
    await check("document_suggestions", "document_suggestions", { id });
    await check("document_similar", "document_similar", { id, page_size: 3 });
    await check("document_thumbnail", "document_thumbnail", { id });
    await check("storage_path_test", "storage_path_test", {
      path: "{created_year}/{title}",
      document: id,
    });
  } else {
    console.log("no documents in the archive; skipping the detail checks");
  }

  await client.close();
  console.log(failures === 0 ? "\nall checks passed" : `\n${failures} check(s) failed`);
  process.exitCode = failures === 0 ? 0 : 1;
}
