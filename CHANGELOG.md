# Changelog

## 0.2.0

Completes the taxonomy: every object a document can point at is now fully
manageable, which is what makes `document_update` and `documents_bulk_edit`
usable in practice.

### Added

- **Storage paths** — `storage_path_list`, `_create`, `_update`, `_delete`, and
  `storage_path_test`, which renders a path template against a real document and
  returns the filename it would produce without storing anything.
- **Custom fields** — `custom_field_list`, `_create`, `_update`, `_delete`,
  covering all ten paperless data types. `custom_field_query` was already wired
  into `document_search`, so field values are now both filterable and editable.
- **Saved views and UI settings** (`views` toolset) — `saved_view_list` (with an
  `id` for the full filter rules), `_create`, `_update`, `_delete`,
  `ui_settings_get`, `ui_settings_update`. Updating settings merges into the
  current value; the raw endpoint replaces the whole object.
- `correspondent_update`, `correspondent_delete`, `document_type_update`,
  `document_type_delete`.
- Every `*_list` tool accepts an `id` to fetch one object in detail, so
  `GET /{id}/` is covered without a second tool definition per resource.
- `npm run gen:openapi` generates types from a live instance's `/api/schema/`,
  and `src/paperless/conformance.ts` asserts at compile time that the paths this
  client calls and the fields it reads still exist. API drift is now a
  typecheck failure that names the field.
- `npm run smoke` — an end-to-end read-only check against a real instance.
- biome for lint and formatting; a test that measures the `tools/list` payload.

### Changed

- **`PAPERLESS_LEGACY_TOOL_NAMES` now defaults to off.** The budget test showed
  the default profile costing 14.7k tokens with roughly half of that being
  aliases: an alias repeats the whole input schema, and the schema is the
  expensive part. Turning them off took the default profile from 43 tools /
  14.7k tokens to 26 / 7.8k. Set `PAPERLESS_LEGACY_TOOL_NAMES=1` while
  migrating from the upstream server.
- Default profile is now 39 tools / ~11.4k tokens; `full` is 48 / ~13.4k.

### Fixed

- Startup failures exited via a libuv assertion on Windows
  (`!(handle->flags & UV_HANDLE_CLOSING)`, exit code 127) rather than exiting
  cleanly: `process.exit()` ran from the rejection handler while fetch still had
  sockets closing, so a client saw a crash instead of the reason. Exits now let
  the event loop drain.

## 0.1.0

First release of the fork. Rebuilt the server around a layered architecture and
took the document domain to completion.

- Fixed two defects inherited from upstream: tool handlers returned raw API
  objects instead of a `CallToolResult`, which the MCP SDK parses into an empty
  `content` array (so tool output never reached the model); and the stateless
  HTTP path shared one `McpServer` across transports, so concurrent requests
  could answer on each other's connection.
- Documents: search with structured filters, read, update, delete, upload,
  notes, metadata, suggestions, history, versions, and file access that writes
  to disk instead of pushing base64 through the conversation.
- Tool registry with toolset, read-only, admin and API-version gating.
- Search asks paperless for `?fields=` and `?truncate_content=` instead of
  discarding OCR bodies client-side, and resolves ids to names for display.
- Destructive tools require `confirm=true`; `documents_bulk_edit` supports
  `dry_run`.
- ESM, Node >= 20.11, strict TypeScript, tsup, vitest, CI.
