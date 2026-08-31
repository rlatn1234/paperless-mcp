import type { ResolvedConfig } from "../config/schema.js";
import type { Capabilities } from "../paperless/capabilities.js";
import type { PaperlessClient } from "../paperless/client.js";
import type { TaxonomyCache } from "../paperless/taxonomyCache.js";
import type { Logger } from "./logger.js";

/**
 * Everything a tool handler is allowed to reach.
 *
 * Scoped to one MCP session: in HTTP mode each session gets its own client and
 * therefore its own credentials, which is what keeps tenants apart.
 */
export interface ToolContext {
  api: PaperlessClient;
  /** id -> name lookups so results read as names rather than foreign keys. */
  taxonomy: TaxonomyCache;
  config: ResolvedConfig;
  caps: Capabilities;
  logger: Logger;
}
