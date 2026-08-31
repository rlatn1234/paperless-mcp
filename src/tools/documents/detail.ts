import { z } from "zod";

import { nameOf, namesOf } from "../../paperless/taxonomyCache.js";
import { defineTool } from "../registry.js";
import {
  formatBytes,
  output,
  renderFields,
  renderTable,
} from "../shared/responses.js";
import { documentIdShape } from "../shared/schemas.js";

export const documentGetTool = defineTool({
  name: "document_get",
  title: "Get a document",
  description:
    "Full detail for one document: title, dates, correspondent, type, tags, ASN, custom fields, notes and (by default) the OCR'd text. Call this after document_search when you need to read or reason about the actual content.",
  toolset: "core",
  inputSchema: {
    ...documentIdShape,
    include_content: z
      .boolean()
      .optional()
      .describe("Include the OCR'd body text (default true). Set false when you only need metadata."),
    full_permissions: z
      .boolean()
      .optional()
      .describe("Include the expanded view/change permission lists instead of just the owner."),
    version: z
      .number()
      .int()
      .optional()
      .describe("Read a specific document version instead of the latest."),
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  aliases: ["get_document"],
  handler: async (
    args: { id: number; include_content?: boolean; full_permissions?: boolean; version?: number },
    context,
  ) => {
    const includeContent = args.include_content !== false;
    const options: { fullPerms?: boolean; version?: number } = {};
    if (args.full_permissions) options.fullPerms = true;
    if (args.version !== undefined) options.version = args.version;

    const [document, names] = await Promise.all([
      context.api.documents.getOne(args.id, options),
      context.taxonomy.names(),
    ]);

    const header = renderFields({
      id: document.id,
      title: document.title,
      created: (document.created ?? document.created_date ?? "").slice(0, 10),
      added: (document.added ?? "").slice(0, 10),
      modified: (document.modified ?? "").slice(0, 10),
      correspondent: nameOf(names.correspondents, document.correspondent),
      document_type: nameOf(names.documentTypes, document.document_type),
      storage_path: nameOf(names.storagePaths, document.storage_path),
      tags: namesOf(names.tags, document.tags),
      archive_serial_number: document.archive_serial_number,
      original_file_name: document.original_file_name,
      page_count: document.page_count,
      owner: document.owner,
      deleted_at: document.deleted_at,
    });

    const sections = [header];

    if (document.custom_fields?.length) {
      sections.push(
        `custom fields:\n${document.custom_fields
          .map((field) => `  - #${field.field}: ${JSON.stringify(field.value)}`)
          .join("\n")}`,
      );
    }
    if (document.notes?.length) {
      sections.push(
        `notes:\n${document.notes.map((note) => `  - [${note.id}] ${note.note}`).join("\n")}`,
      );
    }
    if (document.permissions) {
      sections.push(`permissions: ${JSON.stringify(document.permissions)}`);
    }
    if (includeContent && document.content) {
      sections.push(`content:\n${document.content}`);
    } else if (!includeContent) {
      sections.push("content: omitted (call again with include_content=true to read it)");
    }

    return output(sections.join("\n\n"), document);
  },
});

export const documentMetadataTool = defineTool({
  name: "document_metadata",
  title: "Get document file metadata",
  description:
    "File-level facts about a document: checksum, byte size, MIME type, stored filename, whether an archived (OCR'd PDF) version exists, and the embedded PDF/EXIF metadata. Use it to verify what was actually stored, spot duplicates by checksum, or check whether OCR produced an archive copy.",
  toolset: "core",
  inputSchema: {
    ...documentIdShape,
    version: z.number().int().optional().describe("Inspect a specific document version."),
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { id: number; version?: number }, context) => {
    const metadata = await context.api.documents.metadata(args.id, args.version);
    const summary = renderFields({
      media_filename: metadata.media_filename,
      original_filename: metadata.original_filename,
      original_mime_type: metadata.original_mime_type,
      original_size: metadata.original_size === undefined ? undefined : formatBytes(metadata.original_size),
      original_checksum: metadata.original_checksum,
      has_archive_version: metadata.has_archive_version,
      archive_size:
        metadata.archive_size === undefined || metadata.archive_size === null
          ? undefined
          : formatBytes(metadata.archive_size),
      archive_checksum: metadata.archive_checksum,
      lang: metadata.lang,
    });

    const embedded = metadata.original_metadata ?? [];
    const table = embedded.length
      ? `\n\nembedded metadata:\n${renderTable(
          ["prefix", "key", "value"],
          embedded.slice(0, 40).map((item) => [item.prefix, item.key, item.value]),
        )}`
      : "";

    return output(`${summary}${table}`, metadata);
  },
});

export const documentSuggestionsTool = defineTool({
  name: "document_suggestions",
  title: "Get classification suggestions",
  description:
    "Ask paperless what correspondent, tags, document type, storage path and date it would assign to a document, based on its trained classifier. Use it when triaging freshly consumed documents — propose the suggestions to the user, then apply them with document_update or documents_bulk_edit.",
  toolset: "core",
  inputSchema: documentIdShape,
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { id: number }, context) => {
    const [suggestions, names] = await Promise.all([
      context.api.documents.suggestions(args.id),
      context.taxonomy.names(),
    ]);
    const text = renderFields({
      correspondents: namesOf(names.correspondents, suggestions.correspondents),
      tags: namesOf(names.tags, suggestions.tags),
      document_types: namesOf(names.documentTypes, suggestions.document_types),
      storage_paths: namesOf(names.storagePaths, suggestions.storage_paths),
      dates: suggestions.dates,
    });
    return output(text || "paperless had no suggestions for this document.", suggestions);
  },
});

export const documentHistoryTool = defineTool({
  name: "document_history",
  title: "Get document change history",
  description:
    "Audit trail for a document: who changed which fields, when. Use it to explain how a document ended up with its current metadata, or to see whether a workflow or a person made a change. Requires the audit log to be enabled on the instance.",
  toolset: "core",
  inputSchema: documentIdShape,
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { id: number }, context) => {
    const entries = await context.api.documents.history(args.id);
    const rows = entries.map((entry) => [
      entry.timestamp?.slice(0, 19).replace("T", " "),
      entry.actor?.username ?? "system",
      entry.action,
      JSON.stringify(entry.changes ?? {}).slice(0, 160),
    ]);
    return output(
      renderTable(["when", "who", "action", "changes"], rows, "No recorded history."),
      entries,
    );
  },
});

export const documentNextAsnTool = defineTool({
  name: "document_next_asn",
  title: "Get next archive serial number",
  description:
    "Return the next free archive serial number (ASN). Call it before assigning an ASN so physical filing stays gap-free and no number is reused.",
  toolset: "core",
  inputSchema: {},
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (_args: Record<string, never>, context) => {
    const next = await context.api.documents.nextAsn();
    return output(`Next available archive serial number: ${next}`, { next_asn: next });
  },
});
