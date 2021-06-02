import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Board } from './board.model';
import { getAll, getById, createBoard, updateBoard, deleteBoard } from './board.service';

const router = express.Router();

router.route('/').get(async (_req: express.Request, res: express.Response) => {
  const boards = await getAll();

  res.json(boards.map(Board.toResponse));  
});

router.route('/:boardId').get(async (req: express.Request, res: express.Response) => {
  const {boardId} = req.params;

  if (boardId === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const board = await getById(boardId);

  if (board === undefined) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } 
  
  return res.status(StatusCodes.OK).json(Board.toResponse(board));  
});

router.route('/').post(async (req: express.Request, res: express.Response) => {
  if (Object.entries(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const board = await createBoard(req.body);

  return res.status(StatusCodes.CREATED).json(Board.toResponse(board));
});

router.route('/:boardId').put(async (req: express.Request, res: express.Response) => {
  const {boardId} = req.params;
  if (boardId === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const result = await updateBoard(boardId, req.body);

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } 
  
  return res.status(StatusCodes.OK).json({ message: `Board successfully updated` });  
});

router.route('/:boardId').delete(async (req: express.Request, res: express.Response) => {
  const {boardId} = req.params;

  if (boardId === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const result = await deleteBoard(boardId);

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } 
  
  return res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: `Board successfully deleted` });
  
});

export { router };
