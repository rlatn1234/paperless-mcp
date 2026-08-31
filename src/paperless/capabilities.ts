import type { Logger } from "../runtime/logger.js";
import { PaperlessError } from "./errors.js";
import type { PaperlessHttp } from "./http.js";

/** Highest API version this server knows how to speak. */
export const MAX_SUPPORTED_API_VERSION = 10;

export interface Capabilities {
  /** paperless-ngx release string from `X-Version`, when the server sends one. */
  serverVersion: string | null;
  /** Highest API version the server advertises via `X-Api-Version`. */
  serverApiVersion: number | null;
  /** Version actually negotiated for subsequent requests. */
  apiVersion: number | null;
  features: Features;
}

export interface Features {
  /** `/documents/{id}/update_version/` and friends. */
  documentVersions: boolean;
  /** `all` / `filters` parameters on `/bulk_edit_objects/`. */
  bulkEditFilters: boolean;
}

function featuresFor(apiVersion: number | null): Features {
  const atLeast = (version: number) => apiVersion !== null && apiVersion >= version;
  return {
    // Document versioning landed with the v10 API surface; on older instances
    // these routes simply do not exist, so gate rather than 404 at call time.
    documentVersions: atLeast(10),
    bulkEditFilters: atLeast(10),
  };
}

/** Capabilities assumed when the server tells us nothing. */
export function defaultCapabilities(apiVersion: number | null = null): Capabilities {
  return {
    serverVersion: null,
    serverApiVersion: null,
    apiVersion,
    features: featuresFor(apiVersion),
  };
}

/**
 * Asks the instance what it is, then pins the API version for the session.
 *
 * paperless-ngx echoes `X-Api-Version` and `X-Version` on every API response,
 * so any cheap authenticated endpoint works as a probe. `/ui_settings/` is the
 * one the web UI itself calls first and it exists across all supported
 * releases.
 */
export async function probeCapabilities(
  http: PaperlessHttp,
  logger: Logger,
  pinnedApiVersion?: number | undefined,
): Promise<Capabilities> {
  if (pinnedApiVersion !== undefined) {
    http.setApiVersion(pinnedApiVersion);
    logger.info("api version pinned by configuration", { apiVersion: pinnedApiVersion });
    return {
      serverVersion: null,
      serverApiVersion: null,
      apiVersion: pinnedApiVersion,
      features: featuresFor(pinnedApiVersion),
    };
  }

  let response: Response;
  try {
    response = await http.raw("/ui_settings/", { method: "GET" });
  } catch (error) {
    // A rejected token will fail every subsequent call too — surface it now,
    // while the message can still name the configuration that caused it.
    if (
      error instanceof PaperlessError &&
      (error.code === "unauthorized" || error.code === "forbidden")
    ) {
      throw error;
    }
    logger.warn("capability probe failed; continuing with server defaults", {
      error: error instanceof Error ? error.message : String(error),
    });
    return defaultCapabilities();
  }

  const serverVersion = response.headers.get("x-version");
  const rawApiVersion = response.headers.get("x-api-version");
  // Release the connection; we only needed the headers.
  await response.arrayBuffer().catch(() => undefined);

  const parsed = rawApiVersion === null ? Number.NaN : Number(rawApiVersion);
  const serverApiVersion = Number.isInteger(parsed) ? parsed : null;

  if (serverApiVersion === null) {
    logger.warn("instance did not advertise X-Api-Version; using its default API version", {
      serverVersion,
    });
    return { serverVersion, serverApiVersion: null, apiVersion: null, features: featuresFor(null) };
  }

  const negotiated = Math.min(serverApiVersion, MAX_SUPPORTED_API_VERSION);
  http.setApiVersion(negotiated);

  logger.info("connected to paperless-ngx", {
    serverVersion,
    serverApiVersion,
    negotiatedApiVersion: negotiated,
  });

  return {
    serverVersion,
    serverApiVersion,
    apiVersion: negotiated,
    features: featuresFor(negotiated),
  };
}
