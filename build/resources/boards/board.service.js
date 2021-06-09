"use strict";
/**
 * @module Board service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBoard = exports.updateBoard = exports.createBoard = exports.getById = exports.getAll = void 0;
const board_memory_repository_1 = require("./board.memory.repository");
const task_service_1 = require("../tasks/task.service");
/**
 * Get all boards
 *
 * @returns {Promise<Board[]>} All boards
 */
const getAll = () => board_memory_repository_1.getAll();
exports.getAll = getAll;
/**
 * Get board by id
 * @param {String} id - Board id
 * @returns {Promise<Board>} Returns boad object
 */
const getById = (id) => board_memory_repository_1.read(id);
exports.getById = getById;
/**
 * Create new board with given board info
 * @param {Board} user - Board info
 * @returns {Promise<Board>} Returns created board
 */
const createBoard = (board) => board_memory_repository_1.create(board);
exports.createBoard = createBoard;
/**
 * Update board by id
 * @param {String} id - Board id to update
 * @param {Board} board - Board info to update to
 * @returns {Promise<Boolean>} Returns "true" on success and "false" if board does not exist
 */
const updateBoard = async (id, board) => {
    const foundboard = await board_memory_repository_1.read(id);
    if (foundboard === undefined)
        return false;
    await board_memory_repository_1.update(id, board);
    return true;
};
exports.updateBoard = updateBoard;
/**
 * Delete board by id and delete all its tasks
 * @param {String} id - Board id to delete
 * @returns {Promise<Boolean>} Returns true on success
 */
const deleteBoard = async (id) => {
    const board = await board_memory_repository_1.read(id);
    if (board === undefined)
        return false;
    await board_memory_repository_1.remove(id);
    // get all tasks on board
    const boardTasks = await task_service_1.getAll(id);
    // remove all tasks on board
    boardTasks.forEach((task) => {
        void task_service_1.deleteTask(task.boardId, task.id);
    });
    return true;
};
exports.deleteBoard = deleteBoard;
//# sourceMappingURL=board.service.js.map