import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { z } from "zod";

import { PaperlessError } from "../../paperless/errors.js";
import { nameOf, namesOf } from "../../paperless/taxonomyCache.js";
import { defineTool } from "../registry.js";
import { output, renderFields } from "../shared/responses.js";
import { confirmShape, documentIdShape } from "../shared/schemas.js";
import { requireConfirm } from "../shared/guards.js";

export const documentUpdateTool = defineTool({
  name: "document_update",
  title: "Update a document",
  description:
    "Change one document's metadata: title, date, correspondent, type, storage path, tags, ASN or owner. Tags can be replaced wholesale with `tags`, or adjusted incrementally with add_tags/remove_tags. For the same change across many documents use documents_bulk_edit instead.",
  toolset: "core",
  inputSchema: {
    ...documentIdShape,
    title: z.string().optional().describe("New title."),
    created: z
      .string()
      .optional()
      .describe("Document date as YYYY-MM-DD — the date on the document, not when it was filed."),
    correspondent: z
      .number()
      .int()
      .nullable()
      .optional()
      .describe("Correspondent id from correspondent_list, or null to clear."),
    document_type: z
      .number()
      .int()
      .nullable()
      .optional()
      .describe("Document type id from document_type_list, or null to clear."),
    storage_path: z
      .number()
      .int()
      .nullable()
      .optional()
      .describe("Storage path id, or null to clear."),
    tags: z
      .array(z.number().int())
      .optional()
      .describe("Replace the tag set entirely with these tag ids."),
    add_tags: z.array(z.number().int()).optional().describe("Tag ids to add, keeping the rest."),
    remove_tags: z.array(z.number().int()).optional().describe("Tag ids to remove, keeping the rest."),
    archive_serial_number: z
      .number()
      .int()
      .nullable()
      .optional()
      .describe("Archive serial number, or null to clear. Use document_next_asn to pick one."),
    owner: z.number().int().nullable().optional().describe("Owning user id, or null for unowned."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
  handler: async (
    args: {
      id: number;
      title?: string;
      created?: string;
      correspondent?: number | null;
      document_type?: number | null;
      storage_path?: number | null;
      tags?: number[];
      add_tags?: number[];
      remove_tags?: number[];
      archive_serial_number?: number | null;
      owner?: number | null;
    },
    context,
  ) => {
    const patch: Record<string, unknown> = {};
    if (args.title !== undefined) patch["title"] = args.title;
    if (args.created !== undefined) patch["created"] = args.created;
    if (args.correspondent !== undefined) patch["correspondent"] = args.correspondent;
    if (args.document_type !== undefined) patch["document_type"] = args.document_type;
    if (args.storage_path !== undefined) patch["storage_path"] = args.storage_path;
    if (args.archive_serial_number !== undefined) {
      patch["archive_serial_number"] = args.archive_serial_number;
    }
    if (args.owner !== undefined) patch["owner"] = args.owner;

    if (args.tags !== undefined) {
      patch["tags"] = args.tags;
    } else if (args.add_tags?.length || args.remove_tags?.length) {
      // paperless replaces the whole tag list on PATCH, so incremental edits
      // have to be computed against the document's current tags.
      const current = await context.api.documents.getOne(args.id, { fields: ["id", "tags"] });
      const next = new Set(current.tags ?? []);
      for (const tag of args.add_tags ?? []) next.add(tag);
      for (const tag of args.remove_tags ?? []) next.delete(tag);
      patch["tags"] = [...next];
    }

    if (Object.keys(patch).length === 0) {
      throw new PaperlessError({
        code: "validation",
        message: "Nothing to update.",
        hint: "Pass at least one field, for example title, tags or correspondent.",
      });
    }

    const [updated, names] = await Promise.all([
      context.api.documents.update(args.id, patch),
      context.taxonomy.names(),
    ]);

    const summary = renderFields({
      id: updated.id,
      title: updated.title,
      created: (updated.created ?? updated.created_date ?? "").slice(0, 10),
      correspondent: nameOf(names.correspondents, updated.correspondent),
      document_type: nameOf(names.documentTypes, updated.document_type),
      storage_path: nameOf(names.storagePaths, updated.storage_path),
      tags: namesOf(names.tags, updated.tags),
      archive_serial_number: updated.archive_serial_number,
    });

    return output(`Updated ${Object.keys(patch).join(", ")}.\n\n${summary}`, updated);
  },
});

export const documentDeleteTool = defineTool({
  name: "document_delete",
  title: "Delete a document",
  description:
    "Move one document to the paperless trash. It is recoverable until the trash is emptied or its retention window passes. Requires confirm=true; show the user the document's title first.",
  toolset: "core",
  inputSchema: { ...documentIdShape, ...confirmShape },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
  handler: async (args: { id: number; confirm?: boolean }, context) => {
    const document = await context.api.documents.getOne(args.id, { fields: ["id", "title"] });
    requireConfirm(
      args.confirm,
      "delete this document",
      `Document ${args.id} ("${document.title}") would be moved to the trash.`,
    );
    await context.api.documents.remove(args.id);
    return output(
      `Moved document ${args.id} ("${document.title}") to the trash. It can be restored until the trash is emptied.`,
      { id: args.id },
    );
  },
});

const MAX_INLINE_UPLOAD_BYTES = 25 * 1024 * 1024;

export const documentUploadTool = defineTool({
  name: "document_upload",
  title: "Upload a document",
  description:
    "Send a file to paperless for consumption (OCR, classification, filing). Prefer file_path — reading a local file avoids putting the whole document through the conversation as base64. Returns the consumption task id; the document itself appears a moment later, so poll with document_search rather than expecting an id back.",
  toolset: "core",
  inputSchema: {
    file_path: z
      .string()
      .optional()
      .describe("Absolute path to a local file. Preferred over content_base64."),
    content_base64: z
      .string()
      .optional()
      .describe("Base64 file contents, when the file is not on this machine. Keep it small."),
    filename: z
      .string()
      .optional()
      .describe("Filename with extension. Required with content_base64; derived from file_path otherwise."),
    title: z.string().optional().describe("Title to assign instead of the filename."),
    created: z.string().optional().describe("Document date as YYYY-MM-DD."),
    correspondent: z.number().int().optional().describe("Correspondent id to assign on consumption."),
    document_type: z.number().int().optional().describe("Document type id to assign."),
    storage_path: z.number().int().optional().describe("Storage path id to file it under."),
    tags: z.array(z.number().int()).optional().describe("Tag ids to apply."),
    archive_serial_number: z.number().int().optional().describe("Archive serial number to assign."),
    custom_fields: z
      .union([z.array(z.number().int()), z.record(z.string(), z.unknown())])
      .optional()
      .describe("Custom field ids to attach, or an object mapping field id to value."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  aliases: ["post_document"],
  handler: async (
    args: {
      file_path?: string;
      content_base64?: string;
      filename?: string;
      title?: string;
      created?: string;
      correspondent?: number;
      document_type?: number;
      storage_path?: number;
      tags?: number[];
      archive_serial_number?: number;
      custom_fields?: number[] | Record<string, unknown>;
    },
    context,
  ) => {
    let bytes: Buffer;
    let filename: string;

    if (args.file_path) {
      try {
        bytes = await readFile(args.file_path);
      } catch (cause) {
        throw new PaperlessError({
          code: "validation",
          message: `Could not read "${args.file_path}".`,
          hint: "Give an absolute path that exists on the machine running this MCP server.",
          cause,
        });
      }
      filename = args.filename ?? basename(args.file_path);
    } else if (args.content_base64) {
      bytes = Buffer.from(args.content_base64, "base64");
      if (!args.filename) {
        throw new PaperlessError({
          code: "validation",
          message: "filename is required when uploading with content_base64.",
          hint: "paperless needs the extension to pick a parser, e.g. invoice.pdf.",
        });
      }
      filename = args.filename;
    } else {
      throw new PaperlessError({
        code: "validation",
        message: "Provide either file_path or content_base64.",
        hint: "file_path is preferred — it keeps the file out of the conversation.",
      });
    }

    if (bytes.byteLength > MAX_INLINE_UPLOAD_BYTES) {
      throw new PaperlessError({
        code: "validation",
        message: `File is ${Math.round(bytes.byteLength / 1024 / 1024)} MB; the limit is ${MAX_INLINE_UPLOAD_BYTES / 1024 / 1024} MB.`,
        hint: "Upload very large files through the paperless consume directory instead.",
      });
    }

    const form = new FormData();
    form.append("document", new Blob([new Uint8Array(bytes)]), filename);
    if (args.title) form.append("title", args.title);
    if (args.created) form.append("created", args.created);
    if (args.correspondent !== undefined) form.append("correspondent", String(args.correspondent));
    if (args.document_type !== undefined) form.append("document_type", String(args.document_type));
    if (args.storage_path !== undefined) form.append("storage_path", String(args.storage_path));
    if (args.archive_serial_number !== undefined) {
      form.append("archive_serial_number", String(args.archive_serial_number));
    }
    for (const tag of args.tags ?? []) form.append("tags", String(tag));
    if (Array.isArray(args.custom_fields)) {
      for (const field of args.custom_fields) form.append("custom_fields", String(field));
    } else if (args.custom_fields) {
      form.append("custom_fields", JSON.stringify(args.custom_fields));
    }

    const taskId = await context.api.documents.upload(form);
    return output(
      `Queued "${filename}" (${bytes.byteLength} bytes) for consumption.\ntask id: ${taskId || "(not reported)"}\n\nConsumption runs asynchronously. Find the document with document_search once it finishes.`,
      { task_id: taskId, filename },
    );
  },
});
