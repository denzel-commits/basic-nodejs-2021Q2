import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import Board from './board.model';
import boardsService from './board.service';
import validate from '../validation.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();

  res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req, res) => {
  if (req.params.boardId === undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const board = await boardsService.getById(req.params.boardId);

  if (board === undefined) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } else {
    res.status(StatusCodes.OK).json(Board.toResponse(board));
  }
});

router.route('/').post(async (req, res) => {
  if (Object.entries(req.body).length === 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  if (!validate.objFields(req.body, ['title', 'columns'])) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const board = await boardsService.createBoard(req.body);

  res.status(StatusCodes.CREATED).json(Board.toResponse(board));
});

router.route('/:boardId').put(async (req, res) => {
  if (req.params.boardId === undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  if (!validate.objFields(req.body, ['title', 'columns'])) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const result = await boardsService.updateBoard(req.params.boardId, req.body);

  if (!result) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } else {
    res.status(StatusCodes.OK).json({ message: `Board successfully updated` });
  }
});

router.route('/:boardId').delete(async (req, res) => {
  if (req.params.boardId === undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const result = await boardsService.deleteBoard(req.params.boardId);

  if (!result) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } else {
    res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: `Board successfully deleted` });
  }
});

export { router };
