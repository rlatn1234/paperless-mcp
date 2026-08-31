# paperless-mcp

An MCP (Model Context Protocol) server for [paperless-ngx](https://docs.paperless-ngx.com/), aiming at **complete coverage of the paperless-ngx REST API**.

A fork of [nloui/paperless-mcp](https://github.com/nloui/paperless-mcp), rebuilt around a typed API client, a gated tool registry, and output shaped to fit in a context window.

> **Status: v0.1.0 — in progress.** Documents and the core taxonomy are done. Storage paths, custom fields, saved views, sharing, workflows, mail rules and administration are on the way.

---

## Install

```bash
npm install -g @rlatn1234/paperless-mcp
```

Get an API token from your paperless-ngx instance: click your username → **My Profile** → the circular arrow next to *API Auth Token*.

### Claude Desktop / Cline / any stdio MCP client

```json
{
  "mcpServers": {
    "paperless": {
      "command": "npx",
      "args": ["@rlatn1234/paperless-mcp", "https://paperless.example.com", "your-api-token"]
    }
  }
}
```

Credentials can come from the environment instead, which keeps the token out of the config file:

```json
{
  "mcpServers": {
    "paperless": {
      "command": "npx",
      "args": ["@rlatn1234/paperless-mcp"],
      "env": {
        "PAPERLESS_URL": "https://paperless.example.com",
        "PAPERLESS_API_KEY": "your-api-token"
      }
    }
  }
}
```

### HTTP

```bash
PAPERLESS_URL=https://paperless.example.com PAPERLESS_API_KEY=token \
  paperless-mcp --http --port 3000
```

Serves Streamable HTTP at `POST /mcp`, plus `GET /healthz`. Each request gets its own server instance, so concurrent calls stay isolated. The deprecated HTTP+SSE transport from the upstream project has been removed.

---

## Toolsets

paperless-ngx exposes well over a hundred API operations. Registering all of them would spend tens of thousands of tokens on tool definitions alone and make the model worse at picking the right one, so tools are grouped and opted into.

```bash
PAPERLESS_TOOLSETS=core,taxonomy,search,bulk    # default
PAPERLESS_TOOLSETS=full                         # everything available
```

| Toolset | Contents |
| --- | --- |
| `core` | documents: search, read, update, delete, upload, notes, metadata, suggestions, history, files |
| `taxonomy` | tags, correspondents, document types |
| `search` | global search, autocomplete, statistics *(planned)* |
| `bulk` | bulk document edits and bulk object operations |
| `versions` | document version management (requires API v10) |
| `views`, `sharing`, `workflows`, `mail`, `admin`, `ai` | *planned* |

---

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `PAPERLESS_URL` | — | Instance base URL. A trailing `/api` or `/` is tolerated. |
| `PAPERLESS_API_KEY` | — | API token (`API_KEY` and `PAPERLESS_TOKEN` also accepted). |
| `PAPERLESS_TOOLSETS` | `core,taxonomy,search,bulk` | Which tool groups to expose, or `full`. |
| `PAPERLESS_MODE` | `write` | `readonly` refuses to register any mutating tool; `admin` unlocks administration tools. |
| `PAPERLESS_DOWNLOAD_DIR` | system temp dir | Where downloaded files are written. |
| `PAPERLESS_MAX_DESTRUCTIVE` | `50` | Largest selection a destructive bulk call may touch. |
| `PAPERLESS_MAX_RESPONSE_CHARS` | `8000` | Hard ceiling on a single tool result. |
| `PAPERLESS_PAGE_SIZE` / `PAPERLESS_MAX_PAGE_SIZE` | `25` / `100` | List paging defaults. |
| `PAPERLESS_TIMEOUT_MS` | `30000` | Per-request timeout (uploads get 300 s). |
| `PAPERLESS_RETRIES` | `3` | Retries for 429 and 5xx on idempotent requests. |
| `PAPERLESS_API_VERSION` | probed | Pin the API version instead of negotiating it. |
| `PAPERLESS_LOG_LEVEL` | `info` | `debug` \| `info` \| `warn` \| `error` \| `silent`. Logs go to stderr. |
| `PAPERLESS_LEGACY_TOOL_NAMES` | `1` | Keep the upstream tool names working as aliases. |
| `PAPERLESS_STRUCTURED_OUTPUT` | `0` | Also emit `structuredContent`. Off by default because most clients feed it to the model alongside the text, doubling token cost. |

---

## Tools

### Documents (`core`)

| Tool | What it does |
| --- | --- |
| `document_search` | Full-text query and/or structured filters (tags, correspondent, type, dates, ASN, custom fields). Returns a compact table with names resolved, without OCR bodies. |
| `document_similar` | More-like-this against a known document — duplicates, prior invoices, the rest of a series. |
| `document_get` | Full detail for one document, including the OCR text. |
| `document_update` | Change title, date, correspondent, type, storage path, tags (whole-set or add/remove), ASN, owner. |
| `document_delete` | Move a document to the trash. Requires `confirm`. |
| `document_upload` | Upload a file for consumption, by path or base64. |
| `document_metadata` | Checksums, size, MIME type, archive version, embedded PDF metadata. |
| `document_suggestions` | What paperless's classifier would assign. |
| `document_history` | Audit trail of metadata changes. |
| `document_next_asn` | Next free archive serial number. |
| `document_notes_list` / `document_note_add` / `document_note_delete` | Notes on a document. |
| `document_download` | Write the file to disk and return the path (base64 optionally, for small files). |
| `document_thumbnail` / `document_preview` | Inline image, or a path for PDFs. |

### Taxonomy (`taxonomy`)

`tag_list`, `tag_create`, `tag_update`, `tag_delete`, `correspondent_list`, `correspondent_create`, `document_type_list`, `document_type_create`.

### Bulk (`bulk`)

`documents_bulk_edit` (every paperless bulk method, with `dry_run` to preview the selection first) and `objects_bulk_edit` (delete or set permissions on tags, correspondents, document types, storage paths).

### Versions (`versions`, API v10+)

`document_version_upload`, `document_version_label`, `document_version_delete`.

### Migrating from the upstream server

Every upstream tool name still works as an alias. The three per-type bulk tools have been merged:

| Upstream | Now |
| --- | --- |
| `search_documents`, `list_documents` | `document_search` |
| `get_document` | `document_get` |
| `post_document` | `document_upload` |
| `download_document` | `document_download` |
| `bulk_edit_documents` | `documents_bulk_edit` |
| `list_tags`, `create_tag`, `update_tag`, `delete_tag` | `tag_list`, `tag_create`, `tag_update`, `tag_delete` |
| `bulk_edit_tags`, `bulk_edit_correspondents`, `bulk_edit_document_types` | `objects_bulk_edit` |

Set `PAPERLESS_LEGACY_TOOL_NAMES=0` to drop the aliases.

---

## Safety

- **`readonly` mode** does not merely reject mutating calls — it never registers those tools, so they cannot be invoked.
- **Destructive tools require `confirm: true`**: deletions, page removal, and merges/splits that delete their originals.
- **`PAPERLESS_MAX_DESTRUCTIVE`** caps how many objects one destructive call may touch.
- **`dry_run`** on `documents_bulk_edit` reports what the selection contains and changes nothing.
- Tokens and passwords are redacted from logs, and logs never touch stdout.

---

## Compatibility

| paperless-ngx | API version | Support |
| --- | --- | --- |
| 3.x | 9, 10 | Full |
| 2.13 – 2.17 | 5 – 8 | Supported; version-gated tools are hidden |
| ≤ 2.12 | ≤ 4 | Best effort, untested |

The server reads `X-Api-Version` from the instance on startup and negotiates the highest version both sides understand.

---

## Development

```bash
npm install
npm run dev:paperless          # local paperless-ngx at http://localhost:8000 (admin/admin)
npm run dev -- http://localhost:8000 <token>
npm test
npm run typecheck
npm run inspect                # MCP Inspector
```

---

## Credits

Originally created by Nick Loui as [nloui/paperless-mcp](https://github.com/nloui/paperless-mcp). ISC licensed; see [LICENSE](LICENSE) and [NOTICE](NOTICE).
