/**
 * Regenerates `src/paperless/generated/openapi.d.ts` from a live instance.
 *
 * paperless-ngx serves a drf-spectacular schema at `/api/schema/`. Generating
 * types from it is what makes API drift a compile error instead of a runtime
 * surprise: `src/paperless/conformance.ts` asserts the paths this client calls
 * and the fields it reads against the generated types.
 *
 *   PAPERLESS_URL=https://paperless.example.com \
 *   PAPERLESS_API_KEY=... \
 *   npm run gen:openapi
 *
 * Re-run it after upgrading paperless-ngx, then run `npm run typecheck`.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import openapiTS, { astToString } from "openapi-typescript";

const baseUrl = process.env["PAPERLESS_URL"];
const token = process.env["PAPERLESS_API_KEY"] ?? process.env["API_KEY"];

if (!baseUrl || !token) {
  console.error("Set PAPERLESS_URL and PAPERLESS_API_KEY before regenerating the schema.");
  process.exitCode = 1;
} else {
  await main(baseUrl.replace(/\/+$/, ""), token);
}

async function main(url: string, apiKey: string): Promise<void> {
  const target = fileURLToPath(new URL("../src/paperless/generated/openapi.d.ts", import.meta.url));

  const response = await fetch(`${url}/api/schema/?format=json`, {
    headers: { Authorization: `Token ${apiKey}`, Accept: "application/json" },
  });
  if (!response.ok) {
    console.error(`Could not fetch the schema: HTTP ${response.status}`);
    process.exitCode = 1;
    return;
  }

  const schema = (await response.json()) as Record<string, unknown>;
  const info = schema["info"] as { version?: string } | undefined;

  const ast = await openapiTS(schema as never, { alphabetize: true });
  const banner = [
    "/**",
    " * GENERATED FILE — do not edit.",
    " *",
    " * Produced by `npm run gen:openapi` from a paperless-ngx instance's",
    " * /api/schema/ endpoint. See scripts/gen-openapi.ts.",
    ` * Schema version: ${info?.version ?? "unknown"}`,
    " */",
    "",
  ].join("\n");

  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `${banner}${astToString(ast)}`);

  const paths = Object.keys((schema["paths"] as Record<string, unknown>) ?? {}).length;
  console.log(`wrote ${target}\n${paths} paths, schema version ${info?.version ?? "unknown"}`);
}
