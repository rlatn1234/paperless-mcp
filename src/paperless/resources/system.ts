import type { PaperlessHttp, QueryParams } from "../http.js";
import type { Paginated, PaperlessDocument } from "../types.js";

export interface Statistics {
  documents_total: number;
  documents_inbox: number | null;
  inbox_tag: number | null;
  inbox_tags?: number[];
  document_file_type_counts: Array<{ mime_type: string; mime_type_count: number }>;
  character_count: number;
  tag_count: number;
  correspondent_count: number;
  document_type_count: number;
  storage_path_count: number;
  current_asn: number | null;
}

/**
 * `/api/search/` searches every object type at once, unlike `/api/documents/`
 * which only knows about documents.
 */
export interface GlobalSearchResult {
  total: number;
  documents: Array<{ id: number; title: string }>;
  saved_views: Array<{ id: number; name: string }>;
  tags: Array<{ id: number; name: string }>;
  correspondents: Array<{ id: number; name: string }>;
  document_types: Array<{ id: number; name: string }>;
  storage_paths: Array<{ id: number; name: string }>;
  users: Array<{ id: number; username: string }>;
  groups: Array<{ id: number; name: string }>;
  mail_rules: Array<{ id: number; name: string }>;
  mail_accounts: Array<{ id: number; name: string }>;
  workflows: Array<{ id: number; name: string }>;
  custom_fields: Array<{ id: number; name: string }>;
}

export class SystemResource {
  constructor(private readonly http: PaperlessHttp) {}

  statistics(): Promise<Statistics> {
    return this.http.json<Statistics>("/statistics/");
  }

  /** `dbOnly` skips the full-text index and matches names in the database only. */
  globalSearch(query: string, dbOnly?: boolean): Promise<GlobalSearchResult> {
    const params: QueryParams = { query };
    if (dbOnly !== undefined) params["db_only"] = dbOnly;
    return this.http.json<GlobalSearchResult>("/search/", { query: params });
  }

  autocomplete(term: string, limit?: number): Promise<string[]> {
    const params: QueryParams = { term };
    if (limit !== undefined) params["limit"] = limit;
    return this.http.json<string[]>("/search/autocomplete/", { query: params });
  }

  status(): Promise<Record<string, unknown>> {
    return this.http.json<Record<string, unknown>>("/status/");
  }

  remoteVersion(): Promise<Record<string, unknown>> {
    return this.http.json<Record<string, unknown>>("/remote_version/");
  }
}

export class TrashResource {
  constructor(private readonly http: PaperlessHttp) {}

  list(query: QueryParams = {}): Promise<Paginated<PaperlessDocument>> {
    return this.http.json<Paginated<PaperlessDocument>>("/trash/", { query });
  }

  restore(documents: number[]): Promise<unknown> {
    return this.http.json<unknown>("/trash/", {
      method: "POST",
      json: { action: "restore", documents },
    });
  }

  /** Omitting `documents` empties the whole trash, permanently. */
  empty(documents?: number[]): Promise<unknown> {
    const body: Record<string, unknown> = { action: "empty" };
    if (documents !== undefined) body["documents"] = documents;
    return this.http.json<unknown>("/trash/", { method: "POST", json: body });
  }
}
