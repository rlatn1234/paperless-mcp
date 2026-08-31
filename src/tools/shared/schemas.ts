import { z } from "zod";

export const pageShape = {
  page: z.number().int().min(1).optional().describe("1-based page number."),
  page_size: z
    .number()
    .int()
    .min(1)
    .max(250)
    .optional()
    .describe("Results per page. Keep it small; large pages waste context."),
} as const;

export const confirmShape = {
  confirm: z
    .boolean()
    .optional()
    .describe(
      "Must be true to actually perform this irreversible action. Tell the user what will be affected first.",
    ),
} as const;

export const documentIdShape = {
  id: z.number().int().describe("Document id, from document_search."),
} as const;

/**
 * paperless accepts the matching algorithm as an integer on the wire, but the
 * docs and UI talk about it by name — and the upstream MCP server was
 * inconsistent, taking a number for tags and a string for correspondents. Both
 * spellings are accepted here and normalized before sending.
 */
export const MATCHING_ALGORITHMS = {
  any: 0,
  all: 1,
  literal: 2,
  regex: 3,
  fuzzy: 4,
  auto: 6,
} as const;

export const matchingAlgorithmSchema = z
  .union([
    z.enum(["any", "all", "literal", "regex", "fuzzy", "auto"]),
    z.number().int().min(0).max(6),
  ])
  .optional()
  .describe(
    "How `match` is applied: any (any word), all (all words), literal (exact phrase), regex, fuzzy, auto (learned). Numeric 0/1/2/3/4/6 also accepted.",
  );

export function normalizeMatchingAlgorithm(value: string | number | undefined): number | undefined {
  if (value === undefined) return undefined;
  if (typeof value === "number") return value;
  return MATCHING_ALGORITHMS[value as keyof typeof MATCHING_ALGORITHMS];
}

export const matchingShape = {
  match: z
    .string()
    .optional()
    .describe("Pattern paperless uses to auto-assign this object to incoming documents."),
  matching_algorithm: matchingAlgorithmSchema,
  is_insensitive: z.boolean().optional().describe("Case-insensitive matching (default true)."),
} as const;

export const permissionsShape = {
  owner: z
    .number()
    .int()
    .nullable()
    .optional()
    .describe("User id to own the object, or null for none."),
  view_users: z.array(z.number().int()).optional().describe("User ids granted view access."),
  view_groups: z.array(z.number().int()).optional().describe("Group ids granted view access."),
  change_users: z.array(z.number().int()).optional().describe("User ids granted edit access."),
  change_groups: z.array(z.number().int()).optional().describe("Group ids granted edit access."),
} as const;

export interface PermissionsInput {
  owner?: number | null;
  view_users?: number[];
  view_groups?: number[];
  change_users?: number[];
  change_groups?: number[];
}

/** Builds the `set_permissions` object paperless expects, or undefined if unset. */
export function buildSetPermissions(input: PermissionsInput): Record<string, unknown> | undefined {
  const hasAny = input.view_users || input.view_groups || input.change_users || input.change_groups;
  if (!hasAny) return undefined;
  return {
    view: { users: input.view_users ?? [], groups: input.view_groups ?? [] },
    change: { users: input.change_users ?? [], groups: input.change_groups ?? [] },
  };
}
