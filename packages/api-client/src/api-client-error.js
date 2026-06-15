/**
 * Error raised when the API client encounters a request, timeout, or server-side failure.
 */
export class ApiClientError extends Error {
  constructor({ code, message, statusCode, details, cause } = {}) {
    super(message || "API request failed");
    this.name = "ApiClientError";
    this.code = code || "HTTP_ERROR";
    this.statusCode = statusCode;
    this.details = details;
    this.cause = cause;
  }
}
