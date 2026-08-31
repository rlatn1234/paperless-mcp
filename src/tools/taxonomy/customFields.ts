import { z } from "zod";

import type { CustomField } from "../../paperless/types.js";
import { type AnyToolDefinition, defineTool } from "../registry.js";
import { output } from "../shared/responses.js";
import { confirmShape } from "../shared/schemas.js";
import { deleteResource, type ListArgs, listResource, listShape } from "./shared.js";

/** Mirrors DataTypeEnum in the paperless schema. */
const DATA_TYPES = [
  "string",
  "longtext",
  "url",
  "date",
  "boolean",
  "integer",
  "float",
  "monetary",
  "documentlink",
  "select",
] as const;

export const customFieldListTool = defineTool({
  name: "custom_field_list",
  title: "List custom fields",
  description:
    "List custom fields — the user-defined columns attached to documents (invoice total, due date, contract party) — with their ids, data types and usage counts, or fetch one by id. You need the id to read or filter on a field's values.",
  toolset: "taxonomy",
  inputSchema: listShape,
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: (args: ListArgs, context) =>
    listResource<CustomField>(context.api.customFields, args, context, "custom_field_list", {
      headers: ["type", "options"],
      cell: (field) => [
        field.data_type,
        // Only select fields carry options, and they are what makes the field usable.
        field.data_type === "select" ? JSON.stringify(field.extra_data ?? {}).slice(0, 120) : "",
      ],
    }),
});

export const customFieldCreateTool = defineTool({
  name: "custom_field_create",
  title: "Create a custom field",
  description:
    "Define a new custom field for documents. The data type is fixed at creation — paperless will not convert it later — so confirm with the user whether a number should be 'monetary', 'float' or 'integer' before creating it. 'select' fields need their options in extra_data.",
  toolset: "taxonomy",
  inputSchema: {
    name: z.string().min(1).describe("Field name shown on documents, e.g. 'Invoice total'."),
    data_type: z
      .enum(DATA_TYPES)
      .describe(
        "Value type. Cannot be changed afterwards: string/longtext for text, monetary for amounts with a currency, float/integer for plain numbers, date, boolean, url, documentlink to reference other documents, select for a fixed option list.",
      ),
    extra_data: z
      .record(z.string(), z.unknown())
      .optional()
      .describe(
        'Type-specific configuration. For select fields: {"select_options":[{"label":"Paid"},{"label":"Unpaid"}]}. For monetary: {"default_currency":"EUR"}.',
      ),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (
    args: { name: string; data_type: string; extra_data?: Record<string, unknown> },
    context,
  ) => {
    const body: Record<string, unknown> = { name: args.name, data_type: args.data_type };
    if (args.extra_data !== undefined) body["extra_data"] = args.extra_data;
    const field = await context.api.customFields.create(body);
    return output(
      `Created custom field "${field.name}" (id ${field.id}, type ${field.data_type}).`,
      field,
    );
  },
});

export const customFieldUpdateTool = defineTool({
  name: "custom_field_update",
  title: "Update a custom field",
  description:
    "Rename a custom field or change its configuration (for example adding options to a select field). The data type itself cannot be changed — to switch types you must create a new field and move the values across.",
  toolset: "taxonomy",
  inputSchema: {
    id: z.number().int().describe("Custom field id from custom_field_list."),
    name: z.string().optional().describe("New name."),
    extra_data: z
      .record(z.string(), z.unknown())
      .optional()
      .describe(
        "Replacement configuration. Sending this replaces the whole object, so include existing options you want to keep.",
      ),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (
    args: { id: number; name?: string; extra_data?: Record<string, unknown> },
    context,
  ) => {
    const patch: Record<string, unknown> = {};
    if (args.name !== undefined) patch["name"] = args.name;
    if (args.extra_data !== undefined) patch["extra_data"] = args.extra_data;
    const field = await context.api.customFields.update(args.id, patch);
    return output(`Updated custom field ${field.id} ("${field.name}").`, field);
  },
});

export const customFieldDeleteTool = defineTool({
  name: "custom_field_delete",
  title: "Delete a custom field",
  description:
    "Permanently delete a custom field and every value stored in it across all documents. The values are not recoverable — report how many documents use the field before confirming.",
  toolset: "taxonomy",
  inputSchema: {
    id: z.number().int().describe("Custom field id from custom_field_list."),
    ...confirmShape,
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: (args: { id: number; confirm?: boolean }, context) =>
    deleteResource(context.api.customFields, args.id, args.confirm, "custom field", context),
});

export const customFieldTools: AnyToolDefinition[] = [
  customFieldListTool,
  customFieldCreateTool,
  customFieldUpdateTool,
  customFieldDeleteTool,
];
