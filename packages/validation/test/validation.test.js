import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import { ValidationError } from "@repo/errors";
import { validateBody, validateParams, validateQuery } from "../src/index.js";

describe("validation middleware", () => {
  it("passes valid body and replaces req.body with parsed data", () => {
    const schema = z.object({ message: z.string().min(1) });
    const req = { body: { message: "hello" } };
    const res = {};
    const next = vi.fn();

    validateBody(schema)(req, res, next);

    expect(req.body).toEqual({ message: "hello" });
    expect(next).toHaveBeenCalledWith();
  });

  it("calls next with a ValidationError for invalid body", () => {
    const schema = z.object({ message: z.string().min(1) });
    const req = { body: { message: "" } };
    const next = vi.fn();

    validateBody(schema)(req, {}, next);

    expect(next).toHaveBeenCalledTimes(1);
    const [error] = next.mock.calls[0];
    expect(error).toBeInstanceOf(ValidationError);
    expect(error.message).toBe("Validation failed");
  });

  it("validates req.query", () => {
    const schema = z.object({ page: z.coerce.number().int().positive() });
    const req = { query: { page: "2" } };
    const next = vi.fn();

    validateQuery(schema)(req, {}, next);

    expect(req.query).toEqual({ page: 2 });
    expect(next).toHaveBeenCalledWith();
  });

  it("validates req.params", () => {
    const schema = z.object({ id: z.string().uuid() });
    const req = { params: { id: "123e4567-e89b-12d3-a456-426614174000" } };
    const next = vi.fn();

    validateParams(schema)(req, {}, next);

    expect(req.params).toEqual({ id: "123e4567-e89b-12d3-a456-426614174000" });
    expect(next).toHaveBeenCalledWith();
  });

  it("includes path, message, and code in validation details", () => {
    const schema = z.object({ profile: z.object({ name: z.string().min(1) }) });
    const req = { body: { profile: { name: "" } } };
    const next = vi.fn();

    validateBody(schema)(req, {}, next);

    const [error] = next.mock.calls[0];
    expect(error.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "profile.name",
          message: expect.any(String),
          code: expect.any(String),
        }),
      ]),
    );
  });

  it("handles empty paths safely", () => {
    const schema = z.string().min(1);
    const req = { body: 1 };
    const next = vi.fn();

    validateBody(schema)(req, {}, next);

    const [error] = next.mock.calls[0];
    expect(error.details).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "",
        }),
      ]),
    );
  });

  it("passes unexpected non-Zod errors through unchanged", () => {
    const schema = {
      parse: () => {
        throw new Error("boom");
      },
    };
    const req = { body: {} };
    const next = vi.fn();

    validateBody(schema)(req, {}, next);

    const [error] = next.mock.calls[0];
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe("boom");
  });
});
