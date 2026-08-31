import { z } from "zod";

import {
  documentFilterShape,
  documentFilterToQuery,
  documentOrderingSchema,
  type DocumentFilter,
} from "../../paperless/filters.js";
import { pageInfo } from "../../paperless/pagination.js";
import { DEFAULT_DOCUMENT_FIELDS } from "../../paperless/resources/documents.js";
import { nameOf, namesOf } from "../../paperless/taxonomyCache.js";
import type { PaperlessDocument } from "../../paperless/types.js";
import type { ToolContext } from "../../runtime/context.js";
import { defineTool } from "../registry.js";
import { output, renderPageFooter, renderTable, type ToolOutput } from "../shared/responses.js";
import { pageShape } from "../shared/schemas.js";

const searchShape = {
  query: z
    .string()
    .optional()
    .describe(
      "Ranked full-text query over document content, title, correspondent, type and tags. Supports paperless syntax: field terms (tag:unpaid, type:invoice, correspondent:acme), boolean operators (a AND (b OR c)), date ranges (created:[2024 to 2025], added:yesterday) and wildcards (invo*). Omit to browse with filters alone.",
    ),
  ordering: documentOrderingSchema,
  include_content: z
    .boolean()
    .optional()
    .describe(
      "Include a truncated OCR body with each hit. Off by default — full text is large; use document_get for the documents you actually need.",
    ),
  ...documentFilterShape,
  ...pageShape,
} as const;

type SearchArgs = DocumentFilter & {
  query?: string;
  ordering?: string;
  include_content?: boolean;
  page?: number;
  page_size?: number;
};

async function runSearch(
  args: SearchArgs,
  context: ToolContext,
  toolName: string,
  extraQuery: Record<string, string | number> = {},
): Promise<ToolOutput> {
  const { config } = context;
  const page = args.page ?? 1;
  const pageSize = Math.min(args.page_size ?? config.defaultPageSize, config.maxPageSize);

  const query = { ...documentFilterToQuery(args), ...extraQuery };
  if (args.query) query["query"] = args.query;
  if (args.ordering) query["ordering"] = args.ordering;

  const fields = args.include_content
    ? [...DEFAULT_DOCUMENT_FIELDS, "content"]
    : DEFAULT_DOCUMENT_FIELDS;

  const [response, names] = await Promise.all([
    context.api.documents.search({
      query,
      fields,
      truncateContent: args.include_content === true,
      page,
      pageSize,
    }),
    context.taxonomy.names(),
  ]);

  const headers = args.include_content
    ? ["id", "title", "created", "correspondent", "type", "tags", "excerpt"]
    : ["id", "title", "created", "correspondent", "type", "tags"];

  const rows = response.results.map((document: PaperlessDocument) => {
    const base = [
      document.id,
      document.title,
      (document.created ?? document.created_date ?? "").slice(0, 10),
      nameOf(names.correspondents, document.correspondent),
      nameOf(names.documentTypes, document.document_type),
      namesOf(names.tags, document.tags),
    ];
    if (!args.include_content) return base;
    const excerpt = (document.content ?? "").replace(/\s+/g, " ").slice(0, 160);
    return [...base, excerpt];
  });

  const info = pageInfo(response, page, pageSize);
  const text = `${renderTable(headers, rows, "No documents matched.")}\n\n${renderPageFooter(info, toolName)}`;

  return output(text, { page: info, results: response.results });
}

export const documentSearchTool = defineTool({
  name: "document_search",
  title: "Search documents",
  description:
    "Find documents by full-text query and/or structured filters (tags, correspondent, type, storage path, dates, ASN, custom fields). Returns a compact table without OCR bodies, so it is safe to call on large archives; follow up with document_get for the ones that matter. This is the entry point for almost every document task — use it to turn names into ids.",
  toolset: "core",
  inputSchema: searchShape,
  annotations: { readOnlyHint: true, openWorldHint: true },
  aliases: ["search_documents", "list_documents"],
  handler: (args: SearchArgs, context) => runSearch(args, context, "document_search"),
});

export const documentSimilarTool = defineTool({
  name: "document_similar",
  title: "Find similar documents",
  description:
    "Rank documents by textual similarity to one you already have (paperless 'more like this'). Use it to find duplicates, earlier invoices from the same vendor, or the rest of a series — cases where you cannot name the right search terms but you do have one good example.",
  toolset: "core",
  inputSchema: {
    id: z.number().int().describe("Document id to find neighbours of."),
    ...pageShape,
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: (args: { id: number; page?: number; page_size?: number }, context) =>
    runSearch(args as SearchArgs, context, "document_similar", { more_like_id: args.id }),
});
