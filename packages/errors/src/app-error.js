/**
 * Base class for application-specific errors.
 *
 * @class AppError
 */
export class AppError extends Error {
  /**
   * Create an application error.
   *
   * @param {Object} options
   * @param {string} options.code - Stable machine-readable error code.
   * @param {string} options.message - Human-readable error message.
   * @param {number} [options.statusCode=500] - HTTP status code for API responses.
   * @param {unknown} [options.details] - Optional structured details for diagnostics.
   */
  constructor({ code, message, statusCode = 500, details } = {}) {
    super(message || "An unexpected error occurred");
    this.name = "AppError";
    this.code = code || "APP_ERROR";
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = true;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
