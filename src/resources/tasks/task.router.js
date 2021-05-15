const router = require('express').Router({ mergeParams: true });
const Task = require('./task.model');
const tasksService = require('./task.service');

router.route('/').get(async (req, res) => {
  const result = await tasksService.getAllByBoardId(req.params.boardId);

  if (result.code === 'error') {
    res.status(result.status).json({ error: result.message });
  } else {
    res.status(result.status).json(result.tasks);
  }
});

router.route('/:taskId').get(async (req, res) => {
  const result = await tasksService.getById(
    req.params.boardId,
    req.params.taskId
  );

  if (result.code === 'error') {
    res.status(result.status).json({ error: result.message });
  } else {
    res.status(result.status).json(Task.toResponse(result.task));
  }
});

router.route('/').post(async (req, res) => {
  const newTask = new Task(req.body);

  const result = await tasksService.createTask(req.params.boardId, newTask);

  if (result.code === 'error') {
    res.status(result.status).json({ error: result.message });
  } else {
    res.status(result.status).json(result.task);
  }
});

router.route('/:taskId').put(async (req, res) => {
  const result = await tasksService.updateTask(
    req.params.boardId,
    req.params.taskId,
    req.body
  );

  if (result.code === 'error') {
    res.status(result.status).json({ error: result.message });
  } else {
    res.status(result.status).json({ message: result.message });
  }
});

router.route('/:taskId').delete(async (req, res) => {
  const result = await tasksService.deleteTask(
    req.params.boardId,
    req.params.taskId
  );

  if (result.code === 'error') {
    res.status(result.status).json({ error: result.message });
  } else {
    res.status(result.status).json({ message: result.message });
  }
});

module.exports = router;
