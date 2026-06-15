import { ZodError } from "zod";

import { ValidationError } from "@repo/errors";

function createValidationError(error) {
  const details = error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message,
    code: issue.code,
  }));

  return new ValidationError({
    message: "Validation failed",
    details,
  });
}

function createMiddleware(selector, setter, schema) {
  return (req, res, next) => {
    try {
      const parsedValue = schema.parse(selector(req));
      setter(req, parsedValue);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        next(createValidationError(error));
        return;
      }

      next(error);
    }
  };
}

export function validateBody(schema) {
  return createMiddleware((req) => req.body, (req, value) => {
    req.body = value;
  }, schema);
}

export function validateQuery(schema) {
  return createMiddleware((req) => req.query, (req, value) => {
    req.query = value;
  }, schema);
}

export function validateParams(schema) {
  return createMiddleware((req) => req.params, (req, value) => {
    req.params = value;
  }, schema);
}
