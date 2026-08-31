import { describe, expect, it } from "vitest";
import { z } from "zod";

import { defaultCapabilities } from "../../src/paperless/capabilities.js";
import type { ToolContext } from "../../src/runtime/context.js";
import { silentLogger } from "../../src/runtime/logger.js";
import { allTools } from "../../src/tools/index.js";
import { defineTool, selectTools } from "../../src/tools/registry.js";
import { output } from "../../src/tools/shared/responses.js";
import { testConfig } from "../helpers/config.js";

function contextWith(overrides: Partial<ToolContext> = {}): ToolContext {
  return {
    api: {} as ToolContext["api"],
    taxonomy: {} as ToolContext["taxonomy"],
    config: testConfig(),
    caps: defaultCapabilities(10),
    logger: silentLogger(),
    ...overrides,
  };
}

const readTool = defineTool({
  name: "demo_read",
  title: "Demo read",
  description: "read",
  toolset: "core",
  inputSchema: { id: z.number() },
  annotations: { readOnlyHint: true },
  handler: async () => output("ok"),
});

const writeTool = defineTool({
  name: "demo_write",
  title: "Demo write",
  description: "write",
  toolset: "core",
  inputSchema: { id: z.number() },
  annotations: { readOnlyHint: false },
  handler: async () => output("ok"),
});

const adminTool = defineTool({
  name: "demo_admin",
  title: "Demo admin",
  description: "admin",
  toolset: "admin",
  inputSchema: {},
  annotations: { readOnlyHint: true },
  requiresAdmin: true,
  handler: async () => output("ok"),
});

describe("selectTools", () => {
  const demo = [readTool, writeTool, adminTool];

  it("registers read and write tools in write mode", () => {
    const summary = selectTools(demo, contextWith());
    expect(summary.registered).toEqual(["demo_read", "demo_write"]);
  });

  it("does not register mutating tools in read-only mode", () => {
    const summary = selectTools(demo, contextWith({ config: testConfig({ mode: "readonly" }) }));
    expect(summary.registered).toEqual(["demo_read"]);
    expect(summary.skipped).toContainEqual({ name: "demo_write", reason: "read-only mode" });
  });

  it("hides admin tools unless the mode allows them", () => {
    const withAdminToolset = testConfig({ toolsets: ["core", "admin"] });
    expect(selectTools(demo, contextWith({ config: withAdminToolset })).registered).not.toContain(
      "demo_admin",
    );
    expect(
      selectTools(
        demo,
        contextWith({ config: testConfig({ toolsets: ["core", "admin"], mode: "admin" }) }),
      ).registered,
    ).toContain("demo_admin");
  });

  it("hides tools whose toolset is not enabled", () => {
    const summary = selectTools(
      demo,
      contextWith({ config: testConfig({ toolsets: ["search"] }) }),
    );
    expect(summary.registered).toEqual([]);
  });

  it("hides version tools on an instance that predates them", () => {
    const config = testConfig({ toolsets: ["versions"] });
    const onV10 = selectTools(allTools, contextWith({ config, caps: defaultCapabilities(10) }));
    const onV9 = selectTools(allTools, contextWith({ config, caps: defaultCapabilities(9) }));

    expect(onV10.registered).toContain("document_version_upload");
    expect(onV9.registered).not.toContain("document_version_upload");
  });
});

describe("tool catalogue", () => {
  it("has unique names across tools and aliases", () => {
    const names = new Set<string>();
    for (const tool of allTools) {
      for (const name of [tool.name, ...(tool.aliases ?? [])]) {
        expect(names.has(name), `duplicate tool name: ${name}`).toBe(false);
        names.add(name);
      }
    }
  });

  it("keeps every upstream tool name reachable as an alias", () => {
    const reachable = new Set(allTools.flatMap((tool) => [tool.name, ...(tool.aliases ?? [])]));
    const upstream = [
      "bulk_edit_documents",
      "post_document",
      "get_document",
      "search_documents",
      "download_document",
      "list_tags",
      "create_tag",
      "update_tag",
      "delete_tag",
      "bulk_edit_tags",
      "list_correspondents",
      "create_correspondent",
      "bulk_edit_correspondents",
      "list_document_types",
      "create_document_type",
      "bulk_edit_document_types",
    ];
    for (const name of upstream) {
      expect(reachable.has(name), `${name} is no longer reachable`).toBe(true);
    }
  });

  it("marks every mutating tool with an annotation", () => {
    for (const tool of allTools) {
      expect(tool.annotations, `${tool.name} has no annotations`).toBeDefined();
      expect(typeof tool.annotations?.readOnlyHint, `${tool.name}.readOnlyHint`).toBe("boolean");
    }
  });

  it("keeps descriptions within the tool-listing budget", () => {
    for (const tool of allTools) {
      expect(tool.description.length, `${tool.name} description is too long`).toBeLessThanOrEqual(
        600,
      );
    }
  });
});
