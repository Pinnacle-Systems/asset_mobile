import { createApiClient } from "@repo/api-client";

import { API_BASE_URL } from "../config/env.js";

export const api = createApiClient({
  baseUrl: API_BASE_URL,
});
