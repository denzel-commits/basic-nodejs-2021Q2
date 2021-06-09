"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const yamljs_1 = __importDefault(require("yamljs"));
const error_middleware_1 = require("./middleware/error.middleware");
const user_router_1 = require("./resources/users/user.router");
const board_router_1 = require("./resources/boards/board.router");
const task_router_1 = require("./resources/tasks/task.router");
const logger_middleware_1 = require("./middleware/logger.middleware");
const DIR_NAME = path_1.default.resolve(path_1.default.dirname(''));
const app = express_1.default();
exports.app = app;
const swaggerDocument = yamljs_1.default.load(path_1.default.join(DIR_NAME, './doc/api.yaml'));
app.use(express_1.default.json());
app.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
        res.send('Service is running!');
        return;
    }
    next();
});
app.use(logger_middleware_1.loggerMiddleware);
app.use('/users', user_router_1.router);
app.use('/boards', board_router_1.router);
app.use('/boards/:boardId/tasks', task_router_1.router);
app.use(error_middleware_1.errorMiddleware);
//# sourceMappingURL=app.js.map