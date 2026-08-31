import { z } from "zod";

import { pageInfo } from "../../paperless/pagination.js";
import { TASK_STATUSES, TASK_TYPES } from "../../paperless/resources/tasks.js";
import { nameOf } from "../../paperless/taxonomyCache.js";
import { type AnyToolDefinition, defineTool } from "../registry.js";
import { limitDestructive, requireConfirm, requireNonEmpty } from "../shared/guards.js";
import { output, renderFields, renderPageFooter, renderTable } from "../shared/responses.js";
import { confirmShape, pageShape } from "../shared/schemas.js";

export const taskListTool = defineTool({
  name: "task_list",
  title: "List background tasks",
  description:
    "Show paperless's background jobs — file consumption, classifier training, mail fetches, bulk edits — with their status and duration. This is how you find out whether an upload actually finished, and why one failed. Filter by status='failure' to triage problems.",
  toolset: "admin",
  inputSchema: {
    status: z
      .enum(TASK_STATUSES)
      .optional()
      .describe("Filter by outcome. 'failure' surfaces jobs that need attention."),
    type: z.enum(TASK_TYPES).optional().describe("Filter by job kind, e.g. consume_file."),
    acknowledged: z
      .boolean()
      .optional()
      .describe("false shows only jobs nobody has marked as seen."),
    ...pageShape,
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (
    args: {
      status?: string;
      type?: string;
      acknowledged?: boolean;
      page?: number;
      page_size?: number;
    },
    context,
  ) => {
    const page = args.page ?? 1;
    const pageSize = Math.min(args.page_size ?? 25, context.config.maxPageSize);
    const query: Record<string, string | number | boolean> = {
      page,
      page_size: pageSize,
      ordering: "-date_created",
    };
    if (args.status) query["status"] = args.status;
    if (args.type) query["task_type"] = args.type;
    if (args.acknowledged !== undefined) query["acknowledged"] = args.acknowledged;

    const [response, counts] = await Promise.all([
      context.api.tasks.list(query),
      context.api.tasks.statusCounts().catch(() => null),
    ]);

    const rows = response.results.map((task) => [
      task.id,
      task.task_type_display ?? task.task_type ?? "",
      task.status_display ?? task.status,
      (task.date_created ?? "").slice(0, 19).replace("T", " "),
      task.duration_seconds === null || task.duration_seconds === undefined
        ? ""
        : `${Math.round(task.duration_seconds)}s`,
      (task.related_document_ids ?? []).join(", "),
    ]);

    const summary = counts
      ? `\n\ntotals — all ${counts.all}, in progress ${counts.in_progress}, needs attention ${counts.needs_attention}`
      : "";

    return output(
      `${renderTable(
        ["id", "type", "status", "created", "took", "documents"],
        rows,
        "No matching tasks.",
      )}\n\n${renderPageFooter(pageInfo(response, page, pageSize), "task_list")}${summary}`,
      response.results,
    );
  },
});

export const taskGetTool = defineTool({
  name: "task_get",
  title: "Get a background task",
  description:
    "Full detail for one background job, including the error text when it failed and the documents it produced. Use it after document_upload to confirm consumption succeeded, or to explain a failure to the user.",
  toolset: "admin",
  inputSchema: { id: z.number().int().describe("Task id from task_list.") },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { id: number }, context) => {
    const task = await context.api.tasks.get(args.id);
    const detail = renderFields({
      id: task.id,
      task_id: task.task_id,
      type: task.task_type_display ?? task.task_type,
      status: task.status_display ?? task.status,
      triggered_by: task.trigger_source_display,
      created: task.date_created,
      started: task.date_started,
      done: task.date_done,
      duration:
        task.duration_seconds === null || task.duration_seconds === undefined
          ? undefined
          : `${Math.round(task.duration_seconds)}s`,
      documents: (task.related_document_ids ?? []).join(", "),
      acknowledged: task.acknowledged,
    });
    const result =
      task.result_data === null || task.result_data === undefined
        ? ""
        : `\n\nresult:\n${JSON.stringify(task.result_data).slice(0, 2000)}`;
    return output(`${detail}${result}`, task);
  },
});

export const taskAcknowledgeTool = defineTool({
  name: "task_acknowledge",
  title: "Acknowledge tasks",
  description:
    "Mark failed or noisy jobs as seen so they stop being counted as needing attention. This only clears the notification — it does not retry anything or change any document.",
  toolset: "admin",
  inputSchema: {
    task_ids: z.array(z.number().int()).min(1).describe("Task ids from task_list."),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (args: { task_ids: number[] }, context) => {
    requireNonEmpty(args.task_ids, "task ids");
    await context.api.tasks.acknowledge(args.task_ids);
    return output(`Acknowledged ${args.task_ids.length} task(s).`, { ids: args.task_ids });
  },
});

export const trashListTool = defineTool({
  name: "trash_list",
  title: "List deleted documents",
  description:
    "Show documents in the trash and when each was deleted. Deleted documents stay recoverable until the trash is emptied or paperless's retention window passes, so check here before telling anyone something is gone.",
  toolset: "admin",
  inputSchema: pageShape,
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { page?: number; page_size?: number }, context) => {
    const page = args.page ?? 1;
    const pageSize = Math.min(args.page_size ?? 25, context.config.maxPageSize);
    const [response, names] = await Promise.all([
      context.api.trash.list({ page, page_size: pageSize }),
      context.taxonomy.names(),
    ]);

    const rows = response.results.map((document) => [
      document.id,
      document.title,
      (document.deleted_at ?? "").slice(0, 19).replace("T", " "),
      nameOf(names.correspondents, document.correspondent),
    ]);

    return output(
      `${renderTable(["id", "title", "deleted at", "correspondent"], rows, "The trash is empty.")}\n\n${renderPageFooter(
        pageInfo(response, page, pageSize),
        "trash_list",
      )}`,
      response.results,
    );
  },
});

