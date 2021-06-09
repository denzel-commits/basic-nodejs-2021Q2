"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AUTH_MODE = exports.JWT_SECRET_KEY = exports.MONGO_CONNECTION_STRING = exports.NODE_ENV = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const DIR_NAME = path_1.default.resolve(path_1.default.dirname(''));
dotenv_1.default.config({
    path: path_1.default.join(DIR_NAME, './.env'),
});
const { PORT, NODE_ENV, MONGO_CONNECTION_STRING, JWT_SECRET_KEY, AUTH_MODE } = process.env;
exports.PORT = PORT;
exports.NODE_ENV = NODE_ENV;
exports.MONGO_CONNECTION_STRING = MONGO_CONNECTION_STRING;
exports.JWT_SECRET_KEY = JWT_SECRET_KEY;
exports.AUTH_MODE = AUTH_MODE;
//# sourceMappingURL=config.js.map