import { z } from "zod";

import { PaperlessError } from "../../paperless/errors.js";
import {
  BULK_EDIT_METHODS,
  BULK_OBJECT_TYPES,
  type BulkEditMethod,
  type BulkObjectType,
} from "../../paperless/resources/bulk.js";
import { nameOf } from "../../paperless/taxonomyCache.js";
import { defineTool, type AnyToolDefinition } from "../registry.js";
import { limitDestructive, requireConfirm, requireNonEmpty } from "../shared/guards.js";
import { output, renderTable } from "../shared/responses.js";
import {
  buildSetPermissions,
  confirmShape,
  permissionsShape,
  type PermissionsInput,
} from "../shared/schemas.js";

/** Methods that destroy data rather than just re-labelling it. */
const DESTRUCTIVE_METHODS = new Set<BulkEditMethod>(["delete", "delete_pages"]);

interface BulkEditArgs extends PermissionsInput {
  documents: number[];
  method: BulkEditMethod;
  correspondent?: number | null;
  document_type?: number | null;
  storage_path?: number | null;
  tag?: number;
  add_tags?: number[];
  remove_tags?: number[];
  add_custom_fields?: number[];
  remove_custom_fields?: number[];
  metadata_document_id?: number;
  delete_originals?: boolean;
  pages?: string;
  degrees?: number;
  remote_ocr?: boolean;
  merge_permissions?: boolean;
  dry_run?: boolean;
  confirm?: boolean;
}

function buildParameters(args: BulkEditArgs): Record<string, unknown> {
  const parameters: Record<string, unknown> = {};

  switch (args.method) {
    case "set_correspondent":
      parameters["correspondent"] = args.correspondent ?? null;
      break;
    case "set_document_type":
      parameters["document_type"] = args.document_type ?? null;
      break;
    case "set_storage_path":
      parameters["storage_path"] = args.storage_path ?? null;
      break;
    case "add_tag":
    case "remove_tag":
      if (args.tag === undefined) {
        throw new PaperlessError({
          code: "validation",
          message: `method "${args.method}" needs a tag id.`,
          hint: "Pass tag=<id> from tag_list.",
        });
      }
      parameters["tag"] = args.tag;
      break;
    case "modify_tags":
      parameters["add_tags"] = args.add_tags ?? [];
      parameters["remove_tags"] = args.remove_tags ?? [];
      break;
    case "modify_custom_fields":
      parameters["add_custom_fields"] = args.add_custom_fields ?? [];
      parameters["remove_custom_fields"] = args.remove_custom_fields ?? [];
      break;
    case "set_permissions": {
      if (args.owner !== undefined) parameters["owner"] = args.owner;
      const permissions = buildSetPermissions(args);
      if (permissions) parameters["set_permissions"] = permissions;
      if (args.merge_permissions !== undefined) parameters["merge"] = args.merge_permissions;
      break;
    }
    case "merge":
      if (args.metadata_document_id !== undefined) {
        parameters["metadata_document_id"] = args.metadata_document_id;
      }
      if (args.delete_originals !== undefined) parameters["delete_originals"] = args.delete_originals;
      break;
    case "split":
      if (args.pages !== undefined) parameters["pages"] = args.pages;
      if (args.delete_originals !== undefined) parameters["delete_originals"] = args.delete_originals;
      break;
    case "rotate":
      if (args.degrees === undefined) {
        throw new PaperlessError({
          code: "validation",
          message: 'method "rotate" needs degrees.',
          hint: "Pass degrees=90, 180 or 270.",
        });
      }
      parameters["degrees"] = args.degrees;
      break;
    case "delete_pages":
      if (!args.pages) {
        throw new PaperlessError({
          code: "validation",
          message: 'method "delete_pages" needs pages.',
          hint: 'Pass pages like "1,3,5-7".',
        });
      }
      parameters["pages"] = args.pages;
      break;
    case "reprocess":
      if (args.remote_ocr !== undefined) parameters["remote_ocr"] = args.remote_ocr;
      break;
    case "delete":
      break;
  }

  return parameters;
}

