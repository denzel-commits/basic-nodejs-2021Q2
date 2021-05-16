const router = require('express').Router({ mergeParams: true });
const { ReasonPhrases, StatusCodes } = require('http-status-codes');
const Task = require('./task.model');
const tasksService = require('./task.service');
const validate = require('../validation.js');

router.route('/').get(async (req, res) => {
  if (req.params.boardId === undefined)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });

  const tasks = await tasksService.getAllByBoardId(req.params.boardId);

  if (tasks.length === 0) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } else {
    res.status(StatusCodes.OK).json(tasks.map((task) => Task.toResponse(task)));
  }
});

router.route('/:taskId').get(async (req, res) => {
  if (req.params.boardId === undefined || req.params.taskId === undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const task = await tasksService.getById(
    req.params.boardId,
    req.params.taskId
  );

  if (task === undefined) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } else {
    res.status(StatusCodes.OK).json(Task.toResponse(task));
  }
});

router.route('/').post(async (req, res) => {
  if (Object.entries(req.body).length === 0) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  if (
    !validate.objFields(req.body, [
      'title',
      'order',
      'description',
      'userId',
      'boardId',
    ])
  ) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const task = await tasksService.createTask(req.params.boardId, req.body);

  res.status(StatusCodes.CREATED).json(Task.toResponse(task));
});

router.route('/:taskId').put(async (req, res) => {
  if (req.params.taskId === undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const result = await tasksService.updateTask(
    req.params.boardId,
    req.params.taskId,
    req.body
  );

  if (!result) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } else {
    res.status(StatusCodes.OK).json({ message: `User successfully updated` });
  }
});

router.route('/:taskId').delete(async (req, res) => {
  if (req.params.taskId === undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: ReasonPhrases.BAD_REQUEST });
  }

  const result = await tasksService.deleteTask(
    req.params.boardId,
    req.params.taskId
  );

  if (!result) {
    res.status(StatusCodes.NOT_FOUND).json({ error: ReasonPhrases.NOT_FOUND });
  } else {
    res
      .status(StatusCodes.NO_CONTENT)
      .json({ message: ReasonPhrases.NO_CONTENT });
  }
});

module.exports = router;
