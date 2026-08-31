import { ConfigError, resolveConfig, USAGE } from "./config/schema.js";
import { PaperlessError } from "./paperless/errors.js";
import { startHttp } from "./runtime/http.js";
import { createLogger } from "./runtime/logger.js";
import { endProcess } from "./runtime/shutdown.js";
import { startStdio } from "./runtime/stdio.js";
import { SERVER_VERSION } from "./version.js";

async function main(): Promise<void> {
  const argv = process.argv.slice(2);

  if (argv.includes("--help") || argv.includes("-h")) {
    process.stdout.write(`${USAGE}\n`);
    return;
  }
  if (argv.includes("--version")) {
    process.stdout.write(`${SERVER_VERSION}\n`);
    return;
  }

  const config = resolveConfig(argv, process.env);
  const logger = createLogger(config.logLevel, { name: "paperless-mcp" });

  logger.debug("configuration resolved", {
    baseUrl: config.baseUrl,
    transport: config.transport,
    toolsets: [...config.toolsets],
    mode: config.mode,
  });

  if (config.transport === "http") {
    await startHttp(config, logger);
  } else {
    await startStdio(config, logger);
  }
}

main().catch((error: unknown) => {
  // Startup failures go to stderr and exit non-zero: on stdio, anything written
  // to stdout would be parsed as JSON-RPC by the client.
  if (error instanceof ConfigError) {
    process.stderr.write(`${error.message}\n`);
  } else if (error instanceof PaperlessError) {
    process.stderr.write(`${error.toToolText()}\n`);
  } else {
    process.stderr.write(
      `${error instanceof Error ? (error.stack ?? error.message) : String(error)}\n`,
    );
  }
  endProcess(1);
});
