import { z } from "zod";

import { nameFilterShape, nameFilterToQuery } from "../../paperless/filters.js";
import { pageInfo } from "../../paperless/pagination.js";
import type { CrudResource } from "../../paperless/resources/crud.js";
import type { ToolContext } from "../../runtime/context.js";
import { requireConfirm } from "../shared/guards.js";
import { output, renderPageFooter, renderTable } from "../shared/responses.js";
import { normalizeMatchingAlgorithm, pageShape } from "../shared/schemas.js";

/**
 * Shared plumbing for the taxonomy resources — tags, correspondents, document
 * types, storage paths, custom fields. They are all plain DRF ModelViewSets, so
 * only their descriptions and their handful of extra fields differ.
 */

export const listShape = {
  id: z
    .number()
    .int()
    .optional()
    .describe("Fetch just this one by id, instead of listing. Returns its full detail."),
  ...nameFilterShape,
  ...pageShape,
} as const;

export interface ListArgs {
  id?: number;
  name_contains?: string;
  name_exact?: string;
  page?: number;
  page_size?: number;
}

export interface MatchingArgs {
  match?: string;
  matching_algorithm?: string | number;
  is_insensitive?: boolean;
}

export function matchingPatch(args: MatchingArgs): Record<string, unknown> {
  const patch: Record<string, unknown> = {};
  if (args.match !== undefined) patch["match"] = args.match;
  const algorithm = normalizeMatchingAlgorithm(args.matching_algorithm);
  if (algorithm !== undefined) patch["matching_algorithm"] = algorithm;
  if (args.is_insensitive !== undefined) patch["is_insensitive"] = args.is_insensitive;
  return patch;
}

export interface ExtraColumns<T> {
  headers: string[];
  cell: (item: T) => Array<string | number | undefined>;
}

type Named = { id: number; name: string; document_count?: number };

/**
 * Lists a taxonomy resource, or fetches one by id.
 *
 * Folding retrieval into the list tool covers `GET /{id}/` without spending a
 * second tool definition on every resource — the listing budget is the scarce
 * thing here, not the endpoint count.
 */
export async function listResource<T extends Named>(
  resource: CrudResource<T>,
  args: ListArgs,
  context: ToolContext,
  toolName: string,
  extraColumns?: ExtraColumns<T>,
) {
  const headers = ["id", "name", "documents", ...(extraColumns?.headers ?? [])];
  const row = (item: T) => [
    item.id,
    item.name,
    item.document_count ?? "",
    ...(extraColumns?.cell(item) ?? []),
  ];

  if (args.id !== undefined) {
    const item = await resource.get(args.id);
    return output(renderTable(headers, [row(item)]), item);
  }

  const page = args.page ?? 1;
  const pageSize = Math.min(args.page_size ?? 100, context.config.maxPageSize);
  const response = await resource.list({
    ...nameFilterToQuery(args),
    page,
    page_size: pageSize,
    ordering: "name",
  });

  const info = pageInfo(response, page, pageSize);
  return output(
    `${renderTable(headers, response.results.map(row), "None found.")}\n\n${renderPageFooter(
      info,
      toolName,
    )}`,
    response.results,
  );
}

/**
 * Shared delete flow.
 *
 * Fetches the object first so the confirmation message can name it and say how
 * many documents it is attached to — a bare id gives the user nothing to judge.
 */
export async function deleteResource<T extends Named>(
  resource: CrudResource<T>,
  id: number,
  confirmed: boolean | undefined,
  label: string,
  context: ToolContext,
) {
  const item = await resource.get(id);
  requireConfirm(
    confirmed,
    `delete this ${label}`,
    `"${item.name}" would be removed from ${item.document_count ?? "an unknown number of"} document(s). This cannot be undone.`,
  );
  await resource.remove(id);
  context.taxonomy.invalidate();
  return output(`Deleted ${label} ${id} ("${item.name}").`, { id });
}
