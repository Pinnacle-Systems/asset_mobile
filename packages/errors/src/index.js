import { AppError } from "./app-error.js";

export { AppError } from "./app-error.js";
export {
  AuthError,
  ConflictError,
  ExternalServiceError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} from "./http-errors.js";

/**
 * Determine whether an error is an application-specific AppError.
 *
 * @param {unknown} error - The error value to inspect.
 * @returns {boolean} True when the value is an AppError instance.
 */
export function isAppError(error) {
  return error instanceof AppError;
}
