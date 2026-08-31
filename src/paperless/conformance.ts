/**
 * Compile-time conformance checks against the generated paperless-ngx schema.
 *
 * Nothing here runs. Each alias is an assertion that a path this client calls,
 * or a field it reads, still exists in `generated/openapi.d.ts`. When paperless
 * renames or drops something, `npm run typecheck` fails with the specific name
 * instead of the server failing at runtime in front of a user.
 *
 * Regenerate the schema with `npm run gen:openapi` after upgrading paperless.
 */
import type { components, paths } from "./generated/openapi.js";

/** Fails to compile unless `P` is a path the schema declares. */
type Path<P extends keyof paths> = P;

/** Fails to compile unless every `K` is a field of schema `T`. */
type Fields<T, K extends keyof T> = K;

// --- Paths -----------------------------------------------------------------

export type UsedPaths = Path<
  | "/api/documents/"
  | "/api/documents/{id}/"
  | "/api/documents/{id}/metadata/"
  | "/api/documents/{id}/suggestions/"
  | "/api/documents/{id}/history/"
  | "/api/documents/{id}/notes/"
  | "/api/documents/{id}/preview/"
  | "/api/documents/{id}/thumb/"
  | "/api/documents/{id}/download/"
  | "/api/documents/{id}/update_version/"
  | "/api/documents/{id}/versions/{version_id}/"
  | "/api/documents/post_document/"
  | "/api/documents/bulk_edit/"
  | "/api/documents/selection_data/"
  | "/api/documents/next_asn/"
  | "/api/bulk_edit_objects/"
  | "/api/tags/"
  | "/api/tags/{id}/"
  | "/api/correspondents/"
  | "/api/correspondents/{id}/"
  | "/api/document_types/"
  | "/api/document_types/{id}/"
  | "/api/storage_paths/"
  | "/api/storage_paths/{id}/"
  | "/api/storage_paths/test/"
  | "/api/custom_fields/"
  | "/api/custom_fields/{id}/"
  | "/api/saved_views/"
  | "/api/saved_views/{id}/"
  | "/api/ui_settings/"
  | "/api/tasks/"
  | "/api/tasks/{id}/"
  | "/api/tasks/acknowledge/"
  | "/api/tasks/status_counts/"
  | "/api/trash/"
  | "/api/users/"
  | "/api/users/{id}/"
  | "/api/groups/"
  | "/api/groups/{id}/"
  | "/api/statistics/"
  | "/api/search/"
  | "/api/search/autocomplete/"
  | "/api/status/"
>;

// --- Fields ----------------------------------------------------------------

export type DocumentFields = Fields<
  components["schemas"]["Document"],
  | "id"
  | "title"
  | "content"
  | "correspondent"
  | "document_type"
  | "storage_path"
  | "tags"
  | "created"
  | "created_date"
  | "modified"
  | "added"
  | "deleted_at"
  | "archive_serial_number"
  | "original_file_name"
  | "archived_file_name"
  | "owner"
  | "notes"
  | "custom_fields"
  | "permissions"
  | "page_count"
  | "mime_type"
>;

export type TagFields = Fields<
  components["schemas"]["Tag"],
  | "id"
  | "name"
  | "color"
  | "match"
  | "matching_algorithm"
  | "is_insensitive"
  | "is_inbox_tag"
  | "owner"
  | "document_count"
>;

export type CorrespondentFields = Fields<
  components["schemas"]["Correspondent"],
  "id" | "name" | "match" | "matching_algorithm" | "is_insensitive" | "owner" | "document_count"
>;

export type DocumentTypeFields = Fields<
  components["schemas"]["DocumentType"],
  "id" | "name" | "match" | "matching_algorithm" | "is_insensitive" | "owner" | "document_count"
>;

export type StoragePathFields = Fields<
  components["schemas"]["StoragePath"],
  | "id"
  | "name"
  | "path"
  | "match"
  | "matching_algorithm"
  | "is_insensitive"
  | "owner"
  | "document_count"
>;

export type CustomFieldFields = Fields<
  components["schemas"]["CustomField"],
  "id" | "name" | "data_type" | "extra_data" | "document_count"
>;

export type SavedViewFields = Fields<
  components["schemas"]["SavedView"],
  "id" | "name" | "sort_field" | "sort_reverse" | "filter_rules" | "owner"
>;

export type DocumentMetadataFields = Fields<
  components["schemas"]["Metadata"],
  | "original_checksum"
  | "original_size"
  | "original_mime_type"
  | "media_filename"
  | "has_archive_version"
  | "original_metadata"
  | "archive_checksum"
  | "archive_media_filename"
  | "original_filename"
  | "archive_size"
  | "archive_metadata"
  | "lang"
>;

export type SuggestionsFields = Fields<
  components["schemas"]["Suggestions"],
  "correspondents" | "tags" | "document_types" | "storage_paths" | "dates"
>;

export type TaskFields = Fields<
  components["schemas"]["TaskSerializerV10"],
  | "id"
  | "task_id"
  | "status"
  | "status_display"
  | "task_type"
  | "task_type_display"
  | "date_created"
  | "date_started"
  | "date_done"
  | "duration_seconds"
  | "related_document_ids"
  | "acknowledged"
  | "result_data"
>;

export type UserFields = Fields<
  components["schemas"]["User"],
  | "id"
  | "username"
  | "first_name"
  | "last_name"
  | "is_active"
  | "is_staff"
  | "is_superuser"
  | "groups"
>;

export type GroupFields = Fields<components["schemas"]["Group"], "id" | "name" | "permissions">;

export type TrashActions = components["schemas"]["TrashActionEnum"] extends "restore" | "empty"
  ? true
  : never;
