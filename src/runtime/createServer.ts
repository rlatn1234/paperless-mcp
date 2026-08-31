import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

import type { ResolvedConfig } from "../config/schema.js";
import { probeCapabilities } from "../paperless/capabilities.js";
import { PaperlessClient } from "../paperless/client.js";
import { TaxonomyCache } from "../paperless/taxonomyCache.js";
import { allTools } from "../tools/index.js";
import {
  type AnyToolDefinition,
  type RegistrationSummary,
  registerTools,
} from "../tools/registry.js";
import { SERVER_NAME, SERVER_VERSION } from "../version.js";
import type { ToolContext } from "./context.js";
import type { Logger } from "./logger.js";

export interface Session {
  server: McpServer;
  context: ToolContext;
  registration: RegistrationSummary;
}

/**
 * Builds one fully wired MCP server.
 *
 * Deliberately per-session: an `McpServer` owns a single transport, so reusing
 * one instance across concurrent HTTP requests — as the upstream server did —
 * lets responses cross wires. Sessions also own their credentials, which is
 * what keeps tenants separated in HTTP mode.
 */
export async function createSession(
  config: ResolvedConfig,
  logger: Logger,
  tools: readonly AnyToolDefinition[] = allTools,
): Promise<Session> {
  const api = new PaperlessClient(config, logger);
  const caps = await probeCapabilities(api.http, logger, config.apiVersion);
  const taxonomy = new TaxonomyCache(api, logger);

  const context: ToolContext = { api, taxonomy, config, caps, logger };
  const server = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION },
    {
      instructions:
        "Tools for a paperless-ngx document archive. Names are not ids: resolve tags, correspondents and document types with the *_list tools, and find documents with document_search, before calling anything that takes ids. document_search omits OCR text by default — use document_get for the full content of the few documents that matter. Destructive tools require confirm=true, so summarise what will change for the user first.",
    },
  );

  const registration = registerTools(server, tools, context);
  return { server, context, registration };
}
