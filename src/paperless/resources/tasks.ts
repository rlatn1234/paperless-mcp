import type { PaperlessHttp, QueryParams } from "../http.js";
import type { Paginated, PaperlessTask } from "../types.js";

export const TASK_STATUSES = ["pending", "started", "success", "failure", "revoked"] as const;

export const TASK_TYPES = [
  "consume_file",
  "train_classifier",
  "sanity_check",
  "index_optimize",
  "mail_fetch",
  "llm_index",
  "empty_trash",
  "check_workflows",
  "bulk_update",
  "reprocess_document",
  "build_share_link",
  "bulk_delete",
  "apply_ai_suggestions",
] as const;

export interface TaskStatusCounts {
  all: number;
  completed: number;
  in_progress: number;
  needs_attention: number;
}

export class TasksResource {
  constructor(private readonly http: PaperlessHttp) {}

  list(query: QueryParams = {}): Promise<Paginated<PaperlessTask>> {
    return this.http.json<Paginated<PaperlessTask>>("/tasks/", { query });
  }

  get(id: number): Promise<PaperlessTask> {
    return this.http.json<PaperlessTask>(`/tasks/${id}/`);
  }

  statusCounts(): Promise<TaskStatusCounts> {
    return this.http.json<TaskStatusCounts>("/tasks/status_counts/");
  }

  /** Marks tasks as seen so they stop being reported as needing attention. */
  acknowledge(tasks: number[]): Promise<unknown> {
    return this.http.json<unknown>("/tasks/acknowledge/", {
      method: "POST",
      json: { all: false, tasks },
    });
  }
}
