/**
 * Hand-written shapes for the parts of the paperless-ngx API this server
 * touches.
 *
 * These are deliberately partial and permissive: paperless adds fields between
 * releases, and a strict mirror would break on upgrade. `scripts/gen-openapi.ts`
 * (P1 follow-up) generates exact types from a live instance's `/api/schema/`
 * for contract tests; these interfaces are what the tool layer programs against.
 */

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
  /** Present when the request asked for the full id set. */
  all?: number[];
}

export interface PermissionSet {
  users: number[];
  groups: number[];
}

export interface ObjectPermissions {
  view: PermissionSet;
  change: PermissionSet;
}

export interface MatchingFields {
  match?: string;
  /** 0 any, 1 all, 2 literal, 3 regex, 4 fuzzy, 6 auto. */
  matching_algorithm?: number;
  is_insensitive?: boolean;
}

export interface CustomFieldValue {
  field: number;
  value: unknown;
}

export interface PaperlessDocument {
  id: number;
  title: string;
  content?: string;
  correspondent: number | null;
  document_type: number | null;
  storage_path: number | null;
  tags: number[];
  created?: string;
  created_date?: string;
  modified?: string;
  added?: string;
  deleted_at?: string | null;
  archive_serial_number: number | null;
  original_file_name?: string;
  archived_file_name?: string | null;
  owner?: number | null;
  notes?: DocumentNote[];
  custom_fields?: CustomFieldValue[];
  permissions?: ObjectPermissions;
  user_can_change?: boolean;
  is_shared_by_requester?: boolean;
  page_count?: number | null;
  mime_type?: string;
  /** Full-text search score, present on `?query=` results. */
  __search_hit__?: { score?: number; rank?: number; highlights?: string };
}

export interface DocumentNote {
  id: number;
  note: string;
  created: string;
  user?: number | { id: number; username?: string };
}

export interface DocumentMetadataItem {
  namespace: string;
  prefix: string;
  key: string;
  value: string;
}

export interface DocumentMetadata {
  original_checksum: string;
  original_size: number;
  original_mime_type: string;
  media_filename: string;
  has_archive_version: boolean;
  original_metadata: DocumentMetadataItem[];
  archive_checksum?: string | null;
  archive_media_filename?: string | null;
  original_filename?: string;
  archive_size?: number | null;
  archive_metadata?: DocumentMetadataItem[];
  lang?: string;
}

export interface DocumentSuggestions {
  correspondents: number[];
  tags: number[];
  document_types: number[];
  storage_paths: number[];
  dates: string[];
}

export interface AuditLogEntry {
  id: number;
  actor: { id: number; username: string } | null;
  action: string;
  timestamp: string;
  changes: Record<string, unknown>;
}

export interface Tag extends MatchingFields {
  id: number;
  name: string;
  slug?: string;
  colour?: string;
  color?: string;
  is_inbox_tag?: boolean;
  document_count?: number;
  owner?: number | null;
}

export interface Correspondent extends MatchingFields {
  id: number;
  name: string;
  slug?: string;
  document_count?: number;
  last_correspondence?: string | null;
  owner?: number | null;
}

export interface DocumentType extends MatchingFields {
  id: number;
  name: string;
  slug?: string;
  document_count?: number;
  owner?: number | null;
}

export interface StoragePath extends MatchingFields {
  id: number;
  name: string;
  slug?: string;
  path: string;
  document_count?: number;
  owner?: number | null;
}

export interface CustomField {
  id: number;
  name: string;
  data_type: string;
  extra_data?: Record<string, unknown> | null;
  document_count?: number;
}

/** Async task record returned by uploads and reported by `/tasks/`. */
export interface PaperlessTask {
  id: number;
  task_id: string;
  status: string;
  status_display?: string;
  task_type?: string;
  task_type_display?: string;
  trigger_source_display?: string;
  date_created?: string;
  date_started?: string | null;
  date_done?: string | null;
  duration_seconds?: number | null;
  related_document_ids?: number[];
  acknowledged?: boolean;
  owner?: number | null;
  input_data?: unknown;
  result_data?: unknown;
}

export interface PaperlessUser {
  id: number;
  username: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
  is_staff?: boolean;
  is_superuser?: boolean;
  groups?: number[];
  is_mfa_enabled?: boolean;
}

export interface PaperlessGroup {
  id: number;
  name: string;
  permissions?: string[];
}

export interface SavedViewFilterRule {
  rule_type: number;
  value: string | null;
}

export interface SavedView {
  id: number;
  name: string;
  sort_field?: string | null;
  sort_reverse?: boolean;
  filter_rules: SavedViewFilterRule[];
  page_size?: number | null;
  display_mode?: string | null;
  display_fields?: unknown;
  icon?: string;
  owner?: number | null;
}

/**
 * `/ui_settings/` returns an open-ended blob: the signed-in user, the
 * permissions they hold, and whatever the web UI has stored. Only `settings` is
 * writable, and paperless replaces it wholesale.
 */
export interface UiSettings {
  user?: { id: number; username?: string; is_superuser?: boolean };
  settings?: Record<string, unknown>;
  permissions?: string[];
  [key: string]: unknown;
}
