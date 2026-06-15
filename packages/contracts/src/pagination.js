/**
 * Normalize an integer-like value and clamp it to a minimum.
 * @param {number|string|undefined} value - The value to normalize.
 * @param {number} fallback - The fallback value used for invalid input.
 * @param {number} minimum - The minimum allowed value.
 * @returns {number}
 */
function normalizeInteger(value, fallback, minimum) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(minimum, Math.trunc(value));
  }

  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);

    if (Number.isFinite(parsed)) {
      return Math.max(minimum, Math.trunc(parsed));
    }
  }

  return fallback;
}

/**
 * Create pagination metadata for a list response.
 * @param {{page?: number, pageSize?: number, total?: number}|undefined} [options] - Pagination options.
 * @returns {{page: number, pageSize: number, total: number, totalPages: number, hasNextPage: boolean, hasPreviousPage: boolean}}
 */
export function createPaginationMeta({ page, pageSize, total } = {}) {
  const normalizedPage = normalizeInteger(page, 1, 1);
  const normalizedPageSize = normalizeInteger(pageSize, 10, 1);
  const normalizedTotal = normalizeInteger(total, 0, 0);
  const totalPages = normalizedPageSize > 0 ? Math.ceil(normalizedTotal / normalizedPageSize) : 0;

  return {
    page: normalizedPage,
    pageSize: normalizedPageSize,
    total: normalizedTotal,
    totalPages,
    hasNextPage: normalizedPage < totalPages,
    hasPreviousPage: normalizedPage > 1,
  };
}
