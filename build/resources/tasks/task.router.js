"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const http_status_codes_1 = require("http-status-codes");
const promise_wrapper_1 = require("../../common/promise.wrapper");
const HTTPException_1 = require("../../exceptions/HTTPException");
const task_model_1 = require("./task.model");
const task_service_1 = require("./task.service");
const router = express_1.default.Router({ mergeParams: true });
exports.router = router;
router.route('/').get(promise_wrapper_1.promiseWrapper(async (req, res, next) => {
    const { boardId } = req.params;
    if (boardId === undefined) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, http_status_codes_1.ReasonPhrases.BAD_REQUEST));
        return;
    }
    const tasks = await task_service_1.getAll(boardId);
    res.status(http_status_codes_1.StatusCodes.OK).json(tasks.map((task) => task_model_1.Task.toResponse(task)));
}));
router.route('/:taskId').get(promise_wrapper_1.promiseWrapper(async (req, res, next) => {
    const { boardId, taskId } = req.params;
    if (boardId === undefined || taskId === undefined) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, http_status_codes_1.ReasonPhrases.BAD_REQUEST));
        return;
    }
    const task = await task_service_1.getById(boardId, taskId);
    if (task === null) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, http_status_codes_1.ReasonPhrases.NOT_FOUND));
        return;
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(task_model_1.Task.toResponse(task));
}));
router.route('/').post(promise_wrapper_1.promiseWrapper(async (req, res, next) => {
    const { boardId } = req.params;
    if (boardId === undefined) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, http_status_codes_1.ReasonPhrases.BAD_REQUEST));
        return;
    }
    const task = await task_service_1.createTask(boardId, req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(task);
}));
router.route('/:taskId').put(promise_wrapper_1.promiseWrapper(async (req, res, next) => {
    const { boardId, taskId } = req.params;
    if (boardId === undefined || taskId === undefined) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, http_status_codes_1.ReasonPhrases.BAD_REQUEST));
        return;
    }
    const result = await task_service_1.updateTask(boardId, taskId, req.body);
    if (!result) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, http_status_codes_1.ReasonPhrases.NOT_FOUND));
        return;
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: `User successfully updated` });
}));
router.route('/:taskId').delete(promise_wrapper_1.promiseWrapper(async (req, res, next) => {
    const { boardId, taskId } = req.params;
    if (boardId === undefined || taskId === undefined) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, http_status_codes_1.ReasonPhrases.BAD_REQUEST));
        return;
    }
    const result = await task_service_1.deleteTask(boardId, taskId);
    if (!result) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, http_status_codes_1.ReasonPhrases.NOT_FOUND));
        return;
    }
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ message: http_status_codes_1.ReasonPhrases.NO_CONTENT });
}));
//# sourceMappingURL=task.router.js.map