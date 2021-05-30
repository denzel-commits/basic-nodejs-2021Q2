/**
 * @module User memory repository
 */

import { User } from './user.model.js';

const usersTable: User[] = [];

function ensure<User>(argument: User | undefined | null, message = 'This value was promised to be there.'): User {
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
const getAll = async (): Promise<User[]> => usersTable;

/**
 * Save new user in database
 * @param {User} user - User info
 *
 * @returns {Promise<User>} Returns created user
 */
const create = async (user: User): Promise<User> => {
  const newUser = new User(user);
  usersTable.push(newUser);

  return ensure(usersTable.find((entry) => entry.id === newUser.id));
};

/**
 * Get user data from database by user id
 * @param {String} id - User id
 * @returns {Promise<User>} User info
 */
const read = async (id:string):Promise<User> => ensure(usersTable.find((entry) => entry.id === id));

/**
 * Update user data in database
 * @param {String} id - User id
 * @param {Object} user - User object to update to
 * @returns {Promise<void>} Returns nothing
 */
const update = async (id: string, user: User): Promise<void> => {
  const index : number = ensure(usersTable.findIndex((entry) => entry.id === id));

  ensure(usersTable[index]).name = user.name;
  ensure(usersTable[index]).login = user.login;
  ensure(usersTable[index]).password = user.password;
};

/**
 * Delete user from database
 * @param {String} id - User id to delete
 * @returns {Promise<void>} Returns nothing
 */
const remove = async (id: string):Promise<void> => {
  const index = usersTable.findIndex((entry) => entry.id === id);
  usersTable.splice(index, 1);
};

export { getAll, create, read, update, remove };
