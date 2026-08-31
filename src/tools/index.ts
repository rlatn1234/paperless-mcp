import type { AnyToolDefinition } from "./registry.js";
import { bulkTools } from "./bulk/index.js";
import {
  documentGetTool,
  documentHistoryTool,
  documentMetadataTool,
  documentNextAsnTool,
  documentSuggestionsTool,
} from "./documents/detail.js";
import {
  documentDownloadTool,
  documentPreviewTool,
  documentThumbnailTool,
} from "./documents/files.js";
import {
  documentDeleteTool,
  documentUpdateTool,
  documentUploadTool,
} from "./documents/mutate.js";
import {
  documentNoteAddTool,
  documentNoteDeleteTool,
  documentNotesListTool,
} from "./documents/notes.js";
import { documentSearchTool, documentSimilarTool } from "./documents/search.js";
import {
  documentVersionDeleteTool,
  documentVersionLabelTool,
  documentVersionUploadTool,
} from "./documents/versions.js";
import { taxonomyTools } from "./taxonomy/index.js";

export const documentTools: AnyToolDefinition[] = [
  documentSearchTool,
  documentSimilarTool,
  documentGetTool,
  documentMetadataTool,
  documentSuggestionsTool,
  documentHistoryTool,
  documentNextAsnTool,
  documentUpdateTool,
  documentDeleteTool,
  documentUploadTool,
  documentNotesListTool,
  documentNoteAddTool,
  documentNoteDeleteTool,
  documentDownloadTool,
  documentThumbnailTool,
  documentPreviewTool,
];

export const versionTools: AnyToolDefinition[] = [
  documentVersionUploadTool,
  documentVersionLabelTool,
  documentVersionDeleteTool,
];

/** Every tool this server knows about; the registry decides which are exposed. */
export const allTools: AnyToolDefinition[] = [
  ...documentTools,
  ...taxonomyTools,
  ...bulkTools,
  ...versionTools,
];
