import type { PaperlessHttp } from "../http.js";

export const BULK_EDIT_METHODS = [
  "set_correspondent",
  "set_document_type",
  "set_storage_path",
  "add_tag",
  "remove_tag",
  "modify_tags",
  "modify_custom_fields",
  "delete",
  "reprocess",
  "set_permissions",
  "merge",
  "split",
  "rotate",
  "delete_pages",
  "edit_pdf",
  "remove_password",
] as const;

export type BulkEditMethod = (typeof BULK_EDIT_METHODS)[number];

export const BULK_OBJECT_TYPES = [
  "tags",
  "correspondents",
  "document_types",
  "storage_paths",
] as const;

export type BulkObjectType = (typeof BULK_OBJECT_TYPES)[number];

export interface SelectionData {
  selected_correspondents: Array<{ id: number; document_count: number }>;
  selected_tags: Array<{ id: number; document_count: number }>;
  selected_document_types: Array<{ id: number; document_count: number }>;
  selected_storage_paths?: Array<{ id: number; document_count: number }>;
}

export class BulkResource {
  constructor(private readonly http: PaperlessHttp) {}

  editDocuments(
    documents: number[],
    method: BulkEditMethod,
    parameters: Record<string, unknown> = {},
  ): Promise<unknown> {
    return this.http.json<unknown>("/documents/bulk_edit/", {
      method: "POST",
      json: { documents, method, parameters },
    });
  }

  editObjects(
    objects: number[],
    objectType: BulkObjectType,
    operation: "set_permissions" | "delete",
    parameters: Record<string, unknown> = {},
  ): Promise<unknown> {
    return this.http.json<unknown>("/bulk_edit_objects/", {
      method: "POST",
      json: { objects, object_type: objectType, operation, ...parameters },
    });
  }

  /**
   * Aggregate counts for a document selection — how many carry each tag,
   * correspondent and type. Used to preview the blast radius of a bulk edit
   * before running it.
   */
  selectionData(documents: number[]): Promise<SelectionData> {
    return this.http.json<SelectionData>("/documents/selection_data/", {
      method: "POST",
      json: { documents },
    });
  }
}
