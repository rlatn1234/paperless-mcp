import type { Logger } from "../runtime/logger.js";
import type { ResolvedConfig } from "../config/schema.js";
import { PaperlessHttp } from "./http.js";
import { BulkResource } from "./resources/bulk.js";
import { CrudResource } from "./resources/crud.js";
import { DocumentsResource } from "./resources/documents.js";
import type { Correspondent, CustomField, DocumentType, StoragePath, Tag } from "./types.js";

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
  readonly storagePaths: CrudResource<StoragePath>;
  readonly customFields: CrudResource<CustomField>;
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
    this.storagePaths = new CrudResource<StoragePath>(this.http, "/storage_paths/");
    this.customFields = new CrudResource<CustomField>(this.http, "/custom_fields/");
    this.bulk = new BulkResource(this.http);
  }
}
