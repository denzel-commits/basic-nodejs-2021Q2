"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const uuid_1 = require("uuid");
class User {
    /**
     * User model constructor
     * @param {Object} User - User
     * @param {string} [User.id=uuidv4()] - The id of the user.
     * @param {string} [User.name='USER'] - The name of the user.
     * @param {string} [User.login='user'] - The login of the user.
     * @param {string} [User.password='P@55w0rd'] - The password of the user.
     */
    constructor({ id = uuid_1.v4(), name = 'USER', login = 'user', password = 'P@55w0rd', } = {}) {
        this.id = id;
        this.name = name;
        this.login = login;
        this.password = password;
    }
}
exports.User = User;
/**
 * Formats user for response, removing password from output
 * @param {User} user - User object
 * @returns {Object.<{id: string, name: string, login: string}>} Formatted user object
 * this: void
 */
User.toResponse = (user) => {
    const { id, name, login } = user;
    return { id, name, login };
};
//# sourceMappingURL=user.model.js.map