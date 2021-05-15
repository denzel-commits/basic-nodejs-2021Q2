const tasksRepo = require('./task.memory.repository');
const validate = require('../validation.js');

const getAllByBoardId = async (boardId) => {
  if (boardId !== undefined) {
    const tasks = await tasksRepo.getAllByBoardId(boardId);

    if (tasks === undefined) {
      return { code: 'error', status: 404, message: 'tasks not found' };
    }
    return { code: 'success', status: 200, tasks };
  }
  return { code: 'error', message: 'BoardId is undefined' };
};

const getById = async (boardId, taskId) => {
  if (boardId !== undefined && taskId !== undefined) {
    const task = await tasksRepo.read(boardId, taskId);

    if (task === undefined) {
      return { code: 'error', status: 404, message: 'task not found' };
    }
    return { code: 'success', status: 200, task };
  }
  return { code: 'error', message: 'Id is undefined' };
};

const createTask = (boardId, task) => {
  if (Object.entries(task).length === 0) {
    return {
      code: 'error',
      status: 400,
      message: 'Bad request, accepted empty object.',
    };
  }
  if (
    !validate.objFields(task, [
      'title',
      'order',
      'description',
      'userId',
      'boardId',
      'columnId',
    ])
  ) {
    return {
      code: 'error',
      status: 400,
      message: 'Bad request, one or more required task fields are missed.',
    };
  }

  tasksRepo.create(task);

  return { code: 'success', status: 201, task };
};

const updateTask = async (boardId, taskId, task) => {
  if (taskId !== undefined) {
    const foundtask = await tasksRepo.read(boardId, taskId);

    if (foundtask !== undefined) {
      if (
        !validate.objFields(task, [
          'title',
          'order',
          'description',
          'userId',
          'boardId',
          'columnId',
        ])
      ) {
        return {
          code: 'error',
          status: 400,
          message: 'Bad request, one or more required task fields are missed.',
        };
      }

      tasksRepo.update(boardId, taskId, task);

      return {
        code: 'success',
        status: 200,
        message: `task with ID: ${taskId} successfully updated`,
      };
    }
    return {
      code: 'error',
      status: 404,
      message: `task with ID: ${taskId} not found`,
    };
  }
  return { code: 'error', status: 400, message: 'Id is undefined' };
};

const deleteTask = async (boardId, taskId) => {
  if (taskId !== undefined) {
    const task = await tasksRepo.read(boardId, taskId);

    if (task !== undefined) {
      tasksRepo.remove(boardId, taskId);

      return {
        code: 'success',
        status: 204,
        message: `task with ID: ${taskId} successfully deleted`,
      };
    }
    return {
      code: 'error',
      status: 404,
      message: `task with ID: ${taskId} not found`,
    };
  }
  return { code: 'error', status: 400, message: 'Id is undefined' };
};

module.exports = {
  getAllByBoardId,
  getById,
  createTask,
  updateTask,
  deleteTask,
};
