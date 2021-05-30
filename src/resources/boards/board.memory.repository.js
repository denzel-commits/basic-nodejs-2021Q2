/**
 * @module Board memory repository
 */
import Board from './board.model';

const boardsTable = [];

/**
 * Returns all available boards
 *
 * @returns {Promise<Board[]>}
 */
const getAll = async () => boardsTable;

/**
 * Save new board in database
 *
 * @param {Board} board - Board object
 *
 * @returns {Promise<Board>} Returns created board
 */
const create = async (board) => {
  const newBoard = new Board(board);
  boardsTable.push(newBoard);

  return boardsTable.find((entry) => entry.id === newBoard.id);
};

/**
 * Get board from database by id
 *
 * @param {String} id - Board id
 * @returns {Promise<Board>} Board info
 */
const read = async (id) => boardsTable.find((entry) => entry.id === id);

/**
 * Update board in database
 * @param {String} id - Board id
 * @param {Board} board - Board object to update to
 * @returns {Promise<void>} Returns nothing
 */
const update = async (id, board) => {
  const index = boardsTable.findIndex((entry) => entry.id === id);

  boardsTable[index].title = board.title;
  boardsTable[index].columns = board.columns;
};

/**
 * Delete board from database
 * @param {String} id - Board id to delete
 * @returns {Promise<void>} Returns nothing
 */
const remove = async (id) => {
  const index = boardsTable.findIndex((entry) => entry.id === id);
  boardsTable.splice(index, 1);

  return true;
};

export { getAll, create, read, update, remove };
