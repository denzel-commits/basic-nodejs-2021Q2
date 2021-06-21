/**
 * @module Board memory repository
 */

import {getRepository} from "typeorm";
import { Board } from './board.model';

import {Board as BoardEntity} from "../../entity/Board";

// function ensure<Board>(argument: Board | undefined | null, message = 'This value was promised to be there.'): Board {
//   if (argument === undefined || argument === null) {
//     throw new TypeError(message);
//   }

//   return argument;
// }

// const boardsTable: Board[] = [];

/**
 * Returns all available boards
 *
 * @returns {Promise<Board[]>}
 */
const getAll = async ():Promise<Board[]> => {

  const boardRepository = getRepository(BoardEntity); // you can also get it via getConnection().getRepository() or getManager().getRepository()
  const Boards : Board[] = await boardRepository.find();
  
  return Boards;
}

/**
 * Save new board in database
 *
 * @param {Board} board - Board object
 *
 * @returns {Promise<Board>} Returns created board
 */
const create = async (board:Board):Promise<Board> => {
  // const newBoard = new Board(board);
  // boardsTable.push(newBoard);

  // return ensure(boardsTable.find((entry) => entry.id === newBoard.id));

  const boardRepository = getRepository(BoardEntity); 

  const createdBoard = boardRepository.create(board);
  await boardRepository.save(createdBoard);

  return createdBoard;
};

/**
 * Get board from database by id
 *
 * @param {String} id - Board id
 * @returns {Promise<Board>} Board info
 */
const read = async (id:string):Promise<Board | null> => {
  
  // const board = boardsTable.find((entry) => entry.id === id);

  // if (!board) { return null; }
  // return board;

   
  const boardRepository = getRepository(BoardEntity);
  const board = await boardRepository.findOne(id);

  return board ?? null;
}

/**
 * Update board in database
 * @param {String} id - Board id
 * @param {Board} board - Board object to update to
 * @returns {Promise<void>} Returns nothing
 */
const update = async (id:string, board:Board): Promise<void> => {
  // const index = boardsTable.findIndex((entry) => entry.id === id);

  // ensure(boardsTable[index]).title = board.title;
  // ensure(boardsTable[index]).columns = board.columns;

  const boardRepository = getRepository(BoardEntity); 
  await boardRepository.save({...board, id});
};

/**
 * Delete board from database
 * @param {String} id - Board id to delete
 * @returns {Promise<void>} Returns nothing
 */
const remove = async (id:string):Promise<void> => {
  // const index = boardsTable.findIndex((entry) => entry.id === id);
  // boardsTable.splice(index, 1);

  const boardRepository = getRepository(BoardEntity);
  await boardRepository.delete(id);
};

export { getAll, create, read, update, remove };
