import { ApiClientError } from "./api-client-error.js";

/**
 * Send an HTTP request with timeout support and JSON parsing.
 *
 * @param {{method: string, path: string, body?: unknown, query?: Record<string, unknown>, timeoutMs?: number, getAccessToken?: () => Promise<string | null | undefined> | string | null | undefined, baseUrl: string}} config - Request configuration.
 * @returns {Promise<unknown>}
 */
export async function request({
  method,
  path,
  body,
  query,
  timeoutMs,
  getAccessToken,
  baseUrl,
}) {
  const url = new URL(path, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  const headers = {
    Accept: "application/json",
    ...(body !== undefined ? { "Content-Type": "application/json" } : {}),
  };

  const token = getAccessToken ? await getAccessToken() : undefined;

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs ?? 10000);

  try {
    const response = await fetch(url.toString(), {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });

    if (response.status === 204) {
      return null;
    }

    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      return response.text();
    }

    let payload;
    try {
      payload = await response.json();
    } catch {
      throw new ApiClientError({
        code: "INVALID_JSON",
        message: "Invalid JSON response",
        statusCode: response.status,
      });
    }

    if (response.ok) {
      return payload;
    }

    if (payload && typeof payload === "object" && "success" in payload && payload.success === false) {
      const errorPayload = payload.error ?? {};
      throw new ApiClientError({
        code: errorPayload.code || "HTTP_ERROR",
        message: errorPayload.message || "HTTP request failed",
        statusCode: response.status,
        details: errorPayload.details,
      });
    }

    throw new ApiClientError({
      code: "HTTP_ERROR",
      message: "HTTP request failed",
      statusCode: response.status,
    });
  } catch (error) {
    if (error instanceof ApiClientError) {
      throw error;
    }

    if (error?.name === "AbortError") {
      throw new ApiClientError({
        code: "TIMEOUT",
        message: "Request timed out",
        cause: error,
      });
    }

    throw new ApiClientError({
      code: "NETWORK_ERROR",
      message: "Network request failed",
      cause: error,
    });
  } finally {
    clearTimeout(timeout);
  }
}
