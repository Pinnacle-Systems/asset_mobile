import { AppError } from "./app-error.js";

/**
 * Error for input validation failures.
 */
export class ValidationError extends AppError {
  constructor({ message = "Validation failed", details } = {}) {
    super({ code: "VALIDATION_ERROR", message, statusCode: 400, details });
    this.name = "ValidationError";
  }
}

/**
 * Error for failed authentication or missing credentials.
 */
export class AuthError extends AppError {
  constructor({ message = "Authentication failed", details } = {}) {
    super({ code: "AUTH_ERROR", message, statusCode: 401, details });
    this.name = "AuthError";
  }
}

/**
 * Error for requests that are not permitted.
 */
export class ForbiddenError extends AppError {
  constructor({ message = "Forbidden", details } = {}) {
    super({ code: "FORBIDDEN", message, statusCode: 403, details });
    this.name = "ForbiddenError";
  }
}

/**
 * Error for missing resources.
 */
export class NotFoundError extends AppError {
  constructor({ message = "Resource not found", details } = {}) {
    super({ code: "NOT_FOUND", message, statusCode: 404, details });
    this.name = "NotFoundError";
  }
}

/**
 * Error for conflicting state or duplicate resources.
 */
export class ConflictError extends AppError {
  constructor({ message = "Conflict", details } = {}) {
    super({ code: "CONFLICT", message, statusCode: 409, details });
    this.name = "ConflictError";
  }
}

/**
 * Error for downstream third-party dependency failures.
 */
export class ExternalServiceError extends AppError {
  constructor({ message = "External service failed", details } = {}) {
    super({ code: "EXTERNAL_SERVICE_ERROR", message, statusCode: 502, details });
    this.name = "ExternalServiceError";
  }
}
