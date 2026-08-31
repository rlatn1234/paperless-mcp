import type { PaperlessHttp } from "../http.js";
import type { SavedView, UiSettings } from "../types.js";
import { CrudResource } from "./crud.js";

export class SavedViewsResource extends CrudResource<SavedView> {
  constructor(http: PaperlessHttp) {
    super(http, "/saved_views/");
  }
}

export class UiSettingsResource {
  constructor(private readonly http: PaperlessHttp) {}

  get(): Promise<UiSettings> {
    return this.http.json<UiSettings>("/ui_settings/");
  }

  /**
   * paperless replaces the whole settings blob, so callers must merge into the
   * current value rather than sending a partial one.
   */
  update(settings: Record<string, unknown>): Promise<UiSettings> {
    return this.http.json<UiSettings>("/ui_settings/", {
      method: "POST",
      json: { settings },
    });
  }
}
