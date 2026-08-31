import { z } from "zod";
import type { QueryParams } from "./http.js";

/**
 * A curated subset of paperless-ngx's document filterset.
 *
 * The Django filterset accepts hundreds of `field__lookup` combinations. Naming
 * them all in a tool schema would cost more tokens than it saves, so this
 * exposes the filters people actually reach for under names a model can guess,
 * and maps them to the wire format here.
 */
export const documentFilterShape = {
  title_contains: z
    .string()
    .optional()
    .describe("Case-insensitive substring match on the title only."),
  content_contains: z
    .string()
    .optional()
    .describe(
      "Case-insensitive substring match on the OCR'd body text. For ranked full-text search use the `query` parameter instead.",
    ),
  correspondent_ids: z
    .array(z.number().int())
    .optional()
    .describe("Match documents whose correspondent is any of these ids (from correspondent_list)."),
  document_type_ids: z
    .array(z.number().int())
    .optional()
    .describe("Match documents whose type is any of these ids (from document_type_list)."),
  storage_path_ids: z
    .array(z.number().int())
    .optional()
    .describe("Match documents stored under any of these storage path ids."),
  tag_ids_all: z
    .array(z.number().int())
    .optional()
    .describe("Match documents carrying ALL of these tag ids."),
  tag_ids_any: z
    .array(z.number().int())
    .optional()
    .describe("Match documents carrying ANY of these tag ids."),
  tag_ids_none: z
    .array(z.number().int())
    .optional()
    .describe("Exclude documents carrying any of these tag ids."),
  is_tagged: z
    .boolean()
    .optional()
    .describe(
      "false returns untagged documents only — the usual way to find an unprocessed inbox.",
    ),
  created_after: z.string().optional().describe("Document date on or after this YYYY-MM-DD."),
  created_before: z.string().optional().describe("Document date on or before this YYYY-MM-DD."),
  added_after: z.string().optional().describe("Consumed by paperless on or after this YYYY-MM-DD."),
  added_before: z
    .string()
    .optional()
    .describe("Consumed by paperless on or before this YYYY-MM-DD."),
  archive_serial_number: z.number().int().optional().describe("Exact archive serial number (ASN)."),
  has_archive_serial_number: z
    .boolean()
    .optional()
    .describe("true returns only documents that have an ASN assigned."),
  owner_ids: z
    .array(z.number().int())
    .optional()
    .describe("Match documents owned by any of these user ids."),
  is_unowned: z
    .boolean()
    .optional()
    .describe("true returns documents with no owner (visible to everyone)."),
  custom_field_query: z
    .string()
    .optional()
    .describe(
      'Custom-field filter in paperless JSON syntax, e.g. ["Invoice total","range",[100,500]] or ["OR",[["Paid","exact",true],["Due","isnull",true]]]. Supported ops: exact, in, isnull, exists, icontains, range, contains.',
    ),
  document_ids: z
    .array(z.number().int())
    .optional()
    .describe("Restrict the result to these document ids."),
} as const;

export const documentFilterSchema = z.object(documentFilterShape);
export type DocumentFilter = z.infer<typeof documentFilterSchema>;

export const DOCUMENT_ORDERING = [
  "created",
  "-created",
  "added",
  "-added",
  "modified",
  "-modified",
  "title",
  "-title",
  "archive_serial_number",
  "-archive_serial_number",
  "correspondent__name",
  "-correspondent__name",
  "document_type__name",
  "-document_type__name",
  "num_notes",
  "-num_notes",
] as const;

export const documentOrderingSchema = z
  .enum(DOCUMENT_ORDERING)
  .optional()
  .describe("Sort order. A leading '-' reverses it; '-created' is newest first.");

/** Maps the friendly filter object onto paperless-ngx query parameters. */
export function documentFilterToQuery(filter: DocumentFilter | undefined): QueryParams {
  if (!filter) return {};
  const query: QueryParams = {};

  if (filter.title_contains) query["title__icontains"] = filter.title_contains;
  if (filter.content_contains) query["content__icontains"] = filter.content_contains;
  if (filter.correspondent_ids?.length) query["correspondent__id__in"] = filter.correspondent_ids;
  if (filter.document_type_ids?.length) query["document_type__id__in"] = filter.document_type_ids;
  if (filter.storage_path_ids?.length) query["storage_path__id__in"] = filter.storage_path_ids;
  if (filter.tag_ids_all?.length) query["tags__id__all"] = filter.tag_ids_all;
  if (filter.tag_ids_any?.length) query["tags__id__in"] = filter.tag_ids_any;
  if (filter.tag_ids_none?.length) query["tags__id__none"] = filter.tag_ids_none;
  if (filter.is_tagged !== undefined) query["is_tagged"] = filter.is_tagged;
  if (filter.created_after) query["created__date__gte"] = filter.created_after;
  if (filter.created_before) query["created__date__lte"] = filter.created_before;
  if (filter.added_after) query["added__date__gte"] = filter.added_after;
  if (filter.added_before) query["added__date__lte"] = filter.added_before;
  if (filter.archive_serial_number !== undefined) {
    query["archive_serial_number"] = filter.archive_serial_number;
  }
  if (filter.has_archive_serial_number !== undefined) {
    query["archive_serial_number__isnull"] = !filter.has_archive_serial_number;
  }
  if (filter.owner_ids?.length) query["owner__id__in"] = filter.owner_ids;
  if (filter.is_unowned !== undefined) query["owner__isnull"] = filter.is_unowned;
  if (filter.custom_field_query) query["custom_field_query"] = filter.custom_field_query;
  if (filter.document_ids?.length) query["id__in"] = filter.document_ids;

  return query;
}

/** Filters shared by the taxonomy endpoints (tags, correspondents, types, …). */
export const nameFilterShape = {
  name_contains: z.string().optional().describe("Case-insensitive substring match on the name."),
  name_exact: z.string().optional().describe("Exact (case-insensitive) name match."),
} as const;

export function nameFilterToQuery(filter: {
  name_contains?: string;
  name_exact?: string;
}): QueryParams {
  const query: QueryParams = {};
  if (filter.name_contains) query["name__icontains"] = filter.name_contains;
  if (filter.name_exact) query["name__iexact"] = filter.name_exact;
  return query;
}
