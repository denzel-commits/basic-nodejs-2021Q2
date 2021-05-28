const usersTable = [];

/**
 * Returns all available users {Promise.<Array.<{id: String, name: String, login: String, password: String}>>}
 *
 * @returns {Promise<User[]>}
 */
const getAll = async () => usersTable;

/**
 * Add new user in database
 * @typedef {Object} User
 * @property {string} id Unique user's id generated via 'uuid'
 * @property {string} name User's name
 * @property {string} login User's login
 * @property {string} password User's password
 *
 * @returns {Promise<Number>} Number of records in the database
 */
const create = async (user) => usersTable.push(user);

/**
 * Selects a user data from database by user id
 * @param {Number} id User id
 * @returns {Promise<User>} Found user
 */
const read = async (id) => usersTable.find((entry) => entry.id === id);

/**
 * Update user data in database
 * @param {Number} id User id
 * @param {Object} user User object
 * @returns {Promise<void>}
 */
const update = async (id, user) => {
  const index = usersTable.findIndex((entry) => entry.id === id);

  usersTable[index].name = user.name;
  usersTable[index].login = user.login;
  usersTable[index].password = user.password;
};

/**
 * Delete user from database
 * @param {Number} id User id
 * @returns {Promise<void>}
 */
const remove = async (id) => {
  const index = usersTable.findIndex((entry) => entry.id === id);
  usersTable.splice(index, 1);
};

module.exports = { getAll, create, read, update, remove };
