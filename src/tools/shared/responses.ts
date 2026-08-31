import type { ContentBlock } from "@modelcontextprotocol/sdk/types.js";

/**
 * What a tool handler returns.
 *
 * Handlers never build a `CallToolResult` themselves — the registry does that,
 * so truncation, structured-output policy and error handling are applied in
 * exactly one place. The upstream server returned bare API objects here, which
 * the MCP SDK parses into an empty `content` array on the client, meaning tool
 * output never reached the model at all.
 */
export interface ToolOutput {
  /** Compact rendering shown to the model. */
  text: string;
  /** Machine-readable payload, attached as `structuredContent` when enabled. */
  data?: unknown;
  /** Images, resource links and other non-text blocks. */
  extraContent?: ContentBlock[];
}

export function output(text: string, data?: unknown, extraContent?: ContentBlock[]): ToolOutput {
  const result: ToolOutput = { text };
  if (data !== undefined) result.data = data;
  if (extraContent !== undefined) result.extraContent = extraContent;
  return result;
}

export function truncateText(text: string, maxChars: number, hint?: string): string {
  if (text.length <= maxChars) return text;
  const kept = text.slice(0, maxChars);
  const suffix = hint ? ` ${hint}` : "";
  return `${kept}\n… [truncated ${text.length - maxChars} of ${text.length} characters].${suffix}`;
}

/** Renders a markdown pipe table. Empty rows collapse to a short notice. */
export function renderTable(
  headers: readonly string[],
  rows: ReadonlyArray<ReadonlyArray<string | number | null | undefined>>,
  emptyNotice = "No results.",
): string {
  if (rows.length === 0) return emptyNotice;
  const cell = (value: string | number | null | undefined): string => {
    if (value === null || value === undefined) return "";
    return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
  };
  const lines = [
    `| ${headers.join(" | ")} |`,
    `| ${headers.map(() => "---").join(" | ")} |`,
    ...rows.map((row) => `| ${row.map(cell).join(" | ")} |`),
  ];
  return lines.join("\n");
}

/** Renders an object as `key: value` lines, skipping empties. */
export function renderFields(fields: Record<string, unknown>): string {
  const lines: string[] = [];
  for (const [key, value] of Object.entries(fields)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    lines.push(`${key}: ${Array.isArray(value) ? value.join(", ") : String(value)}`);
  }
  return lines.join("\n");
}

export interface PageSummary {
  page: number;
  pageSize: number;
  count: number;
  totalPages: number;
  hasNext: boolean;
}

/** One-line footer telling the model how much it is looking at, and how to get more. */
export function renderPageFooter(summary: PageSummary, toolName: string): string {
  if (summary.count <= summary.pageSize && summary.page === 1) {
    return `${summary.count} result${summary.count === 1 ? "" : "s"}.`;
  }
  const from = (summary.page - 1) * summary.pageSize + 1;
  const to = Math.min(summary.page * summary.pageSize, summary.count);
  const more = summary.hasNext
    ? ` Call ${toolName} with page=${summary.page + 1} for more.`
    : "";
  return `Showing ${from}–${to} of ${summary.count} (page ${summary.page}/${summary.totalPages}).${more}`;
}

/** Human-friendly byte size for download/metadata output. */
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return String(bytes);
  const units = ["B", "KB", "MB", "GB"];
  let value = bytes;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value >= 10 || unit === 0 ? Math.round(value) : value.toFixed(1)} ${units[unit]}`;
}

export function imageBlock(base64Data: string, mimeType: string): ContentBlock {
  return { type: "image", data: base64Data, mimeType };
}

export function resourceLinkBlock(uri: string, name: string, mimeType?: string): ContentBlock {
  return mimeType
    ? { type: "resource_link", uri, name, mimeType }
    : { type: "resource_link", uri, name };
}
