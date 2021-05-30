import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { User } from './user.model.js';
import { getAll, getById, createUser, updateUser, deleteUser } from './user.service.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  const users = await getAll();

  res.status(StatusCodes.OK).json(users.map( User.toResponse ) );
});

router.route('/:id').get(async (req, res) => {
  if (req.params.id === undefined)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });

  const user = await getById(req.params.id);

  if (user === undefined) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } else {
    res.status(StatusCodes.OK).json(User.toResponse(user));
  }
});

router.route('/').post(async (req, res) => {
  if (req.body === undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const user = await createUser(req.body);

  res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  if (req.params.id === undefined || req.body === undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const result = await updateUser(req.params.id, req.body);

  if (!result) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } else {
    res.status(StatusCodes.OK).json({ message: `User successfully updated` });
  }
});

router.route('/:id').delete(async (req, res) => {
  if (req.params.id === undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const result = await deleteUser(req.params.id);

  if (!result) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } else {
    res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: ReasonPhrases.NO_CONTENT });
  }
});

export { router };
