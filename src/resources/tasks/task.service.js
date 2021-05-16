const tasksRepo = require('./task.memory.repository');
const Task = require('./task.model');

const getAllByBoardId = (boardId) => tasksRepo.getAllByBoardId(boardId);

const getAllByUserId = (userId) => tasksRepo.getAllByUserId(userId);

const getById = (boardId, taskId) => tasksRepo.read(boardId, taskId);

const createTask = (boardId, task) => {
  const newTask = new Task(task);

  tasksRepo.create(newTask);

  return newTask;
};

const updateTask = async (boardId, taskId, task) => {
  const foundtask = await tasksRepo.read(boardId, taskId);

  if (foundtask === undefined) return false;

  tasksRepo.update(boardId, taskId, task);

  return true;
};

const deleteTask = async (boardId, taskId) => {
  const task = await tasksRepo.read(boardId, taskId);

  if (task === undefined) return false;

  tasksRepo.remove(boardId, taskId);

  return true;
};

module.exports = {
  getAllByBoardId,
  getAllByUserId,
  getById,
  createTask,
  updateTask,
  deleteTask,
};
