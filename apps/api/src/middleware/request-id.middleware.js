import { randomUUID } from "node:crypto";

export default function requestIdMiddleware(req, res, next) {
  const requestId = req.get("x-request-id") || randomUUID();
  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);
  next();
}
