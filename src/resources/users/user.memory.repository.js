/**
 * @module User memory repository
 */

import { User } from './user.model';

const usersTable = [];

/**
 * Returns all available users
 *
 * @returns {Promise<User[]>} - All users
 */
const getAll = async () => usersTable;

/**
 * Save new user in database
 * @param {User} user - User info
 *
 * @returns {Promise<User>} Returns created user
 */
const create = async (user) => {
  const newUser = new User(user);
  usersTable.push(newUser);
  return usersTable.find((entry) => entry.id === newUser.id);
};

/**
 * Get user data from database by user id
 * @param {String} id - User id
 * @returns {Promise<User>} User info
 */
const read = async (id) => usersTable.find((entry) => entry.id === id);

/**
 * Update user data in database
 * @param {String} id - User id
 * @param {Object} user - User object to update to
 * @returns {Promise<void>} Returns nothing
 */
const update = async (id, user) => {
  const index = usersTable.findIndex((entry) => entry.id === id);

  usersTable[index].name = user.name;
  usersTable[index].login = user.login;
  usersTable[index].password = user.password;
};

/**
 * Delete user from database
 * @param {String} id - User id to delete
 * @returns {Promise<void>} Returns nothing
 */
const remove = async (id) => {
  const index = usersTable.findIndex((entry) => entry.id === id);
  usersTable.splice(index, 1);
};

export { getAll, create, read, update, remove };
