import { describe, expect, it } from "vitest";

import {
  AppError,
  AuthError,
  ConflictError,
  ExternalServiceError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
  isAppError,
} from "../src/index.js";

describe("AppError", () => {
  it("stores code, message, statusCode, and details", () => {
    const error = new AppError({
      code: "CUSTOM_ERROR",
      message: "Something went wrong",
      statusCode: 418,
      details: { reason: "demo" },
    });

    expect(error.name).toBe("AppError");
    expect(error.code).toBe("CUSTOM_ERROR");
    expect(error.message).toBe("Something went wrong");
    expect(error.statusCode).toBe(418);
    expect(error.details).toEqual({ reason: "demo" });
    expect(error.isOperational).toBe(true);
  });

  it("uses the expected defaults for HTTP error classes", () => {
    expect(new ValidationError().statusCode).toBe(400);
    expect(new ValidationError().code).toBe("VALIDATION_ERROR");

    expect(new AuthError().statusCode).toBe(401);
    expect(new AuthError().code).toBe("AUTH_ERROR");

    expect(new ForbiddenError().statusCode).toBe(403);
    expect(new ForbiddenError().code).toBe("FORBIDDEN");

    expect(new NotFoundError().statusCode).toBe(404);
    expect(new NotFoundError().code).toBe("NOT_FOUND");

    expect(new ConflictError().statusCode).toBe(409);
    expect(new ConflictError().code).toBe("CONFLICT");

    expect(new ExternalServiceError().statusCode).toBe(502);
    expect(new ExternalServiceError().code).toBe("EXTERNAL_SERVICE_ERROR");
  });

  it("supports custom message and details for HTTP errors", () => {
    const error = new ValidationError({
      message: "Invalid input",
      details: { field: "email" },
    });

    expect(error.message).toBe("Invalid input");
    expect(error.details).toEqual({ field: "email" });
  });

  it("identifies AppError instances", () => {
    expect(isAppError(new AppError({ code: "TEST", message: "test" }))).toBe(true);
  });

  it("rejects plain errors and plain objects", () => {
    expect(isAppError(new Error("boom"))).toBe(false);
    expect(isAppError({ code: "TEST" })).toBe(false);
  });
});
