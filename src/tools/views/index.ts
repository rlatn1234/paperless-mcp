import { z } from "zod";

import { pageInfo } from "../../paperless/pagination.js";
import { type AnyToolDefinition, defineTool } from "../registry.js";
import { requireConfirm } from "../shared/guards.js";
import { output, renderPageFooter, renderTable } from "../shared/responses.js";
import { confirmShape, pageShape } from "../shared/schemas.js";

const filterRuleSchema = z.object({
  rule_type: z
    .number()
    .int()
    .describe(
      "paperless filter rule type id — the numeric code for 'has tag', 'created after', etc.",
    ),
  value: z.string().nullable().describe("Rule value, as a string; null for rules that take none."),
});

export const savedViewListTool = defineTool({
  name: "saved_view_list",
  title: "List saved views",
  description:
    "List the saved views defined in paperless — named, stored filter sets people use as their working queues ('Unpaid invoices', 'To file'). Reading one tells you how its owner defines that queue; you can then reproduce it with document_search.",
  toolset: "views",
  inputSchema: {
    id: z.number().int().optional().describe("Fetch just this view, with its full filter rules."),
    ...pageShape,
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { id?: number; page?: number; page_size?: number }, context) => {
    if (args.id !== undefined) {
      const view = await context.api.savedViews.get(args.id);
      const rules = view.filter_rules ?? [];
      return output(
        `${view.name} (id ${view.id})\nsort: ${view.sort_field ?? "default"}${view.sort_reverse ? " (reversed)" : ""}\n\n${renderTable(
          ["rule_type", "value"],
          rules.map((rule) => [rule.rule_type, rule.value ?? ""]),
          "This view has no filter rules.",
        )}`,
        view,
      );
    }

    const page = args.page ?? 1;
    const pageSize = Math.min(args.page_size ?? 100, context.config.maxPageSize);
    const response = await context.api.savedViews.list({ page, page_size: pageSize });
    const info = pageInfo(response, page, pageSize);

    return output(
      `${renderTable(
        ["id", "name", "rules", "sort"],
        response.results.map((view) => [
          view.id,
          view.name,
          view.filter_rules?.length ?? 0,
          view.sort_field ?? "",
        ]),
        "No saved views.",
      )}\n\n${renderPageFooter(info, "saved_view_list")}`,
      response.results,
    );
  },
});

