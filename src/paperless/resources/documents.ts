import type { PaperlessHttp, QueryParams } from "../http.js";
import type {
  AuditLogEntry,
  DocumentMetadata,
  DocumentNote,
  DocumentSuggestions,
  Paginated,
  PaperlessDocument,
} from "../types.js";
import { CrudResource } from "./crud.js";

/**
 * Fields returned by list/search calls when the caller does not ask for more.
 *
 * `content` is deliberately absent: a single OCR'd document routinely runs to
 * tens of thousands of characters and a page of them will blow any context
 * window. The projection is applied server-side via `?fields=`, so the payload
 * never crosses the wire in the first place.
 */
export const DEFAULT_DOCUMENT_FIELDS = [
  "id",
  "title",
  "created",
  "added",
  "correspondent",
  "document_type",
  "storage_path",
  "tags",
  "archive_serial_number",
  "owner",
  "original_file_name",
] as const;

export interface DocumentListOptions {
  query?: QueryParams;
  /** Field projection; pass `null` to let the server return everything. */
  fields?: readonly string[] | null;
  truncateContent?: boolean;
  page?: number;
  pageSize?: number;
}

export interface DownloadOptions {
  /** Fetch the file as uploaded rather than the archived/OCR'd PDF. */
  original?: boolean;
  version?: number;
}

export class DocumentsResource extends CrudResource<PaperlessDocument> {
  constructor(http: PaperlessHttp) {
    super(http, "/documents/");
  }

  search(options: DocumentListOptions = {}): Promise<Paginated<PaperlessDocument>> {
    const query: QueryParams = { ...options.query };
    if (options.fields !== null) {
      query["fields"] = [...(options.fields ?? DEFAULT_DOCUMENT_FIELDS)];
    }
    if (options.truncateContent) query["truncate_content"] = true;
    if (options.page !== undefined) query["page"] = options.page;
    if (options.pageSize !== undefined) query["page_size"] = options.pageSize;
    return this.list(query);
  }

  getOne(
    id: number,
    options: { fields?: readonly string[] | null; fullPerms?: boolean; version?: number } = {},
  ): Promise<PaperlessDocument> {
    const query: QueryParams = {};
    if (options.fields) query["fields"] = [...options.fields];
    if (options.fullPerms) query["full_perms"] = true;
    if (options.version !== undefined) query["version"] = options.version;
    return this.get(id, query);
  }

  /** Uploads a file for consumption. Resolves to the consumption task's UUID. */
  async upload(form: FormData): Promise<string> {
    const result = await this.http.json<string | { task_id?: string }>(
      "/documents/post_document/",
      { method: "POST", form },
    );
    if (typeof result === "string") return result;
    return result?.task_id ?? "";
  }

  metadata(id: number, version?: number): Promise<DocumentMetadata> {
    const query: QueryParams = {};
    if (version !== undefined) query["version"] = version;
    return this.http.json<DocumentMetadata>(`/documents/${id}/metadata/`, { query });
  }

  suggestions(id: number): Promise<DocumentSuggestions> {
    return this.http.json<DocumentSuggestions>(`/documents/${id}/suggestions/`);
  }

  aiSuggestions(id: number): Promise<unknown> {
    return this.http.json<unknown>(`/documents/${id}/ai_suggestions/`);
  }

  history(id: number): Promise<AuditLogEntry[]> {
    return this.http.json<AuditLogEntry[]>(`/documents/${id}/history/`);
  }

  notes(id: number): Promise<DocumentNote[]> {
    return this.http.json<DocumentNote[]>(`/documents/${id}/notes/`);
  }

  addNote(id: number, note: string): Promise<DocumentNote[]> {
    return this.http.json<DocumentNote[]>(`/documents/${id}/notes/`, {
      method: "POST",
      json: { note },
    });
  }

  /** paperless takes the note id as a query parameter, not a path segment. */
  deleteNote(id: number, noteId: number): Promise<DocumentNote[]> {
    return this.http.json<DocumentNote[]>(`/documents/${id}/notes/`, {
      method: "DELETE",
      query: { id: noteId },
    });
  }

  preview(id: number, version?: number): Promise<Response> {
    const query: QueryParams = {};
    if (version !== undefined) query["version"] = version;
    return this.http.raw(`/documents/${id}/preview/`, { query, accept: "*/*" });
  }

  thumbnail(id: number): Promise<Response> {
    return this.http.raw(`/documents/${id}/thumb/`, { accept: "*/*" });
  }

  download(id: number, options: DownloadOptions = {}): Promise<Response> {
    const query: QueryParams = {};
    if (options.original) query["original"] = true;
    if (options.version !== undefined) query["version"] = options.version;
    return this.http.raw(`/documents/${id}/download/`, { query, accept: "*/*" });
  }

  nextAsn(): Promise<number> {
    return this.http.json<number>("/documents/next_asn/");
  }

  /** More-like-this: paperless ranks by similarity to the given document. */
  similar(id: number, options: DocumentListOptions = {}): Promise<Paginated<PaperlessDocument>> {
    return this.search({ ...options, query: { ...options.query, more_like_id: id } });
  }

  uploadVersion(id: number, form: FormData): Promise<unknown> {
    return this.http.json<unknown>(`/documents/${id}/update_version/`, {
      method: "POST",
      form,
    });
  }

  deleteVersion(id: number, versionId: number): Promise<unknown> {
    return this.http.json<unknown>(`/documents/${id}/versions/${versionId}/`, {
      method: "DELETE",
    });
  }

  updateVersionLabel(id: number, versionId: number, label: string): Promise<unknown> {
    return this.http.json<unknown>(`/documents/${id}/versions/${versionId}/`, {
      method: "PATCH",
      json: { label },
    });
  }
}
