/**
 * @module Board memory repository
 */
import { Board } from './board.model';

function ensure<Board>(argument: Board | undefined | null, message = 'This value was promised to be there.'): Board {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

const boardsTable: Board[] = [];

/**
 * Returns all available boards
 *
 * @returns {Promise<Board[]>}
 */
const getAll = async ():Promise<Board[]> => boardsTable;

/**
 * Save new board in database
 *
 * @param {Board} board - Board object
 *
 * @returns {Promise<Board>} Returns created board
 */
const create = async (board:Board):Promise<Board> => {
  const newBoard = new Board(board);
  boardsTable.push(newBoard);

  return ensure(boardsTable.find((entry) => entry.id === newBoard.id));
};

/**
 * Get board from database by id
 *
 * @param {String} id - Board id
 * @returns {Promise<Board>} Board info
 */
const read = async (id:string):Promise<Board> => {
  
  const board = boardsTable.find((entry) => entry.id === id);

  if (!board) { throw new Error('NOT_FOUND') }
  else return board;
}

/**
 * Update board in database
 * @param {String} id - Board id
 * @param {Board} board - Board object to update to
 * @returns {Promise<void>} Returns nothing
 */
const update = async (id:string, board:Board): Promise<void> => {
  const index = boardsTable.findIndex((entry) => entry.id === id);

  ensure(boardsTable[index]).title = board.title;
  ensure(boardsTable[index]).columns = board.columns;
};

/**
 * Delete board from database
 * @param {String} id - Board id to delete
 * @returns {Promise<void>} Returns nothing
 */
const remove = async (id:string):Promise<void> => {
  const index = boardsTable.findIndex((entry) => entry.id === id);
  boardsTable.splice(index, 1);
};

export { getAll, create, read, update, remove };
