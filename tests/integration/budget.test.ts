import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { afterEach, describe, expect, it } from "vitest";

import type { Toolset } from "../../src/config/schema.js";
import { createSession } from "../../src/runtime/createServer.js";
import { silentLogger } from "../../src/runtime/logger.js";
import { testConfig } from "../helpers/config.js";
import { installFakePaperless } from "../helpers/fakePaperless.js";

/**
 * The tool list is sent on every conversation that has this server attached,
 * so its size is a permanent tax on the context window. Roughly 4 characters
 * per token.
 */
const CHARS_PER_TOKEN = 4;

/**
 * The hard limit is the full profile: 20k tokens, the ceiling this project set
 * itself for what a tool listing may cost a conversation. The default profile
 * gets a tighter one so growth there has to be deliberate.
 *
 * Raised from 12k when P4 landed tasks, trash, users and statistics. If the
 * full profile approaches its ceiling in a later phase, split
 * `documents_bulk_edit` first — it carries parameters for sixteen different
 * operations and is consistently the largest single definition.
 */
const DEFAULT_PROFILE_TOKEN_BUDGET = 15_000;
const FULL_PROFILE_TOKEN_BUDGET = 20_000;

let cleanup: Array<() => Promise<void>> = [];

afterEach(async () => {
  for (const fn of cleanup.reverse()) await fn();
  cleanup = [];
});

async function listToolsFor(toolsets: Toolset[]) {
  const { server } = await createSession(testConfig({ toolsets }), silentLogger());
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  const client = new Client({ name: "budget", version: "0" });
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  cleanup.push(async () => {
    await client.close();
    await server.close();
  });
  const { tools } = await client.listTools();
  return { tools, chars: JSON.stringify(tools).length };
}

describe("tool listing budget", () => {
  it("keeps the default profile affordable", async () => {
    const fake = installFakePaperless();
    cleanup.push(async () => fake.restore());

    const { tools, chars } = await listToolsFor(["core", "taxonomy", "search", "bulk"]);
    const tokens = Math.round(chars / CHARS_PER_TOKEN);
    console.log(`default profile: ${tools.length} tools, ${chars} chars ≈ ${tokens} tokens`);

    expect(tokens).toBeLessThan(DEFAULT_PROFILE_TOKEN_BUDGET);
  });

  it("keeps the full profile affordable", async () => {
    const fake = installFakePaperless();
    cleanup.push(async () => fake.restore());

    const { tools, chars } = await listToolsFor([
      "core",
      "taxonomy",
      "search",
      "bulk",
      "views",
      "sharing",
      "workflows",
      "mail",
      "admin",
      "ai",
      "versions",
    ]);
    const tokens = Math.round(chars / CHARS_PER_TOKEN);
    console.log(`full profile: ${tools.length} tools, ${chars} chars ≈ ${tokens} tokens`);

    expect(tokens).toBeLessThan(FULL_PROFILE_TOKEN_BUDGET);
  });

  it("keeps any single tool from dominating the listing", async () => {
    const fake = installFakePaperless();
    cleanup.push(async () => fake.restore());

    const { tools } = await listToolsFor(["core", "taxonomy", "search", "bulk"]);
    const largest = tools
      .map((tool) => ({ name: tool.name, chars: JSON.stringify(tool).length }))
      .sort((a, b) => b.chars - a.chars);

    console.log(
      `largest: ${largest
        .slice(0, 5)
        .map((tool) => `${tool.name}=${tool.chars}`)
        .join(" ")}`,
    );
    expect(largest[0]?.chars ?? 0).toBeLessThan(6000);
  });
});
