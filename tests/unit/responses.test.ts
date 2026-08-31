import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { redact } from "../../src/runtime/logger.js";
import {
  formatBytes,
  renderPageFooter,
  renderTable,
  truncateText,
} from "../../src/tools/shared/responses.js";
import { normalizeMatchingAlgorithm } from "../../src/tools/shared/schemas.js";
import { SERVER_VERSION } from "../../src/version.js";

describe("renderTable", () => {
  it("renders a markdown table", () => {
    const table = renderTable(["id", "name"], [[1, "Invoice"]]);
    expect(table.split("\n")).toEqual(["| id | name |", "| --- | --- |", "| 1 | Invoice |"]);
  });

  it("escapes pipes and newlines so the table stays parseable", () => {
    expect(renderTable(["v"], [["a|b\nc"]])).toContain("a\\|b c");
  });

  it("says so when there is nothing to show", () => {
    expect(renderTable(["id"], [], "No documents matched.")).toBe("No documents matched.");
  });
});

describe("truncateText", () => {
  it("leaves short text alone", () => {
    expect(truncateText("short", 100)).toBe("short");
  });

  it("marks how much was cut and how to get the rest", () => {
    const truncated = truncateText("x".repeat(50), 10, "Narrow the request.");
    expect(truncated).toContain("truncated 40 of 50 characters");
    expect(truncated).toContain("Narrow the request.");
  });
});

describe("renderPageFooter", () => {
  it("summarises a single page without paging noise", () => {
    const footer = renderPageFooter(
      { page: 1, pageSize: 25, count: 3, totalPages: 1, hasNext: false },
      "document_search",
    );
    expect(footer).toBe("3 results.");
  });

  it("tells the model how to fetch the next page", () => {
    const footer = renderPageFooter(
      { page: 2, pageSize: 25, count: 120, totalPages: 5, hasNext: true },
      "document_search",
    );
    expect(footer).toContain("Showing 26–50 of 120");
    expect(footer).toContain("page=3");
  });
});

describe("formatBytes", () => {
  it("scales to a readable unit", () => {
    expect(formatBytes(512)).toBe("512 B");
    expect(formatBytes(2048)).toBe("2.0 KB");
    expect(formatBytes(5 * 1024 * 1024)).toBe("5.0 MB");
  });
});

describe("normalizeMatchingAlgorithm", () => {
  it("accepts the names the docs use", () => {
    expect(normalizeMatchingAlgorithm("any")).toBe(0);
    expect(normalizeMatchingAlgorithm("regex")).toBe(3);
  });

  it("passes numbers through, as the upstream tools took them", () => {
    expect(normalizeMatchingAlgorithm(4)).toBe(4);
  });

  it("leaves an unset value unset", () => {
    expect(normalizeMatchingAlgorithm(undefined)).toBeUndefined();
  });
});

describe("redact", () => {
  it("removes credentials from log fields", () => {
    const redacted = redact({
      url: "http://p.test",
      headers: { Authorization: "Token abc", accept: "application/json" },
      nested: { password: "hunter2" },
    }) as Record<string, Record<string, string>>;

    expect(redacted["headers"]?.["Authorization"]).toBe("[redacted]");
    expect(redacted["headers"]?.["accept"]).toBe("application/json");
    expect(redacted["nested"]?.["password"]).toBe("[redacted]");
  });
});

describe("version", () => {
  it("matches package.json", () => {
    const pkg = JSON.parse(readFileSync(new URL("../../package.json", import.meta.url), "utf8")) as {
      version: string;
    };
    expect(SERVER_VERSION).toBe(pkg.version);
  });
});
