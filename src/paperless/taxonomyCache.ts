import type { Logger } from "../runtime/logger.js";
import type { PaperlessClient } from "./client.js";

export interface TaxonomyNames {
  tags: Map<number, string>;
  correspondents: Map<number, string>;
  documentTypes: Map<number, string>;
  storagePaths: Map<number, string>;
}

const EMPTY: TaxonomyNames = {
  tags: new Map(),
  correspondents: new Map(),
  documentTypes: new Map(),
  storagePaths: new Map(),
};

/**
 * Session-scoped id → name lookup for tags, correspondents, types and paths.
 *
 * paperless returns bare foreign keys on documents, so a raw result table reads
 * `tags: 3, 17` — accurate and useless. Four cached list calls turn that into
 * names the model can reason about, which is worth far more than the requests
 * cost.
 */
export class TaxonomyCache {
  #client: PaperlessClient;
  #logger: Logger;
  #ttlMs: number;
  #loadedAt = 0;
  #names: TaxonomyNames = EMPTY;
  #inflight: Promise<TaxonomyNames> | null = null;

  constructor(client: PaperlessClient, logger: Logger, ttlMs = 5 * 60_000) {
    this.#client = client;
    this.#logger = logger;
    this.#ttlMs = ttlMs;
  }

  invalidate(): void {
    this.#loadedAt = 0;
    this.#names = EMPTY;
  }

  async names(): Promise<TaxonomyNames> {
    if (Date.now() - this.#loadedAt < this.#ttlMs) return this.#names;
    if (this.#inflight) return this.#inflight;

    this.#inflight = this.#load()
      .then((names) => {
        this.#names = names;
        this.#loadedAt = Date.now();
        return names;
      })
      .catch((error: unknown) => {
        // Names are a nicety; never fail a search because the lookup failed.
        this.#logger.warn("taxonomy lookup failed; falling back to ids", {
          error: error instanceof Error ? error.message : String(error),
        });
        return EMPTY;
      })
      .finally(() => {
        this.#inflight = null;
      });

    return this.#inflight;
  }

  async #load(): Promise<TaxonomyNames> {
    const options = { maxItems: 1000, pageSize: 100 };
    const [tags, correspondents, documentTypes, storagePaths] = await Promise.all([
      this.#client.tags.listAll({}, options),
      this.#client.correspondents.listAll({}, options),
      this.#client.documentTypes.listAll({}, options),
      this.#client.storagePaths.listAll({}, options),
    ]);

    const toMap = (items: Array<{ id: number; name: string }>): Map<number, string> =>
      new Map(items.map((item) => [item.id, item.name]));

    return {
      tags: toMap(tags.items),
      correspondents: toMap(correspondents.items),
      documentTypes: toMap(documentTypes.items),
      storagePaths: toMap(storagePaths.items),
    };
  }
}

/** `17` → `"Invoices"`, or `"#17"` when the name is unknown. */
export function nameOf(map: Map<number, string>, id: number | null | undefined): string {
  if (id === null || id === undefined) return "";
  return map.get(id) ?? `#${id}`;
}

export function namesOf(map: Map<number, string>, ids: readonly number[] | undefined): string {
  if (!ids || ids.length === 0) return "";
  return ids.map((id) => nameOf(map, id)).join(", ");
}
