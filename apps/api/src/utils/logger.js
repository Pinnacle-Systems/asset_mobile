import { createLogger } from "@repo/logger";
import { env } from "../config/env.js";

// Export a singleton logger instance for all services and endpoints to use
export const logger = createLogger({ service: "api", environment: env.NODE_ENV });
