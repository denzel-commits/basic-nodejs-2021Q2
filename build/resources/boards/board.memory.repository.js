"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.read = exports.create = exports.getAll = void 0;
/**
 * @module Board memory repository
 */
const board_model_1 = require("./board.model");
function ensure(argument, message = 'This value was promised to be there.') {
    if (argument === undefined || argument === null) {
        throw new TypeError(message);
    }
    return argument;
}
const boardsTable = [];
/**
 * Returns all available boards
 *
 * @returns {Promise<Board[]>}
 */
const getAll = async () => boardsTable;
exports.getAll = getAll;
/**
 * Save new board in database
 *
 * @param {Board} board - Board object
 *
 * @returns {Promise<Board>} Returns created board
 */
const create = async (board) => {
    const newBoard = new board_model_1.Board(board);
    boardsTable.push(newBoard);
    return ensure(boardsTable.find((entry) => entry.id === newBoard.id));
};
exports.create = create;
/**
 * Get board from database by id
 *
 * @param {String} id - Board id
 * @returns {Promise<Board>} Board info
 */
const read = async (id) => {
    const board = boardsTable.find((entry) => entry.id === id);
    if (!board) {
        return null;
    }
    return board;
};
exports.read = read;
/**
 * Update board in database
 * @param {String} id - Board id
 * @param {Board} board - Board object to update to
 * @returns {Promise<void>} Returns nothing
 */
const update = async (id, board) => {
    const index = boardsTable.findIndex((entry) => entry.id === id);
    ensure(boardsTable[index]).title = board.title;
    ensure(boardsTable[index]).columns = board.columns;
};
exports.update = update;
/**
 * Delete board from database
 * @param {String} id - Board id to delete
 * @returns {Promise<void>} Returns nothing
 */
const remove = async (id) => {
    const index = boardsTable.findIndex((entry) => entry.id === id);
    boardsTable.splice(index, 1);
};
exports.remove = remove;
//# sourceMappingURL=board.memory.repository.js.map