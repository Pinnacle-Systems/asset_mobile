import { logger } from "../utils/logger.js";

export default function loggerMiddleware(req, res, next) {
    const start = Date.now();

    // Log request at beginning (Info)
    logger.info(`Incoming Request: ${req.method} ${req.url}`, {
        ip: req.ip,
        requestId: req.id, // Assuming requestIdMiddleware attaches this
        method: req.method,
        url: req.url,
    });

    // Track the response finish
    res.on('finish', () => {
        const duration = Date.now() - start;
        const logLevel = res.statusCode >= 400 ? 'error' : 'info';

        logger[logLevel](`Response Sent: ${req.method} ${req.url} [${res.statusCode}] - ${duration}ms`, {
            requestId: req.id,
            statusCode: res.statusCode,
            durationMs: duration
        });
    });

    next();
}