export const documentsBulkEditTool = defineTool({
  name: "documents_bulk_edit",
  title: "Bulk edit documents",
  description:
    "Apply one operation to many documents at once: assign correspondent/type/storage path, add or remove tags and custom fields, set permissions, reprocess, rotate, merge, split, delete pages, or delete. Get the ids from document_search. Call with dry_run=true first to see exactly what the selection contains before changing anything.",
  toolset: "bulk",
  inputSchema: {
    documents: z
      .array(z.number().int())
      .min(1)
      .describe("Document ids to act on, from document_search."),
    method: z
      .enum(BULK_EDIT_METHODS)
      .describe(
        "Operation to apply. set_correspondent/set_document_type/set_storage_path assign metadata; add_tag/remove_tag/modify_tags manage tags; modify_custom_fields manages custom fields; set_permissions changes access; reprocess re-runs OCR; rotate/merge/split/delete_pages alter the files; delete moves documents to the trash.",
      ),
    correspondent: z.number().int().nullable().optional().describe("For set_correspondent."),
    document_type: z.number().int().nullable().optional().describe("For set_document_type."),
    storage_path: z.number().int().nullable().optional().describe("For set_storage_path."),
    tag: z.number().int().optional().describe("For add_tag / remove_tag."),
    add_tags: z.array(z.number().int()).optional().describe("For modify_tags."),
    remove_tags: z.array(z.number().int()).optional().describe("For modify_tags."),
    add_custom_fields: z.array(z.number().int()).optional().describe("For modify_custom_fields."),
    remove_custom_fields: z.array(z.number().int()).optional().describe("For modify_custom_fields."),
    metadata_document_id: z
      .number()
      .int()
      .optional()
      .describe("For merge: the document whose metadata the merged result inherits."),
    delete_originals: z
      .boolean()
      .optional()
      .describe("For merge/split: delete the source documents afterwards. Irreversible."),
    pages: z.string().optional().describe('Page spec for split/delete_pages, e.g. "1,3,5-7".'),
    degrees: z.number().int().optional().describe("For rotate: 90, 180 or 270."),
    remote_ocr: z.boolean().optional().describe("For reprocess: use the remote OCR engine."),
    merge_permissions: z
      .boolean()
      .optional()
      .describe("For set_permissions: merge with existing permissions instead of replacing them."),
    ...permissionsShape,
    dry_run: z
      .boolean()
      .optional()
      .describe("Report what the selection contains and stop, without changing anything."),
    ...confirmShape,
  },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: true },
  aliases: ["bulk_edit_documents"],
  handler: async (args: BulkEditArgs, context) => {
    requireNonEmpty(args.documents, "document ids");

    if (args.dry_run) {
      const [selection, names] = await Promise.all([
        context.api.bulk.selectionData(args.documents),
        context.taxonomy.names(),
      ]);
      const rows = [
        ...selection.selected_tags.map((item) => [
          "tag",
          nameOf(names.tags, item.id),
          item.document_count,
        ]),
        ...selection.selected_correspondents.map((item) => [
          "correspondent",
          nameOf(names.correspondents, item.id),
          item.document_count,
        ]),
        ...selection.selected_document_types.map((item) => [
          "document type",
          nameOf(names.documentTypes, item.id),
          item.document_count,
        ]),
      ].filter((row) => Number(row[2]) > 0);

      return output(
        `Dry run — nothing was changed.\n\n${args.documents.length} document(s) selected for "${args.method}".\n\n${renderTable(["kind", "name", "documents"], rows, "The selection has no shared metadata.")}\n\nCall again without dry_run to apply.`,
        selection,
      );
    }

    const irreversible =
      DESTRUCTIVE_METHODS.has(args.method) ||
      ((args.method === "merge" || args.method === "split") && args.delete_originals === true);

    if (irreversible) {
      limitDestructive(args.documents.length, context.config.maxDestructive, args.method);
      requireConfirm(
        args.confirm,
        `run "${args.method}" on ${args.documents.length} document(s)`,
        args.method === "delete"
          ? `${args.documents.length} document(s) would be moved to the trash.`
          : `${args.documents.length} document(s) would be modified irreversibly.`,
      );
    }

    const parameters = buildParameters(args);
    const result = await context.api.bulk.editDocuments(args.documents, args.method, parameters);
    return output(
      `Applied "${args.method}" to ${args.documents.length} document(s).`,
      result,
    );
  },
});

interface BulkObjectArgs extends PermissionsInput {
  object_type: BulkObjectType;
  ids: number[];
  operation: "set_permissions" | "delete";
  merge_permissions?: boolean;
  confirm?: boolean;
}

export const objectsBulkEditTool = defineTool({
  name: "objects_bulk_edit",
  title: "Bulk edit tags, correspondents, types or storage paths",
  description:
    "Delete several tags, correspondents, document types or storage paths at once, or set their permissions in one call. Deletion strips the object from every document that uses it and cannot be undone.",
  toolset: "bulk",
  inputSchema: {
    object_type: z
      .enum(BULK_OBJECT_TYPES)
      .describe("Which kind of object the ids refer to."),
    ids: z.array(z.number().int()).min(1).describe("Object ids, from the matching list tool."),
    operation: z
      .enum(["set_permissions", "delete"])
      .describe("set_permissions changes who may see/edit them; delete removes them entirely."),
    merge_permissions: z
      .boolean()
      .optional()
      .describe("Merge with existing permissions instead of replacing them."),
    ...permissionsShape,
    ...confirmShape,
  },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: true },
  aliases: ["bulk_edit_tags", "bulk_edit_correspondents", "bulk_edit_document_types"],
  handler: async (args: BulkObjectArgs, context) => {
    requireNonEmpty(args.ids, "object ids");

    const parameters: Record<string, unknown> = {};
    if (args.operation === "set_permissions") {
      if (args.owner !== undefined) parameters["owner"] = args.owner;
      const permissions = buildSetPermissions(args);
      if (permissions) parameters["permissions"] = permissions;
      if (args.merge_permissions !== undefined) parameters["merge"] = args.merge_permissions;
    } else {
      limitDestructive(args.ids.length, context.config.maxDestructive, "delete objects");
      requireConfirm(
        args.confirm,
        `delete ${args.ids.length} ${args.object_type}`,
        `They would be removed from every document that uses them. This cannot be undone.`,
      );
    }

    const result = await context.api.bulk.editObjects(
      args.ids,
      args.object_type,
      args.operation,
      parameters,
    );
    if (args.operation === "delete") context.taxonomy.invalidate();

    return output(
      `Ran "${args.operation}" on ${args.ids.length} ${args.object_type}.`,
      result,
    );
  },
});

export const bulkTools: AnyToolDefinition[] = [documentsBulkEditTool, objectsBulkEditTool];
