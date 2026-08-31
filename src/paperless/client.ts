import type { ResolvedConfig } from "../config/schema.js";
import type { Logger } from "../runtime/logger.js";
import { PaperlessHttp } from "./http.js";
import { BulkResource } from "./resources/bulk.js";
import { CrudResource } from "./resources/crud.js";
import { DocumentsResource } from "./resources/documents.js";
import { StoragePathsResource } from "./resources/storagePaths.js";
import { SavedViewsResource, UiSettingsResource } from "./resources/views.js";
import type { Correspondent, CustomField, DocumentType, Tag } from "./types.js";

/**
 * Aggregate of every resource client, plus the shared transport.
 *
 * One instance per MCP session: it holds the credentials for that session, so
 * it must never be shared across tenants in HTTP mode.
 */
export class PaperlessClient {
  readonly http: PaperlessHttp;
  readonly documents: DocumentsResource;
  readonly tags: CrudResource<Tag>;
  readonly correspondents: CrudResource<Correspondent>;
  readonly documentTypes: CrudResource<DocumentType>;
  readonly storagePaths: StoragePathsResource;
  readonly customFields: CrudResource<CustomField>;
  readonly savedViews: SavedViewsResource;
  readonly uiSettings: UiSettingsResource;
  readonly bulk: BulkResource;

  constructor(config: ResolvedConfig, logger: Logger) {
    this.http = new PaperlessHttp({
      baseUrl: config.baseUrl,
      token: config.token,
      logger,
      retries: config.retries,
      timeoutMs: config.requestTimeoutMs,
      uploadTimeoutMs: config.uploadTimeoutMs,
      apiVersion: config.apiVersion,
    });

    this.documents = new DocumentsResource(this.http);
    this.tags = new CrudResource<Tag>(this.http, "/tags/");
    this.correspondents = new CrudResource<Correspondent>(this.http, "/correspondents/");
    this.documentTypes = new CrudResource<DocumentType>(this.http, "/document_types/");
    this.storagePaths = new StoragePathsResource(this.http);
    this.customFields = new CrudResource<CustomField>(this.http, "/custom_fields/");
    this.savedViews = new SavedViewsResource(this.http);
    this.uiSettings = new UiSettingsResource(this.http);
    this.bulk = new BulkResource(this.http);
  }
}
