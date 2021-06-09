"use strict";
/**
 * @module Task service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getById = exports.getAllByUserId = exports.getAll = void 0;
const task_memory_repository_1 = require("./task.memory.repository");
/**
 * Get all tasks from board by board id
 *
 * @returns {Promise<Task[]>} Returns board's tasks
 */
const getAll = (boardId) => task_memory_repository_1.getAllByBoardId(boardId);
exports.getAll = getAll;
/**
 * Get tasks by assignee id
 * @param {String} userId - User id
 * @returns {Promise<Task[]>} Returns user's tasks
 */
const getAllByUserId = (userId) => task_memory_repository_1.getAllByUserId(userId);
exports.getAllByUserId = getAllByUserId;
/**
 * Get task by board id and task id
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @returns {Promise<Task | null>} Returns task object
 */
const getById = (boardId, taskId) => task_memory_repository_1.read(boardId, taskId);
exports.getById = getById;
/**
 * Create new task on the board
 * @param {String} boardId - Board id
 * @param {Task} task - Task details
 * @returns {Promise<Task>} Returns created task
 */
const createTask = (boardId, task) => task_memory_repository_1.create(boardId, task);
exports.createTask = createTask;
/**
 * Update task by board id and task id
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @param {Task} task - Task details to update
 * @returns {Promise<Boolean>} Returns "true" on success and "false" if task does not exist
 */
const updateTask = async (boardId, taskId, task) => {
    const foundtask = await task_memory_repository_1.read(boardId, taskId);
    if (foundtask === undefined)
        return false;
    await task_memory_repository_1.update(boardId, taskId, task);
    return true;
};
exports.updateTask = updateTask;
/**
 * Delete task by board id and task id
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @returns {Promise<Boolean>} Returns nothing
 */
const deleteTask = async (boardId, taskId) => {
    const task = await task_memory_repository_1.read(boardId, taskId);
    if (task === undefined)
        return false;
    try {
        await task_memory_repository_1.remove(boardId, taskId);
    }
    catch (err) {
        console.log(err); // TypeError: failed to fetch
    }
    return true;
};
exports.deleteTask = deleteTask;
//# sourceMappingURL=task.service.js.map