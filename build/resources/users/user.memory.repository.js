"use strict";
/**
 * @module User memory repository
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.read = exports.create = exports.getAll = void 0;
const user_model_1 = require("./user.model");
const usersTable = [];
function ensure(argument, message = 'This value was promised to be there.') {
    if (argument === undefined || argument === null) {
        throw new TypeError(message);
    }
    return argument;
}
/**
 * Returns all available users
 *
 * @returns {Promise<User[]>} - All users
 */
const getAll = async () => usersTable;
exports.getAll = getAll;
/**
 * Save new user in database
 * @param {User} user - User info
 *
 * @returns {Promise<User>} Returns created user
 */
const create = async (user) => {
    const newUser = new user_model_1.User(user);
    usersTable.push(newUser);
    return ensure(usersTable.find((entry) => entry.id === newUser.id));
};
exports.create = create;
/**
 * Get user data from database by user id
 * @param {String} id - User id
 * @returns {Promise<User | null>} User info
 */
const read = async (id) => {
    const user = usersTable.find((entry) => entry.id === id);
    return user ?? null;
};
exports.read = read;
/**
 * Update user data in database
 * @param {String} id - User id
 * @param {Object} user - User object to update to
 * @returns {Promise<void>} Returns nothing
 */
const update = async (id, user) => {
    const index = ensure(usersTable.findIndex((entry) => entry.id === id));
    ensure(usersTable[index]).name = user.name;
    ensure(usersTable[index]).login = user.login;
    ensure(usersTable[index]).password = user.password;
};
exports.update = update;
/**
 * Delete user from database
 * @param {String} id - User id to delete
 * @returns {Promise<void>} Returns nothing
 */
const remove = async (id) => {
    const index = usersTable.findIndex((entry) => entry.id === id);
    usersTable.splice(index, 1);
};
exports.remove = remove;
//# sourceMappingURL=user.memory.repository.js.map