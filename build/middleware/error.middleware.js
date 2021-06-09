"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const http_status_codes_1 = require("http-status-codes");
const winston_logger_1 = require("../common/winston.logger");
const HTTPException_1 = require("../exceptions/HTTPException");
function errorMiddleware(error, _request, response, next) {
    if (error instanceof HTTPException_1.HttpException) {
        const status = error.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR;
        const message = error.message || http_status_codes_1.ReasonPhrases.INTERNAL_SERVER_ERROR;
        response
            .status(status)
            .json({
            status,
            message,
        });
        return;
    }
    next(error);
}
exports.errorMiddleware = errorMiddleware;
process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
    winston_logger_1.winstonLogger.error(reason);
    process.exit(1);
});
process.on('uncaughtException', error => {
    console.error(error, 'Uncaught Exception thrown');
    winston_logger_1.winstonLogger.error(error);
    process.exit(1);
});
//# sourceMappingURL=error.middleware.js.map