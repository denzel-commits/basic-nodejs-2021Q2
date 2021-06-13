import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { HttpException } from '../../exceptions/HTTPException';
import { User } from './user.model';
import { getAll, getById, createUser, updateUser, deleteUser } from './user.service';

const router = express.Router();

router.route('/').get(async (_req: express.Request, res: express.Response) => {
  const users = await getAll();

  return res.status(StatusCodes.OK).json(users.map( User.toResponse ) );
});

router.route('/:id').get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {id} = req.params;

  if (id === undefined){
    next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
    return; 
  }    

  const user = await getById(id);

  if(user === null){
    next(new HttpException(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
    return;
  }  
  
  
  res.status(StatusCodes.OK).json(User.toResponse(user));  
});

router.route('/').post(async (req: express.Request, res: express.Response, next: express.NextFunction) => {

  if (req.body === undefined){
    next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
    return; 
  }    

  const user = await createUser(req.body);

  res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

router.route('/:id').put(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {id} = req.params;

  if (id === undefined || req.body === undefined){
    next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
    return; 
  }    

  const result = await updateUser(id, req.body);

  if (!result) {
    next(new HttpException(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
    return;
  } 
  
  res.status(StatusCodes.OK).json({ message: `User successfully updated` });  
});

router.route('/:id').delete(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const {id} = req.params;

  if (id === undefined){
    next(new HttpException(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST));    
    return; 
  }  

  const result = await deleteUser(id);

  if (!result) {
    next(new HttpException(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND));
    return;
  } 
    
  res.status(StatusCodes.NO_CONTENT).json({ message: ReasonPhrases.NO_CONTENT });
  
});

export { router };
