import { z } from "zod";

import { nameFilterShape, nameFilterToQuery } from "../../paperless/filters.js";
import { pageInfo } from "../../paperless/pagination.js";
import type { CrudResource } from "../../paperless/resources/crud.js";
import type { Correspondent, DocumentType, Tag } from "../../paperless/types.js";
import type { ToolContext } from "../../runtime/context.js";
import { defineTool, type AnyToolDefinition } from "../registry.js";
import { requireConfirm } from "../shared/guards.js";
import { output, renderPageFooter, renderTable } from "../shared/responses.js";
import {
  confirmShape,
  matchingShape,
  normalizeMatchingAlgorithm,
  pageShape,
} from "../shared/schemas.js";

interface ListArgs {
  name_contains?: string;
  name_exact?: string;
  page?: number;
  page_size?: number;
}

interface MatchingArgs {
  match?: string;
  matching_algorithm?: string | number;
  is_insensitive?: boolean;
}

function matchingPatch(args: MatchingArgs): Record<string, unknown> {
  const patch: Record<string, unknown> = {};
  if (args.match !== undefined) patch["match"] = args.match;
  const algorithm = normalizeMatchingAlgorithm(args.matching_algorithm);
  if (algorithm !== undefined) patch["matching_algorithm"] = algorithm;
  if (args.is_insensitive !== undefined) patch["is_insensitive"] = args.is_insensitive;
  return patch;
}

async function listResource<T extends { id: number; name: string; document_count?: number }>(
  resource: CrudResource<T>,
  args: ListArgs,
  context: ToolContext,
  toolName: string,
  extraColumns?: { headers: string[]; cell: (item: T) => Array<string | number | undefined> },
) {
  const page = args.page ?? 1;
  const pageSize = Math.min(args.page_size ?? 100, context.config.maxPageSize);
  const response = await resource.list({
    ...nameFilterToQuery(args),
    page,
    page_size: pageSize,
    ordering: "name",
  });

  const headers = ["id", "name", "documents", ...(extraColumns?.headers ?? [])];
  const rows = response.results.map((item) => [
    item.id,
    item.name,
    item.document_count ?? "",
    ...(extraColumns?.cell(item) ?? []),
  ]);

  const info = pageInfo(response, page, pageSize);
  return output(
    `${renderTable(headers, rows, "None found.")}\n\n${renderPageFooter(info, toolName)}`,
    response.results,
  );
}

export const tagListTool = defineTool({
  name: "tag_list",
  title: "List tags",
  description:
    "List tags with their ids, colours, document counts and auto-matching rules. Call this first whenever a request mentions a tag by name — every other tool takes tag ids, not names.",
  toolset: "taxonomy",
  inputSchema: { ...nameFilterShape, ...pageShape },
  annotations: { readOnlyHint: true, openWorldHint: true },
  aliases: ["list_tags"],
  handler: (args: ListArgs, context) =>
    listResource<Tag>(context.api.tags, args, context, "tag_list", {
      headers: ["colour", "inbox"],
      cell: (tag) => [tag.color ?? tag.colour ?? "", tag.is_inbox_tag ? "yes" : ""],
    }),
});

