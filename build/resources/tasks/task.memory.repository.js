"use strict";
/**
 * @module Task memory repository
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.read = exports.create = exports.getAllByUserId = exports.getAllByBoardId = void 0;
const task_model_1 = require("./task.model");
function ensure(argument, message = 'This value was promised to be there.') {
    if (argument === undefined || argument === null) {
        throw new TypeError(message);
    }
    return argument;
}
const tasksTable = [];
/**
 * Get all tasks by board id
 * @param {String} boardId - Board id
 * @returns {Promise<Task[]>} All tasks for given board id
 */
const getAllByBoardId = async (boardId) => tasksTable.filter((entry) => entry.boardId === boardId);
exports.getAllByBoardId = getAllByBoardId;
/**
 * Get all tasks by user id
 * @param {String} userId - User id
 * @returns {Promise<Task[]>} All tasks assigned to user id
 */
const getAllByUserId = async (userId) => tasksTable.filter((entry) => entry.userId === userId);
exports.getAllByUserId = getAllByUserId;
/**
 * Save new task in database
 * @param {String} boardId - Board id for new task
 * @param {Task} task - Task object
 *
 * @returns {Promise<Task>} Created task
 */
const create = async (boardId, task) => {
    const newTask = new task_model_1.Task(boardId, task);
    tasksTable.push(newTask);
    return ensure(tasksTable.find((entry) => entry.id === newTask.id));
};
exports.create = create;
/**
 * Get task from database by board id and by task id
 *
 * @param {String} id - Board id
 * @param {String} id - Task id
 * @returns {Promise<Task | null>} Task object
 */
const read = async (boardId, taskId) => {
    const task = tasksTable.find((entry) => entry.id === taskId && entry.boardId === boardId);
    return task ?? null;
};
exports.read = read;
/**
 * Update task in database
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @param {Object} task - Task object to update to
 * @returns {Promise<void>} Returns nothing
 */
const update = async (boardId, taskId, task) => {
    const index = tasksTable.findIndex((entry) => entry.id === taskId && entry.boardId === boardId);
    ensure(tasksTable[index]).title = task.title;
    ensure(tasksTable[index]).order = task.order;
    ensure(tasksTable[index]).description = task.description;
    ensure(tasksTable[index]).userId = task.userId;
    ensure(tasksTable[index]).boardId = task.boardId;
    ensure(tasksTable[index]).columnId = task.columnId;
};
exports.update = update;
/**
 * Delete task from database
 * @param {String} boardId - Board id of the task
 * @param {String} taskId - Task id to delete
 * @returns {Promise<void>} - Returns nothing
 */
const remove = async (boardId, taskId) => {
    const index = tasksTable.findIndex((entry) => entry.id === taskId && entry.boardId === boardId);
    tasksTable.splice(index, 1);
};
exports.remove = remove;
//# sourceMappingURL=task.memory.repository.js.map