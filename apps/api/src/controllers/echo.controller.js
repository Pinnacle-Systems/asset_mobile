import { createSuccessResponse } from "@repo/contracts";

export function echoController(req, res) {
  res.status(200).json(createSuccessResponse({ message: req.body.message }));
}