export const savedViewCreateTool = defineTool({
  name: "saved_view_create",
  title: "Create a saved view",
  description:
    "Save a filter set as a named view so it appears in the paperless UI. Filter rules use paperless's numeric rule_type codes — read an existing view with saved_view_list first to see the codes this instance uses.",
  toolset: "views",
  inputSchema: {
    name: z.string().min(1).describe("View name as it will appear in the sidebar."),
    filter_rules: z.array(filterRuleSchema).describe("Filter rules that define the view."),
    sort_field: z
      .string()
      .optional()
      .describe("Field to sort by, e.g. 'created', 'title', 'archive_serial_number'."),
    sort_reverse: z.boolean().optional().describe("Sort descending."),
    page_size: z.number().int().optional().describe("Page size to use when displaying the view."),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (
    args: {
      name: string;
      filter_rules: Array<{ rule_type: number; value: string | null }>;
      sort_field?: string;
      sort_reverse?: boolean;
      page_size?: number;
    },
    context,
  ) => {
    const body: Record<string, unknown> = {
      name: args.name,
      filter_rules: args.filter_rules,
      sort_reverse: args.sort_reverse ?? false,
    };
    if (args.sort_field !== undefined) body["sort_field"] = args.sort_field;
    if (args.page_size !== undefined) body["page_size"] = args.page_size;

    const view = await context.api.savedViews.create(body);
    return output(`Created saved view "${view.name}" with id ${view.id}.`, view);
  },
});

export const savedViewUpdateTool = defineTool({
  name: "saved_view_update",
  title: "Update a saved view",
  description:
    "Change a saved view's name, sorting or filter rules. Passing filter_rules replaces the whole rule set, so read the view first and send the complete list you want.",
  toolset: "views",
  inputSchema: {
    id: z.number().int().describe("Saved view id from saved_view_list."),
    name: z.string().optional().describe("New name."),
    filter_rules: z
      .array(filterRuleSchema)
      .optional()
      .describe("Replacement rule set — this replaces, it does not merge."),
    sort_field: z.string().optional().describe("New sort field."),
    sort_reverse: z.boolean().optional().describe("Sort descending."),
    page_size: z.number().int().optional().describe("Page size to use when displaying the view."),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (
    args: {
      id: number;
      name?: string;
      filter_rules?: Array<{ rule_type: number; value: string | null }>;
      sort_field?: string;
      sort_reverse?: boolean;
      page_size?: number;
    },
    context,
  ) => {
    const patch: Record<string, unknown> = {};
    if (args.name !== undefined) patch["name"] = args.name;
    if (args.filter_rules !== undefined) patch["filter_rules"] = args.filter_rules;
    if (args.sort_field !== undefined) patch["sort_field"] = args.sort_field;
    if (args.sort_reverse !== undefined) patch["sort_reverse"] = args.sort_reverse;
    if (args.page_size !== undefined) patch["page_size"] = args.page_size;

    const view = await context.api.savedViews.update(args.id, patch);
    return output(`Updated saved view ${view.id} ("${view.name}").`, view);
  },
});

export const savedViewDeleteTool = defineTool({
  name: "saved_view_delete",
  title: "Delete a saved view",
  description:
    "Permanently delete a saved view. Only the view is removed — no documents are affected. It may belong to another user and appear in their sidebar, so confirm before deleting one you did not create.",
  toolset: "views",
  inputSchema: {
    id: z.number().int().describe("Saved view id from saved_view_list."),
    ...confirmShape,
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (args: { id: number; confirm?: boolean }, context) => {
    const view = await context.api.savedViews.get(args.id);
    requireConfirm(
      args.confirm,
      "delete this saved view",
      `Saved view "${view.name}" would be removed. Documents are not affected.`,
    );
    await context.api.savedViews.remove(args.id);
    return output(`Deleted saved view ${args.id} ("${view.name}").`, { id: args.id });
  },
});

export const uiSettingsGetTool = defineTool({
  name: "ui_settings_get",
  title: "Get UI settings",
  description:
    "Read the signed-in user's paperless UI settings and the permissions their token carries. The permission list is the quickest way to explain why a call failed with 'forbidden' rather than guessing.",
  toolset: "views",
  inputSchema: {},
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (_args: Record<string, never>, context) => {
    const settings = await context.api.uiSettings.get();
    const user = settings.user ?? { id: 0 };
    const permissions = settings.permissions ?? [];
    return output(
      `user: ${user.username ?? user.id ?? "unknown"}${user.is_superuser ? " (superuser)" : ""}\npermissions: ${permissions.length}\nsettings keys: ${Object.keys(settings.settings ?? {}).join(", ") || "(none)"}`,
      settings,
    );
  },
});

export const uiSettingsUpdateTool = defineTool({
  name: "ui_settings_update",
  title: "Update UI settings",
  description:
    "Store the signed-in user's UI settings. paperless replaces the whole settings object, so this tool reads the current value and merges your keys into it rather than wiping the rest.",
  toolset: "views",
  inputSchema: {
    settings: z
      .record(z.string(), z.unknown())
      .describe("Keys to set. Merged into the existing settings; keys you omit are preserved."),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (args: { settings: Record<string, unknown> }, context) => {
    const current = await context.api.uiSettings.get();
    const merged = { ...(current.settings ?? {}), ...args.settings };
    await context.api.uiSettings.update(merged);
    return output(`Updated UI settings: ${Object.keys(args.settings).join(", ")}.`, merged);
  },
});

export const viewTools: AnyToolDefinition[] = [
  savedViewListTool,
  savedViewCreateTool,
  savedViewUpdateTool,
  savedViewDeleteTool,
  uiSettingsGetTool,
  uiSettingsUpdateTool,
];
