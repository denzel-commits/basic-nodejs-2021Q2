"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const stream_1 = require("stream");
const winston_logger_1 = require("../common/winston.logger");
function loggerMiddleware(request, response, next) {
    const start = Date.now();
    const datetime = new Date(start).toUTCString();
    const { method, url } = request;
    const bodyData = JSON.stringify(request.body);
    const queryParams = JSON.stringify(request.query);
    next();
    stream_1.finished(response, () => {
        const ms = Date.now() - start;
        const { statusCode } = response;
        const log = `[${datetime}] ${method}: ${url} Query params: ${queryParams} Body: ${bodyData} Response Status Code: ${statusCode} [${ms}ms]`;
        winston_logger_1.winstonLogger.info(log);
    });
}
exports.loggerMiddleware = loggerMiddleware;
//# sourceMappingURL=logger.middleware.js.map