export const trashRestoreTool = defineTool({
  name: "trash_restore",
  title: "Restore documents from trash",
  description:
    "Bring deleted documents back, with their metadata intact. This is the undo for document_delete and for a bulk delete.",
  toolset: "admin",
  inputSchema: {
    document_ids: z.array(z.number().int()).min(1).describe("Document ids from trash_list."),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (args: { document_ids: number[] }, context) => {
    requireNonEmpty(args.document_ids, "document ids");
    await context.api.trash.restore(args.document_ids);
    return output(`Restored ${args.document_ids.length} document(s) from the trash.`, {
      ids: args.document_ids,
    });
  },
});

export const trashEmptyTool = defineTool({
  name: "trash_empty",
  title: "Permanently delete from trash",
  description:
    "Permanently destroy documents in the trash, files included. There is no undo and no backup — this is the one operation in paperless that genuinely loses data. Omitting document_ids empties the entire trash. List the contents with trash_list and get explicit agreement before calling this.",
  toolset: "admin",
  requiresAdmin: true,
  inputSchema: {
    document_ids: z
      .array(z.number().int())
      .optional()
      .describe(
        "Ids to destroy. Omit to empty the whole trash — do that only on an explicit request.",
      ),
    ...confirmShape,
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: true,
    idempotentHint: true,
    openWorldHint: true,
  },
  handler: async (args: { document_ids?: number[]; confirm?: boolean }, context) => {
    if (args.document_ids?.length) {
      limitDestructive(
        args.document_ids.length,
        context.config.maxDestructive,
        "permanently delete",
      );
      requireConfirm(
        args.confirm,
        `permanently delete ${args.document_ids.length} document(s)`,
        "The files will be destroyed. This cannot be undone.",
      );
      await context.api.trash.empty(args.document_ids);
      return output(`Permanently deleted ${args.document_ids.length} document(s).`, {
        ids: args.document_ids,
      });
    }

    const contents = await context.api.trash.list({ page_size: 1 });
    requireConfirm(
      args.confirm,
      "empty the entire trash",
      `All ${contents.count} document(s) in the trash would be destroyed, files included. This cannot be undone.`,
    );
    await context.api.trash.empty();
    return output(`Emptied the trash — ${contents.count} document(s) permanently deleted.`, {
      count: contents.count,
    });
  },
});

export const userListTool = defineTool({
  name: "user_list",
  title: "List users",
  description:
    "List paperless users with their ids, so you can set ownership and permissions. Every permission parameter elsewhere (owner, view_users, change_users) takes ids from here. Passwords are never returned.",
  toolset: "admin",
  inputSchema: {
    id: z.number().int().optional().describe("Fetch just this user."),
    ...pageShape,
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { id?: number; page?: number; page_size?: number }, context) => {
    const headers = ["id", "username", "name", "active", "role", "groups"];
    // The API returns a `password` key; only ever render this whitelist.
    const row = (user: {
      id: number;
      username: string;
      first_name?: string;
      last_name?: string;
      is_active?: boolean;
      is_superuser?: boolean;
      is_staff?: boolean;
      groups?: number[];
    }) => [
      user.id,
      user.username,
      [user.first_name, user.last_name].filter(Boolean).join(" "),
      user.is_active === false ? "no" : "yes",
      user.is_superuser ? "superuser" : user.is_staff ? "staff" : "",
      (user.groups ?? []).join(", "),
    ];

    if (args.id !== undefined) {
      const user = await context.api.users.get(args.id);
      return output(renderTable(headers, [row(user)]), row(user));
    }

    const page = args.page ?? 1;
    const pageSize = Math.min(args.page_size ?? 100, context.config.maxPageSize);
    const response = await context.api.users.list({ page, page_size: pageSize });
    return output(
      `${renderTable(headers, response.results.map(row), "No users.")}\n\n${renderPageFooter(
        pageInfo(response, page, pageSize),
        "user_list",
      )}`,
      response.results.map(row),
    );
  },
});

export const groupListTool = defineTool({
  name: "group_list",
  title: "List groups",
  description:
    "List permission groups with their ids. Use these for view_groups and change_groups when sharing documents or taxonomy objects with a whole team rather than named individuals.",
  toolset: "admin",
  inputSchema: {
    id: z.number().int().optional().describe("Fetch just this group."),
    ...pageShape,
  },
  annotations: { readOnlyHint: true, openWorldHint: true },
  handler: async (args: { id?: number; page?: number; page_size?: number }, context) => {
    if (args.id !== undefined) {
      const group = await context.api.groups.get(args.id);
      return output(
        renderTable(
          ["id", "name", "permissions"],
          [[group.id, group.name, (group.permissions ?? []).length]],
        ),
        group,
      );
    }

    const page = args.page ?? 1;
    const pageSize = Math.min(args.page_size ?? 100, context.config.maxPageSize);
    const response = await context.api.groups.list({ page, page_size: pageSize });
    return output(
      `${renderTable(
        ["id", "name", "permissions"],
        response.results.map((group) => [group.id, group.name, (group.permissions ?? []).length]),
        "No groups.",
      )}\n\n${renderPageFooter(pageInfo(response, page, pageSize), "group_list")}`,
      response.results,
    );
  },
});

export const adminTools: AnyToolDefinition[] = [
  taskListTool,
  taskGetTool,
  taskAcknowledgeTool,
  trashListTool,
  trashRestoreTool,
  trashEmptyTool,
  userListTool,
  groupListTool,
];
