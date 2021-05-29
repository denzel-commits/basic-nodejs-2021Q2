/**
 * @module Task service
 */

const tasksRepo = require('./task.memory.repository');

/**
 * Get all tasks from board by board id
 *
 * @returns {Promise<Task[]>} Returns board's tasks
 */
const getAll = (boardId) => tasksRepo.getAllByBoardId(boardId);

/**
 * Get tasks by assignee id
 * @param {String} userId - User id
 * @returns {Promise<Task[]>} Returns user's tasks
 */
const getAllByUserId = (userId) => tasksRepo.getAllByUserId(userId);

/**
 * Get task by board id and task id
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @returns {Promise<Task>} Returns task object
 */
const getById = (boardId, taskId) => tasksRepo.read(boardId, taskId);

/**
 * Create new task on the board
 * @param {String} boardId - Board id
 * @param {Task} task - Task details
 * @returns {Promise<Task>} Returns created task
 */
const createTask = (boardId, task) => tasksRepo.create(boardId, task);

/**
 * Update task by board id and task id
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @param {Task} task - Task details to update
 * @returns {Promise<Boolean>} Returns "true" on success and "false" if task does not exist
 */
const updateTask = async (boardId, taskId, task) => {
  const foundtask = await tasksRepo.read(boardId, taskId);

  if (foundtask === undefined) return false;

  tasksRepo.update(boardId, taskId, task);

  return true;
};

/**
 * Delete task by board id and task id
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @returns {Promise<void>} Returns nothing
 */
const deleteTask = async (boardId, taskId) => {
  const task = await tasksRepo.read(boardId, taskId);

  if (task === undefined) return false;

  tasksRepo.remove(boardId, taskId);

  return true;
};

module.exports = {
  getAll,
  getAllByUserId,
  getById,
  createTask,
  updateTask,
  deleteTask,
};
