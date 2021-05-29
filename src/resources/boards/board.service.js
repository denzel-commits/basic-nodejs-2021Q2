/**
 * @module Board service
 */

const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

/**
 * Get all boards
 *
 * @returns {Promise<Board[]>} All boards
 */
const getAll = () => boardsRepo.getAll();

/**
 * Get board by id
 * @param {String} id - Board id
 * @returns {Promise<Board>} Returns boad object
 */
const getById = (id) => boardsRepo.read(id);

/**
 * Create new board with given board info
 * @param {Board} user - Board info
 * @returns {Promise<Board>} Returns created board
 */
const createBoard = (board) => boardsRepo.create(board);

/**
 * Update board by id
 * @param {String} id - Board id to update
 * @param {Board} board - Board info to update to
 * @returns {Promise<Boolean>} Returns "true" on success and "false" if board does not exist
 */
const updateBoard = async (id, board) => {
  const foundboard = await boardsRepo.read(id);

  if (foundboard === undefined) return false;

  boardsRepo.update(id, board);

  return true;
};

/**
 * Delete board by id and delete all its tasks
 * @param {String} id - Board id to delete
 * @returns {Promise<void>} Returns nothing
 */
const deleteBoard = async (id) => {
  const board = await boardsRepo.read(id);

  if (board === undefined) return false;

  boardsRepo.remove(id);

  // get all tasks on board
  const boardTasks = await tasksService.getAll(id);

  // remove all tasks on board
  boardTasks.forEach((task) => {
    tasksService.deleteTask(task.boardId, task.id);
  });

  return true;
};

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
