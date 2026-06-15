import { describe, expect, it } from "vitest";

import {
  UserRoles,
  UserRoleValues,
  createErrorResponse,
  createPaginationMeta,
  createSuccessResponse,
} from "../src/index.js";

describe("contracts package", () => {
  it("contains the expected user roles", () => {
    expect(UserRoles).toEqual({
      ADMIN: "admin",
      MANAGER: "manager",
      EMPLOYEE: "employee",
    });
  });

  it("freezes user roles", () => {
    expect(Object.isFrozen(UserRoles)).toBe(true);
  });

  it("derives user role values from the user roles", () => {
    expect(UserRoleValues).toEqual(["admin", "manager", "employee"]);
  });

  it("creates success responses with data", () => {
    const response = createSuccessResponse({ ok: true });

    expect(response).toEqual({
      success: true,
      data: { ok: true },
    });
  });

  it("omits meta when not provided", () => {
    const response = createSuccessResponse({ ok: true });

    expect(response).not.toHaveProperty("meta");
  });

  it("includes meta when provided", () => {
    const response = createSuccessResponse({ ok: true }, { page: 1 });

    expect(response).toEqual({
      success: true,
      data: { ok: true },
      meta: { page: 1 },
    });
  });

  it("uses safe fallback values for error responses", () => {
    const response = createErrorResponse({});

    expect(response).toEqual({
      success: false,
      error: {
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      },
    });
  });

  it("includes details and requestId when provided", () => {
    const response = createErrorResponse({
      code: "VALIDATION_ERROR",
      message: "Invalid input",
      details: { field: "email" },
      requestId: "req-123",
    });

    expect(response).toEqual({
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid input",
        details: { field: "email" },
        requestId: "req-123",
      },
    });
  });

  it("calculates totalPages correctly", () => {
    const pagination = createPaginationMeta({ page: 2, pageSize: 10, total: 25 });

    expect(pagination.totalPages).toBe(3);
  });

  it("calculates hasNextPage correctly", () => {
    const pagination = createPaginationMeta({ page: 2, pageSize: 10, total: 25 });

    expect(pagination.hasNextPage).toBe(true);
  });

  it("calculates hasPreviousPage correctly", () => {
    const pagination = createPaginationMeta({ page: 2, pageSize: 10, total: 25 });

    expect(pagination.hasPreviousPage).toBe(true);
  });

  it("applies safe defaults", () => {
    const pagination = createPaginationMeta({});

    expect(pagination).toEqual({
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });
  });

  it("clamps invalid values", () => {
    const pagination = createPaginationMeta({ page: 0, pageSize: 0, total: -5 });

    expect(pagination).toEqual({
      page: 1,
      pageSize: 1,
      total: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });
  });
});
