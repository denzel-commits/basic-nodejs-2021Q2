/**
 * @module Task memory repository
 */

const Task = require('./task.model');

const tasksTable = [];

/**
 * Get all tasks by board id
 * @param {String} boardId - Board id
 * @returns {Promise<Task[]>} All tasks for given board id
 */
const getAllByBoardId = async (boardId) =>
  tasksTable.filter((entry) => entry.boardId === boardId);

/**
 * Get all tasks by user id
 * @param {String} userId - User id
 * @returns {Promise<Task[]>} All tasks assigned to user id
 */
const getAllByUserId = async (userId) =>
  tasksTable.filter((entry) => entry.userId === userId);

/**
 * Save new task in database
 * @param {String} boardId - Board id for new task
 * @param {Task} task - Task object
 *
 * @returns {Promise<Task>} Created task
 */
const create = async (boardId, task) => {
  const newTask = new Task(boardId, task);
  tasksTable.push(newTask);

  return tasksTable.find((entry) => entry.id === newTask.id);
};

/**
 * Get task from database by board id and by task id
 *
 * @param {String} id - Board id
 * @param {String} id - Task id
 * @returns {Promise<Task>} Task object
 */
const read = async (boardId, taskId) =>
  tasksTable.find((entry) => entry.id === taskId && entry.boardId === boardId);

/**
 * Update task in database
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @param {Object} task - Task object to update to
 * @returns {Promise<void>} Returns nothing
 */
const update = async (boardId, taskId, task) => {
  const index = tasksTable.findIndex(
    (entry) => entry.id === taskId && entry.boardId === boardId
  );

  tasksTable[index].title = task.title;
  tasksTable[index].order = task.order;
  tasksTable[index].description = task.description;
  tasksTable[index].userId = task.userId;
  tasksTable[index].boardId = task.boardId;
  tasksTable[index].columnId = task.columnId;
};

/**
 * Delete task from database
 * @param {String} boardId - Board id of the task
 * @param {String} taskId - Task id to delete
 * @returns {Promise<void>} - Returns nothing
 */
const remove = async (boardId, taskId) => {
  const index = tasksTable.findIndex(
    (entry) => entry.id === taskId && entry.boardId === boardId
  );
  tasksTable.splice(index, 1);
};

module.exports = {
  getAllByBoardId,
  getAllByUserId,
  create,
  read,
  update,
  remove,
};
