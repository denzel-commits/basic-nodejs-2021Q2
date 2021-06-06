import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HttpException } from '../../exceptions/HTTPException';
import { Task } from './task.model';
import { getAll, getById, createTask, updateTask, deleteTask } from './task.service';

const router = express.Router({ mergeParams: true });

router.route('/').get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {boardId} = req.params;

  if (boardId === undefined){
    next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
    return; 
  }   
  
  const tasks = await getAll(boardId);

  res.status(StatusCodes.OK).json(tasks.map((task) => Task.toResponse(task)));
});

router.route('/:taskId').get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {boardId, taskId} = req.params;

  if (boardId === undefined || taskId === undefined){
    next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
    return; 
  }    

  const task = await getById( boardId, taskId );

  if(task === null){
    next(new HttpException(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
    return;
  }  
  
  res.status(StatusCodes.OK).json(Task.toResponse(task));
});

router.route('/').post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  const {boardId} = req.params;

  if (boardId === undefined){
    next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
    return; 
  }   
     
  const task = await createTask(boardId, req.body);

  res.status(StatusCodes.CREATED).json(task);
});

router.route('/:taskId').put(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {boardId, taskId} = req.params;
  
  if (boardId === undefined || taskId === undefined){
    next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
    return; 
  }  

  const result = await updateTask( boardId, taskId, req.body );

  if (!result) {
    next(new HttpException(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));    
    return; 
  } 
  
  res.status(StatusCodes.OK).json({ message: `User successfully updated` });  
});

router.route('/:taskId').delete(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {boardId, taskId} = req.params;

  if (boardId === undefined || taskId === undefined){
    next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
    return; 
  }  

  const result = await deleteTask( boardId, taskId );

  if (!result) {
    next(new HttpException(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));    
    return; 
  } 

  res.status(StatusCodes.NO_CONTENT).json({ message: ReasonPhrases.NO_CONTENT });  
});

export { router };
