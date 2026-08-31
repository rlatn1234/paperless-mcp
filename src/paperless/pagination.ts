import type { Paginated } from "./types.js";

export interface PageRequest {
  page?: number | undefined;
  page_size?: number | undefined;
}

export interface PageInfo {
  page: number;
  pageSize: number;
  count: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export function pageInfo<T>(response: Paginated<T>, page: number, pageSize: number): PageInfo {
  const count = response.count ?? response.results.length;
  const totalPages = pageSize > 0 ? Math.max(1, Math.ceil(count / pageSize)) : 1;
  return {
    page,
    pageSize,
    count,
    totalPages,
    hasNext: response.next !== null && response.next !== undefined,
    hasPrevious: response.previous !== null && response.previous !== undefined,
  };
}

export interface AutoPaginateOptions {
  /** Stop once this many items have been collected. */
  maxItems: number;
  pageSize: number;
  /** Guards against a server that never reports `next: null`. */
  maxPages?: number;
}

export interface AutoPaginateResult<T> {
  items: T[];
  count: number;
  /** True when more matched than were returned. */
  truncated: boolean;
}

/**
 * Walks every page of a list endpoint up to a ceiling.
 *
 * The upstream server returned only the first page of tags, correspondents and
 * document types and silently dropped the rest; anything that needs a complete
 * set goes through here instead.
 */
export async function autoPaginate<T>(
  load: (page: number, pageSize: number) => Promise<Paginated<T>>,
  options: AutoPaginateOptions,
): Promise<AutoPaginateResult<T>> {
  const { maxItems, pageSize } = options;
  const maxPages = options.maxPages ?? 50;

  const items: T[] = [];
  let page = 1;
  let count = 0;

  for (; page <= maxPages; page += 1) {
    const response = await load(page, pageSize);
    count = response.count ?? response.results.length;
    items.push(...response.results);

    if (items.length >= maxItems) {
      return { items: items.slice(0, maxItems), count, truncated: count > maxItems };
    }
    if (!response.next) break;
  }

  return { items, count, truncated: items.length < count };
}
