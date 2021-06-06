import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { User } from './user.model';
import { getAll, getById, createUser, updateUser, deleteUser } from './user.service';

const router = express.Router();

router.route('/').get(async (_req: express.Request, res: express.Response) => {
  const users = await getAll();

  return res.status(StatusCodes.OK).json(users.map( User.toResponse ) );
});

router.route('/:id').get(async (req: express.Request, res: express.Response) => {
  const {id} = req.params;
  if (id === undefined)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });

  try{
    const user = await getById(id);
    return res.status(StatusCodes.OK).json(User.toResponse(user)); 
  }catch(e){
    return res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  }
  
  
});

router.route('/').post(async (req: express.Request, res: express.Response) => {
  if (req.body === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const user = await createUser(req.body);

  return res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

router.route('/:id').put(async (req: express.Request, res: express.Response) => {
  const {id} = req.params;

  if (id === undefined || req.body === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const result = await updateUser(id, req.body);

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } 
  
  return res.status(StatusCodes.OK).json({ message: `User successfully updated` });  
});

router.route('/:id').delete(async (req: express.Request, res: express.Response) => {
  const {id} = req.params;

  if (id === undefined) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const result = await deleteUser(id);

  if (!result) {
    return res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } 
    
  return res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: ReasonPhrases.NO_CONTENT });
  
});

export { router };
