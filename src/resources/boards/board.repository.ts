/**
 * @module Board memory repository
 */

import {getRepository} from "typeorm";
import { Board } from './board.model';

import {Board as BoardEntity} from "../../entity/Board";

/**
 * Returns all available boards
 *
 * @returns {Promise<Board[]>}
 */
const getAll = async ():Promise<Board[]> => {

  const boardRepository = getRepository(BoardEntity);
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

  const boardRepository = getRepository(BoardEntity); 
  await boardRepository.save({...board, id});
};

/**
 * Delete board from database
 * @param {String} id - Board id to delete
 * @returns {Promise<void>} Returns nothing
 */
const remove = async (id:string):Promise<void> => {

  const boardRepository = getRepository(BoardEntity);
  await boardRepository.delete(id);
};

export { getAll, create, read, update, remove };
