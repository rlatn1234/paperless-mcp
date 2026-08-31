import { z } from "zod";

import type { Correspondent, DocumentType, Tag } from "../../paperless/types.js";
import { type AnyToolDefinition, defineTool } from "../registry.js";
import { output } from "../shared/responses.js";
import { confirmShape, matchingShape } from "../shared/schemas.js";
import { customFieldTools } from "./customFields.js";
import {
  deleteResource,
  type ListArgs,
  listResource,
  listShape,
  type MatchingArgs,
  matchingPatch,
} from "./shared.js";
import { storagePathTools } from "./storagePaths.js";

export const tagListTool = defineTool({
  name: "tag_list",
  title: "List tags",
  description:
    "List tags with their ids, colours, document counts and auto-matching rules, or fetch one by id. Call this first whenever a request mentions a tag by name — every other tool takes tag ids, not names.",
  toolset: "taxonomy",
  inputSchema: listShape,
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
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
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
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
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
    "Permanently delete a tag and strip it from every document that carries it. The documents themselves are untouched. Report the tag's document count to the user before calling with confirm=true.",
  toolset: "taxonomy",
  inputSchema: { id: z.number().int().describe("Tag id from tag_list."), ...confirmShape },
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  aliases: ["delete_tag"],
  handler: (args: { id: number; confirm?: boolean }, context) =>
    deleteResource(context.api.tags, args.id, args.confirm, "tag", context),
});

export const correspondentListTool = defineTool({
  name: "correspondent_list",
  title: "List correspondents",
  description:
    "List correspondents (the people, companies and institutions documents come from) with ids and document counts, or fetch one by id. Look names up here before filtering or assigning — every other tool wants the id.",
  toolset: "taxonomy",
  inputSchema: listShape,
  annotations: { readOnlyHint: true, openWorldHint: true },
  aliases: ["list_correspondents"],
  handler: (args: ListArgs, context) =>
    listResource<Correspondent>(context.api.correspondents, args, context, "correspondent_list", {
      headers: ["last correspondence"],
      cell: (item) => [item.last_correspondence?.slice(0, 10) ?? ""],
    }),
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
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
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

export const correspondentUpdateTool = defineTool({
  name: "correspondent_update",
  title: "Update a correspondent",
  description:
    "Rename a correspondent or adjust its auto-matching rule. Renaming keeps it attached to every document already assigned to it, which makes this the right way to fix a misspelled sender.",
  toolset: "taxonomy",
  inputSchema: {
    id: z.number().int().describe("Correspondent id from correspondent_list."),
    name: z.string().optional().describe("New name."),
    ...matchingShape,
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (args: { id: number; name?: string } & MatchingArgs, context) => {
    const patch: Record<string, unknown> = matchingPatch(args);
    if (args.name !== undefined) patch["name"] = args.name;
    const correspondent = await context.api.correspondents.update(args.id, patch);
    context.taxonomy.invalidate();
    return output(
      `Updated correspondent ${correspondent.id} ("${correspondent.name}").`,
      correspondent,
    );
  },
});

export const correspondentDeleteTool = defineTool({
  name: "correspondent_delete",
  title: "Delete a correspondent",
  description:
    "Permanently delete a correspondent. Documents assigned to it keep existing but lose their sender. To merge duplicates, reassign the documents with documents_bulk_edit first, then delete the empty one.",
  toolset: "taxonomy",
  inputSchema: {
    id: z.number().int().describe("Correspondent id from correspondent_list."),
    ...confirmShape,
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: (args: { id: number; confirm?: boolean }, context) =>
    deleteResource(context.api.correspondents, args.id, args.confirm, "correspondent", context),
});

export const documentTypeListTool = defineTool({
  name: "document_type_list",
  title: "List document types",
  description:
    "List document types (invoice, contract, payslip, …) with ids and document counts, or fetch one by id. Resolve a type name to its id here before filtering or assigning.",
  toolset: "taxonomy",
  inputSchema: listShape,
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
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
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

export const documentTypeUpdateTool = defineTool({
  name: "document_type_update",
  title: "Update a document type",
  description:
    "Rename a document type or adjust its auto-matching rule. Only the fields you pass change; documents already classified keep the type.",
  toolset: "taxonomy",
  inputSchema: {
    id: z.number().int().describe("Document type id from document_type_list."),
    name: z.string().optional().describe("New name."),
    ...matchingShape,
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (args: { id: number; name?: string } & MatchingArgs, context) => {
    const patch: Record<string, unknown> = matchingPatch(args);
    if (args.name !== undefined) patch["name"] = args.name;
    const documentType = await context.api.documentTypes.update(args.id, patch);
    context.taxonomy.invalidate();
    return output(
      `Updated document type ${documentType.id} ("${documentType.name}").`,
      documentType,
    );
  },
});

export const documentTypeDeleteTool = defineTool({
  name: "document_type_delete",
  title: "Delete a document type",
  description:
    "Permanently delete a document type. Documents classified with it survive but become untyped. Reassign them with documents_bulk_edit first if they should keep a type.",
  toolset: "taxonomy",
  inputSchema: {
    id: z.number().int().describe("Document type id from document_type_list."),
    ...confirmShape,
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: (args: { id: number; confirm?: boolean }, context) =>
    deleteResource(context.api.documentTypes, args.id, args.confirm, "document type", context),
});

export const taxonomyTools: AnyToolDefinition[] = [
  tagListTool,
  tagCreateTool,
  tagUpdateTool,
  tagDeleteTool,
  correspondentListTool,
  correspondentCreateTool,
  correspondentUpdateTool,
  correspondentDeleteTool,
  documentTypeListTool,
  documentTypeCreateTool,
  documentTypeUpdateTool,
  documentTypeDeleteTool,
  ...storagePathTools,
  ...customFieldTools,
];
