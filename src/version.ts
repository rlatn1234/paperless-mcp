/**
 * Advertised to MCP clients during initialization.
 *
 * Kept in sync with package.json by a unit test rather than a JSON import, so
 * the bundle stays free of build-time module-resolution quirks.
 */
export const SERVER_NAME = "paperless-ngx";
export const SERVER_VERSION = "0.3.0";
