import { describe, expect, it, vi } from "vitest";

import { createLogger, sanitizeMetadata } from "../src/index.js";

describe("sanitizeMetadata", () => {
  it("redacts top-level sensitive keys", () => {
    const input = { token: "abc", name: "Ada" };

    expect(sanitizeMetadata(input)).toEqual({ token: "[REDACTED]", name: "Ada" });
  });

  it("redacts nested sensitive keys", () => {
    const input = { profile: { accessToken: "secret", name: "Ada" } };

    expect(sanitizeMetadata(input)).toEqual({
      profile: { accessToken: "[REDACTED]", name: "Ada" },
    });
  });

  it("redacts sensitive keys inside arrays", () => {
    const input = [{ password: "x" }, { name: "Ada" }];

    expect(sanitizeMetadata(input)).toEqual([{ password: "[REDACTED]" }, { name: "Ada" }]);
  });

  it("does not mutate the original object", () => {
    const input = { password: "x", nested: { name: "Ada" } };
    const original = structuredClone(input);

    sanitizeMetadata(input);

    expect(input).toEqual(original);
  });

  it("handles null and primitives", () => {
    expect(sanitizeMetadata(null)).toBeNull();
    expect(sanitizeMetadata(42)).toBe(42);
    expect(sanitizeMetadata("secret")).toBe("secret");
  });
});

describe("createLogger", () => {
  it("exposes debug/info/warn/error methods", () => {
    const logger = createLogger({ service: "test" });

    expect(typeof logger.debug).toBe("function");
    expect(typeof logger.info).toBe("function");
    expect(typeof logger.warn).toBe("function");
    expect(typeof logger.error).toBe("function");
  });

  it("outputs valid JSON in production", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const logger = createLogger({ service: "api", environment: "production" });

    logger.info("hello", { token: "abc" });

    const output = JSON.parse(logSpy.mock.calls[0][0]);
    expect(output.level).toBe("info");
    expect(output.service).toBe("api");
    expect(output.metadata).toEqual({ token: "[REDACTED]" });
    logSpy.mockRestore();
  });

  it("does not include error stack in production", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const logger = createLogger({ service: "api", environment: "production" });
    const error = new Error("boom");

    logger.error("failed", { error });

    const output = JSON.parse(logSpy.mock.calls[0][0]);
    expect(output.metadata.error).toEqual({ name: "Error", message: "boom" });
    expect(output.metadata.error.stack).toBeUndefined();
    logSpy.mockRestore();
  });

  it("may include error stack in development", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const logger = createLogger({ service: "api", environment: "development" });
    const error = new Error("boom");

    logger.error("failed", { error });

    const output = logSpy.mock.calls[0][0];
    expect(output).toContain("ERROR");
    logSpy.mockRestore();
  });
});
