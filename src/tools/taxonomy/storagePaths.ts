import { z } from "zod";

import type { StoragePath } from "../../paperless/types.js";
import { type AnyToolDefinition, defineTool } from "../registry.js";
import { output, renderTable } from "../shared/responses.js";
import { confirmShape, matchingShape } from "../shared/schemas.js";
import {
  deleteResource,
  type ListArgs,
  listResource,
  listShape,
  type MatchingArgs,
  matchingPatch,
} from "./shared.js";

const PATH_HELP =
  "Path template using paperless placeholders, e.g. '{created_year}/{correspondent}/{title}'. Available placeholders include created_year, created_month, created_day, correspondent, document_type, tag_list, title, asn and owner_username.";

export const storagePathListTool = defineTool({
  name: "storage_path_list",
  title: "List storage paths",
  description:
    "List storage paths — the filename templates that decide where paperless files documents on disk — with ids and document counts, or fetch one by id. Resolve a path name to its id here before assigning it to a document.",
  toolset: "taxonomy",
  inputSchema: listShape,
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: (args: ListArgs, context) =>
    listResource<StoragePath>(context.api.storagePaths, args, context, "storage_path_list", {
      headers: ["path"],
      cell: (item) => [item.path],
    }),
});

export const storagePathTestTool = defineTool({
  name: "storage_path_test",
  title: "Test a storage path template",
  description:
    "Render a storage path template against a real document and return the filename it would produce, without changing anything. Always do this before creating or updating a template — a wrong placeholder silently files documents somewhere unexpected.",
  toolset: "taxonomy",
  inputSchema: {
    path: z.string().describe(PATH_HELP),
    document: z
      .number()
      .int()
      .describe("Document id to render the template against, from document_search."),
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { path: string; document: number }, context) => {
    const rendered = await context.api.storagePaths.test(args.path, args.document);
    return output(
      `Template:\n  ${args.path}\n\nWould file document ${args.document} as:\n  ${rendered}`,
      { path: args.path, document: args.document, rendered },
    );
  },
});

export const storagePathCreateTool = defineTool({
  name: "storage_path_create",
  title: "Create a storage path",
  description:
    "Create a storage path template. Verify it with storage_path_test first: assigning a broken template reorganises files on disk. An auto-matching rule can file future documents under it automatically.",
  toolset: "taxonomy",
  inputSchema: {
    name: z.string().min(1).describe("Human-readable name, e.g. 'Invoices by year'."),
    path: z.string().describe(PATH_HELP),
    ...matchingShape,
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (args: { name: string; path: string } & MatchingArgs, context) => {
    const created = await context.api.storagePaths.create({
      name: args.name,
      path: args.path,
      ...matchingPatch(args),
    });
    context.taxonomy.invalidate();
    return output(
      `Created storage path "${created.name}" (id ${created.id}) with template:\n  ${created.path}`,
      created,
    );
  },
});

export const storagePathUpdateTool = defineTool({
  name: "storage_path_update",
  title: "Update a storage path",
  description:
    "Change a storage path's name, template or matching rule. Changing the template makes paperless move every document already assigned to it, so test the new template first and tell the user how many documents are affected.",
  toolset: "taxonomy",
  inputSchema: {
    id: z.number().int().describe("Storage path id from storage_path_list."),
    name: z.string().optional().describe("New name."),
    path: z.string().optional().describe(PATH_HELP),
    ...matchingShape,
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (args: { id: number; name?: string; path?: string } & MatchingArgs, context) => {
    const patch: Record<string, unknown> = matchingPatch(args);
    if (args.name !== undefined) patch["name"] = args.name;
    if (args.path !== undefined) patch["path"] = args.path;
    const updated = await context.api.storagePaths.update(args.id, patch);
    context.taxonomy.invalidate();
    return output(
      `${renderTable(["id", "name", "path"], [[updated.id, updated.name, updated.path]])}`,
      updated,
    );
  },
});

export const storagePathDeleteTool = defineTool({
  name: "storage_path_delete",
  title: "Delete a storage path",
  description:
    "Permanently delete a storage path. Documents filed under it are moved back to the default location — the files themselves move on disk, so report the document count before confirming.",
  toolset: "taxonomy",
  inputSchema: {
    id: z.number().int().describe("Storage path id from storage_path_list."),
    ...confirmShape,
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: (args: { id: number; confirm?: boolean }, context) =>
    deleteResource(context.api.storagePaths, args.id, args.confirm, "storage path", context),
});

export const storagePathTools: AnyToolDefinition[] = [
  storagePathListTool,
  storagePathTestTool,
  storagePathCreateTool,
  storagePathUpdateTool,
  storagePathDeleteTool,
];
