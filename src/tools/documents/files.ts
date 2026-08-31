import { mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { z } from "zod";

import { PaperlessError } from "../../paperless/errors.js";
import type { ToolContext } from "../../runtime/context.js";
import { defineTool } from "../registry.js";
import {
  formatBytes,
  imageBlock,
  output,
  resourceLinkBlock,
  type ToolOutput,
} from "../shared/responses.js";
import { documentIdShape } from "../shared/schemas.js";

/** Base64 in a tool result is charged to the context window; keep it tiny. */
const MAX_INLINE_IMAGE_BYTES = 1_500_000;
const MAX_BASE64_DOWNLOAD_BYTES = 5 * 1024 * 1024;

function filenameFrom(response: Response, fallback: string): string {
  const disposition = response.headers.get("content-disposition") ?? "";
  const utf8 = /filename\*=UTF-8''([^;]+)/i.exec(disposition);
  if (utf8?.[1]) return decodeURIComponent(utf8[1]).replace(/["']/g, "");
  const plain = /filename="?([^";]+)"?/i.exec(disposition);
  if (plain?.[1]) return plain[1].trim();
  return fallback;
}

/** Strips path separators so a server-supplied name cannot escape the directory. */
function safeName(name: string): string {
  return name.replace(/[/\\]/g, "_").replace(/^\.+/, "_") || "document";
}

async function saveToDisk(context: ToolContext, bytes: Uint8Array, name: string): Promise<string> {
  const directory = context.config.downloadDir
    ? resolve(context.config.downloadDir)
    : join(tmpdir(), "paperless-mcp");
  await mkdir(directory, { recursive: true });
  const target = join(directory, safeName(name));
  await writeFile(target, bytes);
  return target;
}

export const documentDownloadTool = defineTool({
  name: "document_download",
  title: "Download a document file",
  description:
    "Fetch a document's file and write it to disk on the machine running this server, returning the path. Use it to hand a user the actual PDF or to pass it to another tool. Base64 is available for small files but costs context — prefer the file path.",
  toolset: "core",
  inputSchema: {
    ...documentIdShape,
    original: z
      .boolean()
      .optional()
      .describe("Fetch the file exactly as uploaded instead of the archived, OCR'd PDF."),
    version: z.number().int().optional().describe("Download a specific document version."),
    as_base64: z
      .boolean()
      .optional()
      .describe(
        "Return the bytes inline as base64 instead of a path. Only for small files (<5 MB).",
      ),
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  aliases: ["download_document"],
  handler: async (
    args: { id: number; original?: boolean; version?: number; as_base64?: boolean },
    context,
  ): Promise<ToolOutput> => {
    const options: { original?: boolean; version?: number } = {};
    if (args.original) options.original = true;
    if (args.version !== undefined) options.version = args.version;

    const response = await context.api.documents.download(args.id, options);
    const bytes = new Uint8Array(await response.arrayBuffer());
    const mimeType = response.headers.get("content-type") ?? "application/octet-stream";
    const name = filenameFrom(response, `document-${args.id}.pdf`);

    if (args.as_base64) {
      if (bytes.byteLength > MAX_BASE64_DOWNLOAD_BYTES) {
        throw new PaperlessError({
          code: "validation",
          message: `That file is ${formatBytes(bytes.byteLength)}; inline base64 is capped at ${formatBytes(MAX_BASE64_DOWNLOAD_BYTES)}.`,
          hint: "Call again without as_base64 to write it to disk and get a path instead.",
        });
      }
      return output(`${name} (${formatBytes(bytes.byteLength)}, ${mimeType}), base64 follows.`, {
        filename: name,
        mimeType,
        base64: Buffer.from(bytes).toString("base64"),
      });
    }

    const path = await saveToDisk(context, bytes, name);
    return output(
      `Saved ${name} (${formatBytes(bytes.byteLength)}, ${mimeType}) to:\n${path}`,
      { path, filename: name, mimeType, bytes: bytes.byteLength },
      [resourceLinkBlock(pathToFileURL(path).href, name, mimeType)],
    );
  },
});

export const documentThumbnailTool = defineTool({
  name: "document_thumbnail",
  title: "Get a document thumbnail",
  description:
    "Return the document's thumbnail image inline, so you can actually look at the page. Useful for confirming you have the right document, or for reading a scan whose OCR text came out poor.",
  toolset: "core",
  inputSchema: documentIdShape,
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { id: number }, context): Promise<ToolOutput> => {
    const response = await context.api.documents.thumbnail(args.id);
    const bytes = new Uint8Array(await response.arrayBuffer());
    const mimeType = response.headers.get("content-type") ?? "image/webp";

    if (bytes.byteLength > MAX_INLINE_IMAGE_BYTES) {
      const path = await saveToDisk(context, bytes, `document-${args.id}-thumb`);
      return output(`Thumbnail was too large to inline; saved to ${path}`, { path });
    }
    return output(`Thumbnail for document ${args.id} (${mimeType}).`, undefined, [
      imageBlock(Buffer.from(bytes).toString("base64"), mimeType),
    ]);
  },
});

export const documentPreviewTool = defineTool({
  name: "document_preview",
  title: "Get a document preview",
  description:
    "Fetch the previewable rendering of a document. Images come back inline; PDFs are written to disk and the path returned, because a PDF cannot be shown inline. For reading text, document_get is cheaper.",
  toolset: "core",
  inputSchema: {
    ...documentIdShape,
    version: z.number().int().optional().describe("Preview a specific document version."),
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { id: number; version?: number }, context): Promise<ToolOutput> => {
    const response = await context.api.documents.preview(args.id, args.version);
    const bytes = new Uint8Array(await response.arrayBuffer());
    const mimeType = response.headers.get("content-type") ?? "application/octet-stream";

    if (mimeType.startsWith("image/") && bytes.byteLength <= MAX_INLINE_IMAGE_BYTES) {
      return output(`Preview of document ${args.id} (${mimeType}).`, undefined, [
        imageBlock(Buffer.from(bytes).toString("base64"), mimeType),
      ]);
    }

    const name = filenameFrom(response, `document-${args.id}-preview`);
    const path = await saveToDisk(context, bytes, name);
    return output(
      `Preview of document ${args.id} (${formatBytes(bytes.byteLength)}, ${mimeType}) saved to:\n${path}`,
      { path, mimeType, bytes: bytes.byteLength },
      [resourceLinkBlock(pathToFileURL(path).href, name, mimeType)],
    );
  },
});
