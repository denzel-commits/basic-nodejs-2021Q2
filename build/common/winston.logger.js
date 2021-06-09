"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.winstonLogger = void 0;
const winston_1 = __importDefault(require("winston"));
const errorLog = 'winston-error.log';
const requestLog = 'winston-request.log';
const winstonLogger = winston_1.default.createLogger({
    level: 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), winston_1.default.format.json()),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston_1.default.transports.File({ filename: `./logs/${requestLog}`, level: 'info' }),
        new winston_1.default.transports.File({ filename: `./logs/${errorLog}`, level: 'error' }),
    ],
    exitOnError: true,
});
exports.winstonLogger = winstonLogger;
winstonLogger.add(new winston_1.default.transports.Console({
    format: winston_1.default.format.simple(),
}));
//# sourceMappingURL=winston.logger.js.map