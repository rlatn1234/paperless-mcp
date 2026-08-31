import type { PaperlessHttp, QueryParams } from "../http.js";
import { type AutoPaginateResult, autoPaginate } from "../pagination.js";
import type { Paginated } from "../types.js";

/**
 * Standard DRF ModelViewSet operations.
 *
 * Almost every paperless-ngx resource — tags, correspondents, document types,
 * storage paths, custom fields, saved views, workflows, mail rules, users,
 * groups — is a plain ModelViewSet, so they all share this client rather than
 * each getting a bespoke one.
 */
export class CrudResource<T> {
  constructor(
    protected readonly http: PaperlessHttp,
    readonly basePath: string,
  ) {}

  list(query: QueryParams = {}): Promise<Paginated<T>> {
    return this.http.json<Paginated<T>>(this.basePath, { query });
  }

  /** Walks pages until `maxItems`, so callers never silently see page 1 only. */
  listAll(
    query: QueryParams = {},
    options: { maxItems: number; pageSize: number },
  ): Promise<AutoPaginateResult<T>> {
    return autoPaginate<T>(
      (page, pageSize) => this.list({ ...query, page, page_size: pageSize }),
      options,
    );
  }

  get(id: number, query: QueryParams = {}): Promise<T> {
    return this.http.json<T>(`${this.basePath}${id}/`, { query });
  }

  create(data: unknown): Promise<T> {
    return this.http.json<T>(this.basePath, { method: "POST", json: data });
  }

  /** PATCH, not PUT — partial updates avoid clobbering fields we did not send. */
  update(id: number, data: unknown): Promise<T> {
    return this.http.json<T>(`${this.basePath}${id}/`, { method: "PATCH", json: data });
  }

  async remove(id: number): Promise<void> {
    await this.http.json<void>(`${this.basePath}${id}/`, { method: "DELETE" });
  }
}
