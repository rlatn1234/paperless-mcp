import { vi } from "vitest";

export interface RecordedRequest {
  method: string;
  path: string;
  query: URLSearchParams;
  body: unknown;
  headers: Headers;
}

export type RouteHandler = (request: RecordedRequest) => {
  status?: number;
  json?: unknown;
  body?: string;
  headers?: Record<string, string>;
};

const DEFAULT_HEADERS = {
  "x-api-version": "10",
  "x-version": "3.1.1",
  "content-type": "application/json",
};

function paginated(results: unknown[]): unknown {
  return { count: results.length, next: null, previous: null, results };
}

export const FIXTURES = {
  tags: [
    { id: 1, name: "Invoice", color: "#a6cee3", document_count: 12, is_inbox_tag: false },
    { id: 2, name: "Paid", color: "#b2df8a", document_count: 5, is_inbox_tag: false },
  ],
  correspondents: [
    { id: 10, name: "ACME Ltd", document_count: 7, last_correspondence: "2026-05-02T00:00:00Z" },
  ],
  documentTypes: [{ id: 20, name: "Invoice", document_count: 9 }],
  storagePaths: [{ id: 30, name: "Archive", path: "archive/{created_year}", document_count: 3 }],
  customFields: [
    { id: 40, name: "Invoice total", data_type: "monetary", document_count: 4, extra_data: null },
    {
      id: 41,
      name: "Status",
      data_type: "select",
      document_count: 2,
      extra_data: { select_options: [{ label: "Paid" }, { label: "Unpaid" }] },
    },
  ],
  tasks: [
    {
      id: 900,
      task_id: "abc-123",
      task_type: "consume_file",
      task_type_display: "Consume file",
      status: "SUCCESS",
      status_display: "Success",
      date_created: "2026-04-02T10:00:00Z",
      date_done: "2026-04-02T10:00:12Z",
      duration_seconds: 12.4,
      related_document_ids: [100],
      acknowledged: false,
      result_data: null,
    },
  ],
  users: [
    {
      id: 1,
      username: "tester",
      password: "pbkdf2$should-never-be-rendered",
      email: "tester@example.com",
      first_name: "Test",
      last_name: "User",
      is_active: true,
      is_superuser: true,
      groups: [],
    },
  ],
  savedViews: [
    {
      id: 50,
      name: "Unpaid invoices",
      sort_field: "created",
      sort_reverse: true,
      filter_rules: [{ rule_type: 6, value: "1" }],
    },
  ],
  documents: [
    {
      id: 100,
      title: "ACME invoice 2026-04",
      created: "2026-04-01T00:00:00Z",
      added: "2026-04-02T00:00:00Z",
      correspondent: 10,
      document_type: 20,
      storage_path: null,
      tags: [1, 2],
      archive_serial_number: 41,
      owner: null,
      original_file_name: "acme-invoice.pdf",
      content: "Invoice total 412.00 EUR, due 2026-05-01.",
    },
  ],
};

/**
 * Minimal in-process stand-in for a paperless-ngx instance.
 *
 * Contract tests run against recorded response shapes rather than a live
 * server, so the suite stays fast and hermetic; the docker-compose instance
 * covers the real thing in end-to-end runs.
 */
