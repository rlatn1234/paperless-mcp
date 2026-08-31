import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { CallToolResult, ToolAnnotations } from "@modelcontextprotocol/sdk/types.js";
import type { ZodRawShape } from "zod";

import type { Toolset } from "../config/schema.js";
import type { Capabilities } from "../paperless/capabilities.js";
import { toPaperlessError } from "../paperless/errors.js";
import type { ToolContext } from "../runtime/context.js";
import { truncateText, type ToolOutput } from "./shared/responses.js";

export interface ToolDefinition<Shape extends ZodRawShape = ZodRawShape> {
  name: string;
  title: string;
  /** Written for the model: say when to reach for this, not just what it does. */
  description: string;
  toolset: Toolset;
  inputSchema: Shape;
  annotations?: ToolAnnotations;
  /** Requires `PAPERLESS_MODE=admin`. */
  requiresAdmin?: boolean;
  /** Hide the tool when the connected instance cannot support it. */
  available?: (caps: Capabilities) => boolean;
  /** Upstream tool names kept working after the rename. */
  aliases?: readonly string[];
  handler: (args: never, context: ToolContext) => Promise<ToolOutput>;
}

// The shape varies per tool; the registry only ever passes args straight
// through to the handler that declared them.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyToolDefinition = ToolDefinition<any>;

export function defineTool<Shape extends ZodRawShape>(
  definition: ToolDefinition<Shape>,
): AnyToolDefinition {
  return definition as AnyToolDefinition;
}

function isReadOnly(definition: AnyToolDefinition): boolean {
  return definition.annotations?.readOnlyHint === true;
}

export interface RegistrationSummary {
  registered: string[];
  skipped: Array<{ name: string; reason: string }>;
}

/** Decides which tools this session may see. */
export function selectTools(
  definitions: readonly AnyToolDefinition[],
  context: ToolContext,
): RegistrationSummary {
  const { config, caps } = context;
  const enabled = new Set(config.toolsets);
  const registered: string[] = [];
  const skipped: Array<{ name: string; reason: string }> = [];

  for (const definition of definitions) {
    if (!enabled.has(definition.toolset)) {
      skipped.push({ name: definition.name, reason: `toolset ${definition.toolset} not enabled` });
      continue;
    }
    if (config.mode === "readonly" && !isReadOnly(definition)) {
      skipped.push({ name: definition.name, reason: "read-only mode" });
      continue;
    }
    if (definition.requiresAdmin && config.mode !== "admin") {
      skipped.push({ name: definition.name, reason: "requires PAPERLESS_MODE=admin" });
      continue;
    }
    if (definition.available && !definition.available(caps)) {
      skipped.push({ name: definition.name, reason: "unsupported by this paperless-ngx version" });
      continue;
    }
    registered.push(definition.name);
  }

  return { registered, skipped };
}

function toCallToolResult(result: ToolOutput, context: ToolContext): CallToolResult {
  const text = truncateText(
    result.text,
    context.config.maxResponseChars,
    "Narrow the request (filters, page_size, fields) to see the rest.",
  );
  const payload: CallToolResult = {
    content: [{ type: "text", text }, ...(result.extraContent ?? [])],
  };
  if (context.config.structuredOutput && result.data !== undefined) {
    payload.structuredContent = { data: result.data };
  }
  return payload;
}

function toErrorResult(error: unknown, context: ToolContext, toolName: string): CallToolResult {
  const normalized = toPaperlessError(error);
  context.logger.warn("tool call failed", {
    tool: toolName,
    code: normalized.code,
    status: normalized.status,
    message: normalized.message,
  });
  // Reported in-band rather than as a protocol error, so the model can read the
  // hint and correct itself instead of the call simply vanishing.
  return { content: [{ type: "text", text: normalized.toToolText() }], isError: true };
}

export function registerTools(
  server: McpServer,
  definitions: readonly AnyToolDefinition[],
  context: ToolContext,
): RegistrationSummary {
  const summary = selectTools(definitions, context);
  const selected = new Set(summary.registered);

  for (const definition of definitions) {
    if (!selected.has(definition.name)) continue;

    const run = async (args: unknown): Promise<CallToolResult> => {
      try {
        const result = await definition.handler(args as never, context);
        return toCallToolResult(result, context);
      } catch (error) {
        return toErrorResult(error, context, definition.name);
      }
    };

    server.registerTool(
      definition.name,
      {
        title: definition.title,
        description: definition.description,
        inputSchema: definition.inputSchema,
        ...(definition.annotations ? { annotations: definition.annotations } : {}),
      },
      run,
    );

    if (context.config.legacyToolNames) {
      for (const alias of definition.aliases ?? []) {
        server.registerTool(
          alias,
          {
            title: `${definition.title} (deprecated name)`,
            // Kept short on purpose: aliases exist for compatibility and should
            // not spend the tool-listing budget twice.
            description: `Deprecated alias for ${definition.name}. Use ${definition.name} instead.`,
            inputSchema: definition.inputSchema,
            ...(definition.annotations ? { annotations: definition.annotations } : {}),
          },
          run,
        );
      }
    }
  }

  context.logger.info("tools registered", {
    count: summary.registered.length,
    toolsets: [...context.config.toolsets],
    mode: context.config.mode,
  });
  context.logger.debug("tools skipped", { skipped: summary.skipped });

  return summary;
}
