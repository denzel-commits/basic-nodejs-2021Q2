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
const user_model_1 = require("./user.model");
const user_service_1 = require("./user.service");
const router = express_1.default.Router();
exports.router = router;
router.route('/').get(promise_wrapper_1.promiseWrapper(async (_req, res) => {
    const users = await user_service_1.getAll();
    res.status(http_status_codes_1.StatusCodes.OK).json(users.map(user_model_1.User.toResponse));
}));
router.route('/:id').get(promise_wrapper_1.promiseWrapper(async (req, res, next) => {
    const { id } = req.params;
    if (id === undefined) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, http_status_codes_1.ReasonPhrases.BAD_REQUEST));
        return;
    }
    const user = await user_service_1.getById(id);
    if (user === null) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, http_status_codes_1.ReasonPhrases.NOT_FOUND));
        return;
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(user_model_1.User.toResponse(user));
}));
router.route('/').post(promise_wrapper_1.promiseWrapper(async (req, res, next) => {
    if (req.body === undefined) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, http_status_codes_1.ReasonPhrases.BAD_REQUEST));
        return;
    }
    const user = await user_service_1.createUser(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(user_model_1.User.toResponse(user));
}));
router.route('/:id').put(promise_wrapper_1.promiseWrapper(async (req, res, next) => {
    const { id } = req.params;
    if (id === undefined || req.body === undefined) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, http_status_codes_1.ReasonPhrases.BAD_REQUEST));
        return;
    }
    const result = await user_service_1.updateUser(id, req.body);
    if (!result) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, http_status_codes_1.ReasonPhrases.NOT_FOUND));
        return;
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: `User successfully updated` });
}));
router.route('/:id').delete(promise_wrapper_1.promiseWrapper(async (req, res, next) => {
    const { id } = req.params;
    if (id === undefined) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, http_status_codes_1.ReasonPhrases.BAD_REQUEST));
        return;
    }
    const result = await user_service_1.deleteUser(id);
    if (!result) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, http_status_codes_1.ReasonPhrases.NOT_FOUND));
        return;
    }
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ message: http_status_codes_1.ReasonPhrases.NO_CONTENT });
}));
//# sourceMappingURL=user.router.js.map