"use strict";
/**
 * @module User service
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getById = exports.getAll = void 0;
const user_memory_repository_1 = require("./user.memory.repository");
const task_service_1 = require("../tasks/task.service");
/**
 * Get all users
 *
 * @returns {Promise<User[]>} All users
 */
const getAll = () => user_memory_repository_1.getAll();
exports.getAll = getAll;
/**
 * Get user by id
 * @param {String} id - User id
 * @returns {Promise<User>} Returns user object
 */
const getById = (id) => user_memory_repository_1.read(id);
exports.getById = getById;
/**
 * Create new user with given user info
 * @param {User} user - User info
 * @returns {Promise<User>} Returns created user
 */
const createUser = (user) => user_memory_repository_1.create(user);
exports.createUser = createUser;
/**
 * Update user by id
 * @param {String} userId - User id to update
 * @param {User} user - User info to update to
 * @returns {Promise<Boolean>} Returns "true" on success and "false" if user does not exist
 */
const updateUser = async (id, user) => {
    const foundUser = await user_memory_repository_1.read(id);
    if (foundUser === undefined)
        return false;
    await user_memory_repository_1.update(id, user);
    return true;
};
exports.updateUser = updateUser;
/**
 * Delete user by id and set userId = null for all assigned tasks
 * @param {String} userId - User id to delete
 * @returns {Promise<Boolean>} Returns nothing
 */
const deleteUser = async (id) => {
    const user = await user_memory_repository_1.read(id);
    if (user === undefined)
        return false;
    await user_memory_repository_1.remove(id);
    const userTasks = await task_service_1.getAllByUserId(id);
    userTasks.forEach((task) => {
        const curTask = task;
        curTask.userId = null;
        void task_service_1.updateTask(task.boardId, task.id, curTask);
    });
    return true;
};
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.service.js.map