export const tagCreateTool = defineTool({
  name: "tag_create",
  title: "Create a tag",
  description:
    "Create a tag. Optionally give it a colour and an auto-matching rule so paperless applies it to future documents on its own. Check tag_list first — duplicate tags that differ only in spelling are the usual way an archive becomes unusable.",
  toolset: "taxonomy",
  inputSchema: {
    name: z.string().min(1).describe("Tag name, e.g. 'Invoice' or 'Tax 2025'."),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .optional()
      .describe("Hex colour like #2f6f4e. paperless picks one if omitted."),
    is_inbox_tag: z
      .boolean()
      .optional()
      .describe("Mark as an inbox tag, applied to everything newly consumed."),
    ...matchingShape,
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  aliases: ["create_tag"],
  handler: async (
    args: { name: string; color?: string; is_inbox_tag?: boolean } & MatchingArgs,
    context,
  ) => {
    const body: Record<string, unknown> = { name: args.name, ...matchingPatch(args) };
    if (args.color !== undefined) body["color"] = args.color;
    if (args.is_inbox_tag !== undefined) body["is_inbox_tag"] = args.is_inbox_tag;
    const tag = await context.api.tags.create(body);
    context.taxonomy.invalidate();
    return output(`Created tag "${tag.name}" with id ${tag.id}.`, tag);
  },
});

export const tagUpdateTool = defineTool({
  name: "tag_update",
  title: "Update a tag",
  description:
    "Rename a tag, change its colour, or adjust its auto-matching rule. Only the fields you pass are changed. Renaming keeps the tag on every document that already carries it.",
  toolset: "taxonomy",
  inputSchema: {
    id: z.number().int().describe("Tag id from tag_list."),
    name: z.string().optional().describe("New name."),
    color: z
      .string()
      .regex(/^#[0-9A-Fa-f]{6}$/)
      .optional()
      .describe("New hex colour."),
    is_inbox_tag: z.boolean().optional().describe("Whether this is an inbox tag."),
    ...matchingShape,
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
  aliases: ["update_tag"],
  handler: async (
    args: { id: number; name?: string; color?: string; is_inbox_tag?: boolean } & MatchingArgs,
    context,
  ) => {
    const patch: Record<string, unknown> = matchingPatch(args);
    if (args.name !== undefined) patch["name"] = args.name;
    if (args.color !== undefined) patch["color"] = args.color;
    if (args.is_inbox_tag !== undefined) patch["is_inbox_tag"] = args.is_inbox_tag;
    const tag = await context.api.tags.update(args.id, patch);
    context.taxonomy.invalidate();
    return output(`Updated tag ${tag.id} ("${tag.name}").`, tag);
  },
});

export const tagDeleteTool = defineTool({
  name: "tag_delete",
  title: "Delete a tag",
  description:
    "Permanently delete a tag and strip it from every document that carries it. This cannot be undone and the documents themselves are untouched. Report the tag's document count to the user before calling with confirm=true.",
  toolset: "taxonomy",
  inputSchema: { id: z.number().int().describe("Tag id from tag_list."), ...confirmShape },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
  aliases: ["delete_tag"],
  handler: async (args: { id: number; confirm?: boolean }, context) => {
    const tag = await context.api.tags.get(args.id);
    requireConfirm(
      args.confirm,
      "delete this tag",
      `Tag "${tag.name}" would be removed from ${tag.document_count ?? "an unknown number of"} document(s).`,
    );
    await context.api.tags.remove(args.id);
    context.taxonomy.invalidate();
    return output(`Deleted tag ${args.id} ("${tag.name}").`, { id: args.id });
  },
});

export const correspondentListTool = defineTool({
  name: "correspondent_list",
  title: "List correspondents",
  description:
    "List correspondents (the people, companies and institutions documents come from) with ids and document counts. Look names up here before filtering or assigning — every other tool wants the id.",
  toolset: "taxonomy",
  inputSchema: { ...nameFilterShape, ...pageShape },
  annotations: { readOnlyHint: true, openWorldHint: true },
  aliases: ["list_correspondents"],
  handler: (args: ListArgs, context) =>
    listResource<Correspondent>(
      context.api.correspondents,
      args,
      context,
      "correspondent_list",
      {
        headers: ["last correspondence"],
        cell: (item) => [item.last_correspondence?.slice(0, 10) ?? ""],
      },
    ),
});

export const correspondentCreateTool = defineTool({
  name: "correspondent_create",
  title: "Create a correspondent",
  description:
    "Create a correspondent, optionally with an auto-matching rule so future documents from the same sender are attributed automatically. Search correspondent_list first: near-duplicates ('ACME Ltd' vs 'ACME Limited') fragment an archive.",
  toolset: "taxonomy",
  inputSchema: {
    name: z.string().min(1).describe("Correspondent name, e.g. 'Stadtwerke München'."),
    ...matchingShape,
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  aliases: ["create_correspondent"],
  handler: async (args: { name: string } & MatchingArgs, context) => {
    const correspondent = await context.api.correspondents.create({
      name: args.name,
      ...matchingPatch(args),
    });
    context.taxonomy.invalidate();
    return output(
      `Created correspondent "${correspondent.name}" with id ${correspondent.id}.`,
      correspondent,
    );
  },
});

export const documentTypeListTool = defineTool({
  name: "document_type_list",
  title: "List document types",
  description:
    "List document types (invoice, contract, payslip, …) with ids and document counts. Resolve a type name to its id here before filtering or assigning.",
  toolset: "taxonomy",
  inputSchema: { ...nameFilterShape, ...pageShape },
  annotations: { readOnlyHint: true, openWorldHint: true },
  aliases: ["list_document_types"],
  handler: (args: ListArgs, context) =>
    listResource<DocumentType>(context.api.documentTypes, args, context, "document_type_list"),
});

export const documentTypeCreateTool = defineTool({
  name: "document_type_create",
  title: "Create a document type",
  description:
    "Create a document type describing what a document *is* (invoice, contract, certificate), as opposed to a tag, which describes how you are handling it. Optionally add an auto-matching rule.",
  toolset: "taxonomy",
  inputSchema: {
    name: z.string().min(1).describe("Type name, e.g. 'Invoice'."),
    ...matchingShape,
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  aliases: ["create_document_type"],
  handler: async (args: { name: string } & MatchingArgs, context) => {
    const documentType = await context.api.documentTypes.create({
      name: args.name,
      ...matchingPatch(args),
    });
    context.taxonomy.invalidate();
    return output(
      `Created document type "${documentType.name}" with id ${documentType.id}.`,
      documentType,
    );
  },
});

export const taxonomyTools: AnyToolDefinition[] = [
  tagListTool,
  tagCreateTool,
  tagUpdateTool,
  tagDeleteTool,
  correspondentListTool,
  correspondentCreateTool,
  documentTypeListTool,
  documentTypeCreateTool,
];
