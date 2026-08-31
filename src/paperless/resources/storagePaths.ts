import type { PaperlessHttp } from "../http.js";
import type { StoragePath } from "../types.js";
import { CrudResource } from "./crud.js";

export class StoragePathsResource extends CrudResource<StoragePath> {
  constructor(http: PaperlessHttp) {
    super(http, "/storage_paths/");
  }

  /**
   * Renders a path template against a real document.
   *
   * Returns the filename paperless would produce, without storing anything —
   * the only safe way to check a template before it starts moving files.
   */
  test(path: string, document: number): Promise<string> {
    return this.http.json<string>("/storage_paths/test/", {
      method: "POST",
      json: { path, document },
    });
  }
}
