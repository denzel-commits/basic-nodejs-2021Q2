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
const board_model_1 = require("./board.model");
const board_service_1 = require("./board.service");
const router = express_1.default.Router();
exports.router = router;
router.route('/').get(promise_wrapper_1.promiseWrapper(async (_req, res) => {
    const boards = await board_service_1.getAll();
    res.json(boards.map(board_model_1.Board.toResponse));
}));
router.route('/:boardId').get(promise_wrapper_1.promiseWrapper(async (req, res, next) => {
    const { boardId } = req.params;
    if (boardId === undefined) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, http_status_codes_1.ReasonPhrases.BAD_REQUEST));
        return;
    }
    const board = await board_service_1.getById(boardId);
    if (board === null) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, http_status_codes_1.ReasonPhrases.NOT_FOUND));
        return;
    }
    res.status(http_status_codes_1.StatusCodes.OK).json(board_model_1.Board.toResponse(board));
}));
router.route('/').post(promise_wrapper_1.promiseWrapper(async (req, res, next) => {
    if (Object.entries(req.body).length === 0) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, http_status_codes_1.ReasonPhrases.BAD_REQUEST));
        return;
    }
    const board = await board_service_1.createBoard(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json(board_model_1.Board.toResponse(board));
}));
router.route('/:boardId').put(promise_wrapper_1.promiseWrapper(async (req, res, next) => {
    const { boardId } = req.params;
    if (boardId === undefined) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, http_status_codes_1.ReasonPhrases.BAD_REQUEST));
        return;
    }
    const result = await board_service_1.updateBoard(boardId, req.body);
    if (!result) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, http_status_codes_1.ReasonPhrases.NOT_FOUND));
        return;
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ message: `Board successfully updated` });
}));
router.route('/:boardId').delete(promise_wrapper_1.promiseWrapper(async (req, res, next) => {
    const { boardId } = req.params;
    if (boardId === undefined) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.BAD_REQUEST, http_status_codes_1.ReasonPhrases.BAD_REQUEST));
        return;
    }
    const result = await board_service_1.deleteBoard(boardId);
    if (!result) {
        next(new HTTPException_1.HttpException(http_status_codes_1.StatusCodes.NOT_FOUND, http_status_codes_1.ReasonPhrases.NOT_FOUND));
        return;
    }
    res.status(http_status_codes_1.StatusCodes.NO_CONTENT).json({ message: `Board successfully deleted` });
}));
//# sourceMappingURL=board.router.js.map