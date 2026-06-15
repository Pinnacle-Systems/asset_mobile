/**
 * Build a standard success envelope for API responses.
 * @param {unknown} data - The response payload.
 * @param {Record<string, unknown>|undefined} [meta] - Optional metadata for the response.
 * @returns {{success: boolean, data: unknown, meta?: Record<string, unknown>}}
 */
export function createSuccessResponse(data, meta) {
  const payload = {
    success: true,
    data,
  };

  if (meta !== undefined) {
    payload.meta = meta;
  }

  return payload;
}

/**
 * Build a standard error envelope for API responses.
 * @param {{code?: string, message?: string, details?: unknown, requestId?: string}|undefined} [error] - Error details.
 * @returns {{success: boolean, error: {code: string, message: string, details?: unknown, requestId?: string}}}
 */
export function createErrorResponse(error = {}) {
  const code =
    typeof error?.code === "string" && error.code.trim() !== ""
      ? error.code
      : "INTERNAL_SERVER_ERROR";
  const message =
    typeof error?.message === "string" && error.message.trim() !== ""
      ? error.message
      : "Something went wrong";

  const payload = {
    success: false,
    error: {
      code,
      message,
    },
  };

  if (error?.details !== undefined && error.details !== null) {
    payload.error.details = error.details;
  }

  if (typeof error?.requestId === "string" && error.requestId.trim() !== "") {
    payload.error.requestId = error.requestId;
  }

  return payload;
}
