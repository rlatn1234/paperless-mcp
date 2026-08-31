import { z } from "zod";

import { nameOf } from "../../paperless/taxonomyCache.js";
import { type AnyToolDefinition, defineTool } from "../registry.js";
import { formatBytes, output, renderFields, renderTable } from "../shared/responses.js";

export const statisticsTool = defineTool({
  name: "statistics_get",
  title: "Get archive statistics",
  description:
    "Overview of the whole archive: how many documents, how many are still in the inbox, the breakdown by file type, and how many tags, correspondents and types exist. Call it first when someone asks about the state of their archive, instead of paging through documents to count them.",
  toolset: "search",
  inputSchema: {},
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (_args: Record<string, never>, context) => {
    const [statistics, names] = await Promise.all([
      context.api.system.statistics(),
      context.taxonomy.names(),
    ]);

    const summary = renderFields({
      documents: statistics.documents_total,
      in_inbox: statistics.documents_inbox,
      inbox_tag: nameOf(names.tags, statistics.inbox_tag),
      tags: statistics.tag_count,
      correspondents: statistics.correspondent_count,
      document_types: statistics.document_type_count,
      storage_paths: statistics.storage_path_count,
      next_asn: statistics.current_asn,
      total_characters: statistics.character_count?.toLocaleString("en-US"),
    });

    const types = statistics.document_file_type_counts ?? [];
    const table = types.length
      ? `\n\nby file type:\n${renderTable(
          ["mime type", "documents"],
          types.map((entry) => [entry.mime_type, entry.mime_type_count]),
        )}`
      : "";

    return output(`${summary}${table}`, statistics);
  },
});

export const globalSearchTool = defineTool({
  name: "search_global",
  title: "Search everything",
  description:
    "Search documents, tags, correspondents, document types, storage paths, saved views, users, groups, workflows, mail rules and custom fields in one call. Use it when you do not yet know what kind of object a name refers to — 'find anything about ACME' — then follow up with the specific tool. For document content, document_search gives far more control.",
  toolset: "search",
  inputSchema: {
    query: z
      .string()
      .min(3)
      .describe(
        "Text to look for across every object type. paperless rejects anything shorter than 3 characters.",
      ),
    db_only: z
      .boolean()
      .optional()
      .describe("Match names in the database only, skipping the full-text document index."),
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { query: string; db_only?: boolean }, context) => {
    const result = await context.api.system.globalSearch(args.query, args.db_only);

    const sections: string[] = [];
    const add = (
      label: string,
      items: Array<{ id: number; name?: string; username?: string; title?: string }> | undefined,
    ) => {
      if (!items?.length) return;
      sections.push(
        `${label}:\n${renderTable(
          ["id", "name"],
          items.slice(0, 10).map((item) => [item.id, item.name ?? item.title ?? item.username]),
        )}`,
      );
    };

    add("documents", result.documents);
    add("tags", result.tags);
    add("correspondents", result.correspondents);
    add("document types", result.document_types);
    add("storage paths", result.storage_paths);
    add("custom fields", result.custom_fields);
    add("saved views", result.saved_views);
    add("users", result.users);
    add("groups", result.groups);
    add("workflows", result.workflows);
    add("mail rules", result.mail_rules);
    add("mail accounts", result.mail_accounts);

    if (sections.length === 0) {
      return output(`Nothing matched "${args.query}".`, result);
    }
    return output(
      `${result.total ?? sections.length} match(es).\n\n${sections.join("\n\n")}`,
      result,
    );
  },
});

export const searchAutocompleteTool = defineTool({
  name: "search_autocomplete",
  title: "Complete a search term",
  description:
    "Suggest completions for a partial word from the document index. Useful when a user's spelling is uncertain — check what actually occurs in the archive before running a search that would return nothing.",
  toolset: "search",
  inputSchema: {
    term: z.string().min(1).describe("Partial word to complete."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(50)
      .optional()
      .describe("How many suggestions (default 10)."),
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { term: string; limit?: number }, context) => {
    const suggestions = await context.api.system.autocomplete(args.term, args.limit ?? 10);
    if (!suggestions?.length) {
      return output(`No completions for "${args.term}".`, suggestions);
    }
    return output(suggestions.join(", "), suggestions);
  },
});

export const systemStatusTool = defineTool({
  name: "system_status",
  title: "Get system status",
  description:
    "Health of the paperless instance: version, database, search index, classifier and storage. Check this when calls are failing oddly or documents are not being consumed — the problem is often a broken index or a full disk rather than anything to do with the request.",
  toolset: "admin",
  inputSchema: {},
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (_args: Record<string, never>, context) => {
    const status = (await context.api.system.status()) as Record<string, unknown>;
    const flat: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(status)) {
      if (value === null || typeof value !== "object") {
        flat[key] = value;
        continue;
      }
      // Nested blocks each carry a `*_status` field; that is the part worth showing.
      const nested = value as Record<string, unknown>;
      for (const [innerKey, innerValue] of Object.entries(nested)) {
        if (innerKey.endsWith("_status") || innerKey.endsWith("_error")) {
          if (innerValue !== null && innerValue !== "OK") flat[`${key}.${innerKey}`] = innerValue;
          else if (innerKey.endsWith("_status")) flat[`${key}.${innerKey}`] = innerValue;
        }
      }
      const size = nested["total"];
      if (typeof size === "number") flat[`${key}.total`] = formatBytes(size);
      const available = nested["available"];
      if (typeof available === "number") flat[`${key}.available`] = formatBytes(available);
    }
    return output(renderFields(flat), status);
  },
});

export const searchTools: AnyToolDefinition[] = [
  statisticsTool,
  globalSearchTool,
  searchAutocompleteTool,
  systemStatusTool,
];
