import { beforeEach, describe, expect, it, vi } from "vitest";

import { createApiClient } from "../src/index.js";

describe("api client", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("requires a baseUrl", () => {
    expect(() => createApiClient()).toThrow(TypeError);
  });

  it("handles trailing slashes in baseUrl safely", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      json: vi.fn().mockResolvedValue({ success: true, data: { status: "ok" } }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const client = createApiClient({ baseUrl: "http://localhost:4000/" });
    await client.getHealth();

    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:4000/health",
      expect.objectContaining({ method: "GET" }),
    );
  });

  it("gets health successfully", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      json: vi.fn().mockResolvedValue({ success: true, data: { status: "ok" } }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const client = createApiClient({ baseUrl: "http://localhost:4000" });
    const response = await client.getHealth();

    expect(response).toEqual({ success: true, data: { status: "ok" } });
  });

  it("echoes a message successfully and sends JSON body", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      json: vi.fn().mockResolvedValue({ success: true, data: { message: "hello" } }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const client = createApiClient({ baseUrl: "http://localhost:4000" });
    const response = await client.echo("hello");

    expect(response).toEqual({ success: true, data: { message: "hello" } });
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:4000/echo",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ message: "hello" }),
      }),
    );
  });

  it("adds an authorization header when getAccessToken returns a value", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      json: vi.fn().mockResolvedValue({ success: true, data: {} }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const client = createApiClient({
      baseUrl: "http://localhost:4000",
      getAccessToken: async () => "token-123",
    });

    await client.getHealth();

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Bearer token-123" }),
      }),
    );
  });

  it("omits authorization header when getAccessToken returns an empty value", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      json: vi.fn().mockResolvedValue({ success: true, data: {} }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const client = createApiClient({
      baseUrl: "http://localhost:4000",
      getAccessToken: async () => "",
    });

    await client.getHealth();

    expect(fetchMock).toHaveBeenCalledWith(
      expect.any(String),
      expect.not.objectContaining({ headers: expect.objectContaining({ Authorization: expect.any(String) }) }),
    );
  });

  it("throws a timeout error", async () => {
    const fetchMock = vi.fn().mockImplementation(() => {
      throw new DOMException("The operation was aborted", "AbortError");
    });

    vi.stubGlobal("fetch", fetchMock);

    const client = createApiClient({ baseUrl: "http://localhost:4000", timeoutMs: 1 });

    await expect(client.getHealth()).rejects.toMatchObject({
      code: "TIMEOUT",
      message: "Request timed out",
    });
  });

  it("throws a network error", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("offline"));

    vi.stubGlobal("fetch", fetchMock);

    const client = createApiClient({ baseUrl: "http://localhost:4000" });

    await expect(client.getHealth()).rejects.toMatchObject({
      code: "NETWORK_ERROR",
      message: "Network request failed",
    });
  });

  it("throws an ApiClientError using server error response values", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      headers: new Headers({ "content-type": "application/json" }),
      json: vi.fn().mockResolvedValue({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Validation failed",
          details: [{ path: "message", message: "Required", code: "too_small" }],
        },
      }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const client = createApiClient({ baseUrl: "http://localhost:4000" });

    await expect(client.getHealth()).rejects.toMatchObject({
      code: "VALIDATION_ERROR",
      message: "Validation failed",
      details: [{ path: "message", message: "Required", code: "too_small" }],
    });
  });

  it("throws HTTP_ERROR for non-2xx unknown shapes", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 500,
      headers: new Headers({ "content-type": "application/json" }),
      json: vi.fn().mockResolvedValue({ message: "server exploded" }),
    });

    vi.stubGlobal("fetch", fetchMock);

    const client = createApiClient({ baseUrl: "http://localhost:4000" });

    await expect(client.getHealth()).rejects.toMatchObject({
      code: "HTTP_ERROR",
      message: "HTTP request failed",
      statusCode: 500,
    });
  });

  it("throws INVALID_JSON for invalid JSON response bodies", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ "content-type": "application/json" }),
      json: vi.fn().mockRejectedValue(new Error("bad json")),
    });

    vi.stubGlobal("fetch", fetchMock);

    const client = createApiClient({ baseUrl: "http://localhost:4000" });

    await expect(client.getHealth()).rejects.toMatchObject({
      code: "INVALID_JSON",
      message: "Invalid JSON response",
    });
  });

  it("returns null for empty 204 responses", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 204,
      headers: new Headers(),
    });

    vi.stubGlobal("fetch", fetchMock);

    const client = createApiClient({ baseUrl: "http://localhost:4000" });
    const response = await client.getHealth();

    expect(response).toBeNull();
  });
});
