import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { z } from "zod";

import type { Capabilities } from "../../paperless/capabilities.js";
import { PaperlessError } from "../../paperless/errors.js";
import { defineTool } from "../registry.js";
import { requireConfirm } from "../shared/guards.js";
import { output } from "../shared/responses.js";
import { confirmShape, documentIdShape } from "../shared/schemas.js";

/** Document versioning only exists on the v10 API surface. */
const supportsVersions = (caps: Capabilities): boolean => caps.features.documentVersions;

export const documentVersionUploadTool = defineTool({
  name: "document_version_upload",
  title: "Upload a new document version",
  description:
    "Replace a document's file with a new version while keeping its id, metadata and history. Use it when a better scan or a signed copy of the same document arrives — this preserves the paper trail, unlike deleting and re-uploading.",
  toolset: "versions",
  available: supportsVersions,
  inputSchema: {
    ...documentIdShape,
    file_path: z.string().describe("Absolute path to the replacement file on this machine."),
    filename: z.string().optional().describe("Override the filename sent to paperless."),
    label: z.string().optional().describe("Human-readable label for this version, e.g. 'signed copy'."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  handler: async (
    args: { id: number; file_path: string; filename?: string; label?: string },
    context,
  ) => {
    let bytes: Buffer;
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

    const name = args.filename ?? basename(args.file_path);
    const form = new FormData();
    form.append("document", new Blob([new Uint8Array(bytes)]), name);
    if (args.label) form.append("label", args.label);

    const result = await context.api.documents.uploadVersion(args.id, form);
    return output(`Uploaded "${name}" as a new version of document ${args.id}.`, result);
  },
});

export const documentVersionLabelTool = defineTool({
  name: "document_version_label",
  title: "Rename a document version",
  description:
    "Set the label on one version of a document so people can tell versions apart (for example 'original scan' vs 'countersigned').",
  toolset: "versions",
  available: supportsVersions,
  inputSchema: {
    ...documentIdShape,
    version_id: z.number().int().describe("Version id to relabel."),
    label: z.string().describe("New label."),
  },
  annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
  handler: async (args: { id: number; version_id: number; label: string }, context) => {
    const result = await context.api.documents.updateVersionLabel(
      args.id,
      args.version_id,
      args.label,
    );
    return output(`Renamed version ${args.version_id} of document ${args.id} to "${args.label}".`, result);
  },
});

export const documentVersionDeleteTool = defineTool({
  name: "document_version_delete",
  title: "Delete a document version",
  description:
    "Permanently delete one non-root version of a document. The root version cannot be removed this way — delete the document itself instead. Requires confirm=true.",
  toolset: "versions",
  available: supportsVersions,
  inputSchema: {
    ...documentIdShape,
    version_id: z.number().int().describe("Version id to delete."),
    ...confirmShape,
  },
  annotations: { readOnlyHint: false, destructiveHint: true, idempotentHint: true, openWorldHint: true },
  handler: async (args: { id: number; version_id: number; confirm?: boolean }, context) => {
    requireConfirm(
      args.confirm,
      "delete this version",
      `Version ${args.version_id} of document ${args.id} would be permanently removed.`,
    );
    const result = await context.api.documents.deleteVersion(args.id, args.version_id);
    return output(`Deleted version ${args.version_id} of document ${args.id}.`, result);
  },
});
