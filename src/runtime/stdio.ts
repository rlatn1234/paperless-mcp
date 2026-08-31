import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import type { ResolvedConfig } from "../config/schema.js";
import { createSession } from "./createServer.js";
import type { Logger } from "./logger.js";
import { endProcess } from "./shutdown.js";

export async function startStdio(config: ResolvedConfig, logger: Logger): Promise<void> {
  const { server, registration } = await createSession(config, logger);
  const transport = new StdioServerTransport();
  await server.connect(transport);

  logger.info("listening on stdio", { tools: registration.registered.length });

  const shutdown = (signal: string) => {
    logger.info("shutting down", { signal });
    void server.close().finally(() => endProcess(0));
  };
  process.once("SIGINT", () => shutdown("SIGINT"));
  process.once("SIGTERM", () => shutdown("SIGTERM"));
}
