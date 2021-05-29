const { v4: uuidv4 } = require('uuid');

class User {
  /**
   * User model constructor
   * @param {Object} User - User
   * @param {string} [User.id=uuidv4()] - The id of the user.
   * @param {string} [User.name='USER'] - The name of the user.
   * @param {string} [User.login='user'] - The login of the user.
   * @param {string} [User.password='P@55w0rd'] - The password of the user.
   */
  constructor({
    id = uuidv4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  } = {}) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * Formats user for response, removing password from output
   * @param {User} user - User object
   * @returns {Object.<{id: string, name: string, login: string}>} Formatted user object
   */
  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
