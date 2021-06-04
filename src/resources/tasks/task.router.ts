import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
// import { HttpException } from '../../exceptions/HTTPException';
import { Task } from './task.model';
import { getAll, getById, createTask, updateTask, deleteTask } from './task.service';

const router = express.Router({ mergeParams: true });

router.route('/').get(async (req: express.Request, res: express.Response) => {
  const {boardId} = req.params;

  if (boardId === undefined){
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }    

  const tasks = await getAll(boardId);

  return res.status(StatusCodes.OK).json(tasks.map((task) => Task.toResponse(task)));
});

router.route('/:taskId').get(async (req: express.Request, res: express.Response) => {
  const {boardId, taskId} = req.params;
  if (boardId === undefined || taskId === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });  
  }

  try{
    const task = await getById( boardId, taskId );
    return res.status(StatusCodes.OK).json(Task.toResponse(task));
  }catch(err){
    return res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  };

  // try{
  //   const task = await getById( boardId, taskId );

  //   if(task){
  //     return res.status(StatusCodes.OK).json(Task.toResponse(task));
  //   }      

  //   next(new HttpException(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));

  // }catch(e){
  //   return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);
  // }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ReasonPhrases.INTERNAL_SERVER_ERROR);

});

router.route('/').post(async (req: express.Request, res: express.Response) => {

  const {boardId} = req.params;

  
  if (boardId === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }
     
  const task = await createTask(boardId, req.body);

  return res.status(StatusCodes.CREATED).json(task);
});

router.route('/:taskId').put(async (req: express.Request, res: express.Response) => {
  const {boardId, taskId} = req.params;
  
  if (boardId === undefined || taskId === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });    
  }

  const result = await updateTask( boardId, taskId, req.body );

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } 
  
  return res.status(StatusCodes.OK).json({ message: `User successfully updated` });  
});

router.route('/:taskId').delete(async (req: express.Request, res: express.Response) => {
  const {boardId, taskId} = req.params;

  if (boardId === undefined || taskId === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const result = await deleteTask( boardId, taskId );

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } 

  return res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: ReasonPhrases.NO_CONTENT });  
});

export { router };
