import { NotFoundError } from "@repo/errors";

export default function notFoundMiddleware(req, _res, next) {
  next(
    new NotFoundError({
      message: "Route not found",
      details: { path: req.originalUrl },
    }),
  );
}
