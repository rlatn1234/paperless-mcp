import { PaperlessError } from "../../paperless/errors.js";

/**
 * Destructive tools require an explicit `confirm: true`.
 *
 * The point is not to second-guess the operator — it is to make deletion a
 * deliberate second step for the model, so that a misread instruction costs a
 * refusal rather than a hundred documents.
 */
export function requireConfirm(
  confirmed: boolean | undefined,
  action: string,
  consequence: string,
): void {
  if (confirmed === true) return;
  throw new PaperlessError({
    code: "validation",
    message: `Refusing to ${action} without confirmation.`,
    detail: consequence,
    hint: "Show the user exactly what will be affected, and only then call again with confirm=true.",
  });
}

/** Caps how much damage a single destructive call can do. */
export function limitDestructive(count: number, max: number, action: string): void {
  if (count <= max) return;
  throw new PaperlessError({
    code: "validation",
    message: `Refusing to ${action} on ${count} objects; the limit is ${max}.`,
    hint: "Narrow the selection, or raise PAPERLESS_MAX_DESTRUCTIVE if this is intended.",
  });
}

export function requireNonEmpty(ids: readonly number[], what: string): void {
  if (ids.length > 0) return;
  throw new PaperlessError({
    code: "validation",
    message: `No ${what} were given.`,
    hint: `Find ids first (document_search, tag_list, …) and pass them explicitly.`,
  });
}
