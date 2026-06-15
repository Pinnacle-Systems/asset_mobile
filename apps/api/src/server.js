import { createLogger } from "@repo/logger";

import createApp from "./app.js";
import { env } from "./config/env.js";

const logger = createLogger({ service: "api", environment: env.NODE_ENV });

const app = createApp();
const server = app.listen(env.PORT, () => {
  logger.info("API server started", {
    port: env.PORT,
    environment: env.NODE_ENV,
  });
});

server.on("error", (error) => {
  logger.error("API server failed to start", {
    error,
    port: env.PORT,
  });
});

process.on("SIGTERM", () => {
  server.close(() => {
    logger.info("API server stopped");
    process.exit(0);
  });
});

export default server;
