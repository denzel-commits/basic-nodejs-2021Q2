import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HttpException } from '../../exceptions/HTTPException';
import { Board } from './board.model';
import { getAll, getById, createBoard, updateBoard, deleteBoard } from './board.service';

const router = express.Router();

router.route('/').get(async (_req: express.Request, res: express.Response) => {
  const boards = await getAll();

  res.json(boards.map(Board.toResponse));
});

router.route('/:boardId').get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {boardId} = req.params;

  if (boardId === undefined){
    next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
    return; 
  }   

  const board = await getById(boardId);

  if(board === null){
    next(new HttpException(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
    return;
  }
  
  res.status(StatusCodes.OK).json(Board.toResponse(board));
    
});

router.route('/').post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  if (Object.entries(req.body).length === 0){
    next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
    return; 
  }  

  const board = await createBoard(req.body);

  res.status(StatusCodes.CREATED).json(Board.toResponse(board));
});

router.route('/:boardId').put(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {boardId} = req.params;

  if (boardId === undefined){
    next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
    return; 
  }

  const result = await updateBoard(boardId, req.body);

  if (!result) {
    next(new HttpException(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
    return;
  } 
  
  res.status(StatusCodes.OK).json({ message: `Board successfully updated` });  
});

router.route('/:boardId').delete(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {boardId} = req.params;

  if (boardId === undefined){
    next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
    return; 
  }

  const result = await deleteBoard(boardId);

  if (!result) {
    next(new HttpException(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
    return;
  } 
  
  res.status(StatusCodes.NO_CONTENT).json({ message: `Board successfully deleted` });
  
});

export { router };
