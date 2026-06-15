import { createSuccessResponse } from "@repo/contracts";

export function getHealth(_req, res) {
  res.status(200).json(
    createSuccessResponse({
      status: "ok",
      service: "api",
      timestamp: new Date().toISOString(),
    }),
  );
}
