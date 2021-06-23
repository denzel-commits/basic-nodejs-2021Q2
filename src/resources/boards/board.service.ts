/**
 * @module Board service
 */

import { getAll as getAllBoards, create, read, update, remove} from './board.memory.repository';
import { Board } from './board.model';

/**
 * Get all boards
 *
 * @returns {Promise<Board[]>} All boards
 */
const getAll = ():Promise<Board[]> => getAllBoards();

/**
 * Get board by id
 * @param {String} id - Board id
 * @returns {Promise<Board>} Returns boad object
 */
const getById = (id:string):Promise<Board | null> => read(id);

/**
 * Create new board with given board info
 * @param {Board} user - Board info
 * @returns {Promise<Board>} Returns created board
 */
const createBoard = (board:Board):Promise<Board> => create(board);

/**
 * Update board by id
 * @param {String} id - Board id to update
 * @param {Board} board - Board info to update to
 * @returns {Promise<Boolean>} Returns "true" on success and "false" if board does not exist
 */
const updateBoard = async (id:string, board:Board):Promise<boolean> => {
  const foundboard = await read(id);

  if (foundboard === null) return false;

  await update(id, board);

  return true;
};

/**
 * Delete board by id and delete all its tasks
 * @param {String} id - Board id to delete
 * @returns {Promise<Boolean>} Returns true on success
 */
const deleteBoard = async (id:string): Promise<boolean> => {
  const board = await read(id);

  if (board === null) return false;

  await remove(id);

  return true;
};

export { getAll, getById, createBoard, updateBoard, deleteBoard };
