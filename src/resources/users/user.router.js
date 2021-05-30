import express from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import User from './user.model';
import usersService from './user.service';
import validate from '../validation.js';

const router = express.Router();

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();

  res.status(StatusCodes.OK).json(users.map(User.toResponse));
});

router.route('/:id').get(async (req, res) => {
  if (req.params.id === undefined)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });

  const user = await usersService.getById(req.params.id);

  if (user === undefined) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } else {
    res.status(StatusCodes.OK).json(User.toResponse(user));
  }
});

router.route('/').post(async (req, res) => {
  if (req.body === undefined || req.body.length === 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  if (!validate.objFields(req.body, ['name', 'login', 'password'])) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const user = await usersService.createUser(req.body);

  res.status(StatusCodes.CREATED).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  if (req.params.id === undefined || req.body === undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  if (!validate.objFields(req.body, ['name', 'login', 'password'])) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const result = await usersService.updateUser(req.params.id, req.body);

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

  const result = await usersService.deleteUser(req.params.id);

  if (!result) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } else {
    res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: ReasonPhrases.NO_CONTENT });
  }
});

export default router;
