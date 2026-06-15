import { sanitizeMetadata } from "./sanitize.js";

/**
 * Create a logger instance for a service.
 *
 * @param {Object} options
 * @param {string} [options.service="app"] - Service name to attach to logs.
 * @param {string} [options.environment="development"] - Runtime environment.
 * @param {Object} [options.defaultMeta={}] - Default metadata for every log entry.
 * @returns {{debug: Function, info: Function, warn: Function, error: Function}} Logger methods.
 */
export function createLogger({ service = "app", environment = "development", defaultMeta = {} } = {}) {
  const isProduction = environment === "production";

  function formatMessage(level, message, meta = {}) {
    const safeMeta = sanitizeMetadata({ ...defaultMeta, ...meta });
    const timestamp = new Date().toISOString();

    const baseEntry = {
      level,
      service,
      message,
      timestamp,
      environment,
    };

    if (Object.keys(safeMeta).length > 0) {
      baseEntry.metadata = safeMeta;
    }

    return baseEntry;
  }

  function log(level, message, meta) {
    const entry = formatMessage(level, message, meta);

    if (isProduction) {
      console.log(JSON.stringify(entry));
      return;
    }

    const metadata = entry.metadata ? ` ${JSON.stringify(entry.metadata)}` : "";
    console.log(`[${entry.timestamp}] ${entry.level.toUpperCase()} ${entry.service} ${entry.message}${metadata}`);
  }

  return {
    debug(message, meta) {
      log("debug", message, meta);
    },
    info(message, meta) {
      log("info", message, meta);
    },
    warn(message, meta) {
      log("warn", message, meta);
    },
    error(message, meta) {
      log("error", message, meta);
    },
  };
}
