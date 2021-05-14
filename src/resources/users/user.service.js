const usersRepo = require('./user.memory.repository');
const validate = require('../validation.js');

const getAll = () => usersRepo.getAll();

const getById = async (id) => {
  if (id !== undefined) {
    const user = await usersRepo.read(id);

    if (user === undefined) {
      return { code: 'error', message: 'User not found' };
    }
    return { code: 'success', user };
  }
  return { code: 'error', message: 'Id is undefined' };
};

const createUser = (user) => {
  if (Object.entries(user).length === 0) {
    return { code: 'error', message: 'Bad request, accepted empty object.' };
  }
  if (!validate.objFields(user, ['name', 'login', 'password'])) {
    return {
      code: 'error',
      message: 'Bad request, one or more required user fields are missed.',
    };
  }

  usersRepo.create(user);

  return { code: 'success', user };
};

const updateUser = async (id, user) => {
  if (id !== undefined) {
    const foundUser = await usersRepo.read(id);

    if (foundUser !== undefined) {
      if (!validate.objFields(user, ['name', 'login', 'password'])) {
        return {
          code: 'error',
          message: 'Bad request, one or more required user fields are missed.',
        };
      }

      usersRepo.update(id, user);

      return {
        code: 'success',
        status: 200,
        message: `User with ID: ${id} successfully updated`,
      };
    }
    return {
      code: 'error',
      status: 404,
      message: `User with ID: ${id} not found`,
    };
  }
  return { code: 'error', status: 400, message: 'Id is undefined' };
};

const deleteUser = async (id) => {
  if (id !== undefined) {
    const user = await usersRepo.read(id);

    if (user !== undefined) {
      usersRepo.remove(id);

      return {
        code: 'success',
        status: 204,
        message: `User with ID: ${id} successfully deleted`,
      };
    }
    return {
      code: 'error',
      status: 404,
      message: `User with ID: ${id} not found`,
    };
  }
  return { code: 'error', status: 400, message: 'Id is undefined' };
};

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
