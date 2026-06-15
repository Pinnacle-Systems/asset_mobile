import { request } from "./request.js";

/**
 * Create a reusable API client configured for a specific backend base URL.
 *
 * @param {{baseUrl: string, timeoutMs?: number, getAccessToken?: () => Promise<string | null | undefined> | string | null | undefined}} config - Client configuration.
 * @returns {{getHealth: () => Promise<unknown>, echo: (message: string) => Promise<unknown>}}
 */
export function createApiClient({ baseUrl, timeoutMs, getAccessToken } = {}) {
  if (typeof baseUrl !== "string" || baseUrl.trim() === "") {
    throw new TypeError("baseUrl is required");
  }

  const normalizedBaseUrl = baseUrl.replace(/\/+$/, "");

  return {
    async getHealth() {
      return request({
        method: "GET",
        path: "/health",
        timeoutMs,
        getAccessToken,
        baseUrl: normalizedBaseUrl,
      });
    },

    async echo(message) {
      return request({
        method: "POST",
        path: "/echo",
        body: { message },
        timeoutMs,
        getAccessToken,
        baseUrl: normalizedBaseUrl,
      });
    },
  };
}
