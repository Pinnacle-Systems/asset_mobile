import { createErrorResponse } from "@repo/contracts";
import { isAppError } from "@repo/errors";
import { createLogger } from "@repo/logger";

import { isProduction } from "../config/env.js";

const logger = createLogger({ service: "api", environment: process.env.NODE_ENV || "development" });

export default function errorMiddleware(err, req, res, next) {
  void next;

  if (isAppError(err)) {
    logger.warn("API request failed", {
      requestId: req.requestId,
      method: req.method,
      path: req.path,
      statusCode: err.statusCode,
      errorCode: err.code,
      errorMessage: err.message,
    });

    const payload = createErrorResponse({
      code: err.code,
      message: err.message,
      ...(err.details ? { details: err.details } : {}),
      ...(req.requestId ? { requestId: req.requestId } : {}),
    });

    return res.status(err.statusCode).json(payload);
  }

  logger.error("Unhandled API error", {
    requestId: req.requestId,
    method: req.method,
    path: req.path,
    statusCode: 500,
    errorCode: "INTERNAL_SERVER_ERROR",
    errorMessage: "Something went wrong",
    error: err,
  });

  const payload = createErrorResponse({
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong",
    ...(req.requestId ? { requestId: req.requestId } : {}),
  });

  if (!isProduction && err?.stack) {
    payload.error.stack = err.stack;
  }

  return res.status(500).json(payload);
}