export function installFakePaperless(overrides: Record<string, RouteHandler> = {}): {
  requests: RecordedRequest[];
  restore: () => void;
} {
  const requests: RecordedRequest[] = [];

  const routes: Record<string, RouteHandler> = {
    "GET /api/ui_settings/": () => ({
      json: { user: { id: 1, username: "tester" }, settings: {} },
    }),
    "GET /api/tags/": () => ({ json: paginated(FIXTURES.tags) }),
    "GET /api/correspondents/": () => ({ json: paginated(FIXTURES.correspondents) }),
    "GET /api/document_types/": () => ({ json: paginated(FIXTURES.documentTypes) }),
    "GET /api/storage_paths/": () => ({ json: paginated(FIXTURES.storagePaths) }),
    "GET /api/documents/": () => ({ json: paginated(FIXTURES.documents) }),
    "GET /api/documents/100/": () => ({ json: FIXTURES.documents[0] }),
    "GET /api/tags/1/": () => ({ json: FIXTURES.tags[0] }),
    "GET /api/storage_paths/30/": () => ({ json: FIXTURES.storagePaths[0] }),
    "POST /api/storage_paths/test/": () => ({ json: "archive/2026/acme-invoice.pdf" }),
    "GET /api/custom_fields/": () => ({ json: paginated(FIXTURES.customFields) }),
    "GET /api/custom_fields/40/": () => ({ json: FIXTURES.customFields[0] }),
    "GET /api/saved_views/": () => ({ json: paginated(FIXTURES.savedViews) }),
    "GET /api/saved_views/50/": () => ({ json: FIXTURES.savedViews[0] }),
    "GET /api/ui_settings/2/": () => ({ json: {} }),
    "GET /api/tasks/": () => ({ json: paginated(FIXTURES.tasks) }),
    "GET /api/tasks/900/": () => ({ json: FIXTURES.tasks[0] }),
    "GET /api/tasks/status_counts/": () => ({
      json: { all: 1, completed: 1, in_progress: 0, needs_attention: 0 },
    }),
    "POST /api/tasks/acknowledge/": () => ({ json: { result: 1 } }),
    "GET /api/trash/": () => ({
      json: paginated([{ ...FIXTURES.documents[0], deleted_at: "2026-04-10T09:00:00Z" }]),
    }),
    "POST /api/trash/": () => ({ json: { result: "OK" } }),
    "GET /api/users/": () => ({ json: paginated(FIXTURES.users) }),
    "GET /api/groups/": () => ({ json: paginated([]) }),
    "GET /api/statistics/": () => ({
      json: {
        documents_total: 74,
        documents_inbox: 3,
        inbox_tag: 1,
        document_file_type_counts: [{ mime_type: "application/pdf", mime_type_count: 74 }],
        character_count: 123456,
        tag_count: 2,
        correspondent_count: 1,
        document_type_count: 1,
        storage_path_count: 1,
        current_asn: 42,
      },
    }),
    "GET /api/search/": () => ({
      json: {
        total: 2,
        documents: [{ id: 100, title: "ACME invoice 2026-04" }],
        tags: [{ id: 1, name: "Invoice" }],
        saved_views: [],
        correspondents: [],
        document_types: [],
        storage_paths: [],
        users: [],
        groups: [],
        mail_rules: [],
        mail_accounts: [],
        workflows: [],
        custom_fields: [],
      },
    }),
    "GET /api/search/autocomplete/": () => ({ json: ["invoice", "invoices"] }),
    ...overrides,
  };

  const fetchMock = vi.fn(async (input: string | URL | Request, init?: RequestInit) => {
    const url = new URL(typeof input === "string" ? input : input.toString());
    const method = (init?.method ?? "GET").toUpperCase();
    const key = `${method} ${url.pathname}`;

    const record: RecordedRequest = {
      method,
      path: url.pathname,
      query: url.searchParams,
      body: typeof init?.body === "string" ? JSON.parse(init.body) : init?.body,
      headers: new Headers(init?.headers),
    };
    requests.push(record);

    const handler = routes[key];
    if (!handler) {
      return new Response(JSON.stringify({ detail: `No route for ${key}` }), {
        status: 404,
        headers: DEFAULT_HEADERS,
      });
    }

    const result = handler(record);
    const body = result.json !== undefined ? JSON.stringify(result.json) : (result.body ?? "");
    return new Response(body, {
      status: result.status ?? 200,
      headers: { ...DEFAULT_HEADERS, ...result.headers },
    });
  });

  vi.stubGlobal("fetch", fetchMock);
  return { requests, restore: () => vi.unstubAllGlobals() };
}
