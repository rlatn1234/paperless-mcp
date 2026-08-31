import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import express, { type Request, type Response } from "express";

import type { ResolvedConfig } from "../config/schema.js";
import { createSession } from "./createServer.js";
import type { Logger } from "./logger.js";
import { endProcess } from "./shutdown.js";

function methodNotAllowed(res: Response): void {
  res.status(405).json({
    jsonrpc: "2.0",
    error: { code: -32000, message: "Method not allowed. POST JSON-RPC to /mcp." },
    id: null,
  });
}

/**
 * Streamable HTTP transport, one MCP server instance per request.
 *
 * The SDK's stateless mode requires a fresh server per request: an `McpServer`
 * binds to exactly one transport, so sharing an instance across requests makes
 * concurrent calls answer on each other's connections.
 */
export async function startHttp(config: ResolvedConfig, logger: Logger): Promise<void> {
  const app = express();
  app.use(express.json({ limit: "8mb" }));

  app.get("/healthz", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });

  app.post("/mcp", async (req: Request, res: Response) => {
    const requestLogger = logger.child({ requestId: `${Date.now().toString(36)}` });
    let closed = false;

    try {
      const { server } = await createSession(config, requestLogger);
      const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });

      res.on("close", () => {
        if (closed) return;
        closed = true;
        void transport.close();
        void server.close();
      });

      await server.connect(transport);
      await transport.handleRequest(req, res, req.body);
    } catch (error) {
      requestLogger.error("mcp request failed", {
        error: error instanceof Error ? error.message : String(error),
      });
      if (!res.headersSent) {
        res.status(500).json({
          jsonrpc: "2.0",
          error: { code: -32603, message: "Internal server error" },
          id: null,
        });
      }
    }
  });

  app.get("/mcp", (_req: Request, res: Response) => methodNotAllowed(res));
  app.delete("/mcp", (_req: Request, res: Response) => methodNotAllowed(res));

  await new Promise<void>((resolve) => {
    const httpServer = app.listen(config.port, () => {
      logger.info("listening on http", { port: config.port, endpoint: "/mcp" });
      resolve();
    });

    const shutdown = (signal: string) => {
      logger.info("shutting down", { signal });
      httpServer.close(() => endProcess(0));
    };
    process.once("SIGINT", () => shutdown("SIGINT"));
    process.once("SIGTERM", () => shutdown("SIGTERM"));
  });
}
