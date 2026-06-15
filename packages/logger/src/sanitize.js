const SENSITIVE_KEYS = [
  "token",
  "accesstoken",
  "refreshtoken",
  "password",
  "authorization",
  "otp",
  "secret",
  "credential",
  "apikey",
  "sessionid",
];

function isSensitiveKey(key) {
  return SENSITIVE_KEYS.includes(key.toLowerCase());
}

/**
 * Recursively sanitize sensitive values in a metadata object.
 *
 * @param {unknown} input - The metadata value to sanitize.
 * @returns {unknown} A sanitized clone without mutating the original input.
 */
export function sanitizeMetadata(input) {
  if (input === null || input === undefined) {
    return input;
  }

  if (input instanceof Error) {
    return {
      name: input.name,
      message: input.message,
    };
  }

  if (Array.isArray(input)) {
    return input.map((item) => sanitizeMetadata(item));
  }

  if (typeof input === "object") {
    return Object.entries(input).reduce((accumulator, [key, value]) => {
      accumulator[key] = isSensitiveKey(key) ? "[REDACTED]" : sanitizeMetadata(value);
      return accumulator;
    }, {});
  }

  return input;
}
