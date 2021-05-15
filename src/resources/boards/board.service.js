const boardsRepo = require('./board.memory.repository');
const validate = require('../validation.js');

const getAll = () => boardsRepo.getAll();

const getById = async (id) => {
  if (id !== undefined) {
    const board = await boardsRepo.read(id);

    if (board === undefined) {
      return { code: 'error', status: 404, message: 'board not found' };
    }
    return { code: 'success', status: 200, board };
  }
  return { code: 'error', message: 'Id is undefined' };
};

const createBoard = (board) => {
  if (Object.entries(board).length === 0) {
    return {
      code: 'error',
      status: 400,
      message: 'Bad request, accepted empty object.',
    };
  }
  if (!validate.objFields(board, ['title', 'columns'])) {
    return {
      code: 'error',
      status: 400,
      message: 'Bad request, one or more required board fields are missed.',
    };
  }

  boardsRepo.create(board);

  return { code: 'success', status: 201, board };
};

const updateBoard = async (id, board) => {
  if (id !== undefined) {
    const foundboard = await boardsRepo.read(id);

    if (foundboard !== undefined) {
      if (!validate.objFields(board, ['title', 'columns'])) {
        return {
          code: 'error',
          status: 400,
          message: 'Bad request, one or more required board fields are missed.',
        };
      }

      boardsRepo.update(id, board);

      return {
        code: 'success',
        status: 200,
        message: `board with ID: ${id} successfully updated`,
      };
    }
    return {
      code: 'error',
      status: 404,
      message: `board with ID: ${id} not found`,
    };
  }
  return { code: 'error', status: 400, message: 'Id is undefined' };
};

const deleteBoard = async (id) => {
  if (id !== undefined) {
    const board = await boardsRepo.read(id);

    if (board !== undefined) {
      boardsRepo.remove(id);

      return {
        code: 'success',
        status: 204,
        message: `board with ID: ${id} successfully deleted`,
      };
    }
    return {
      code: 'error',
      status: 404,
      message: `board with ID: ${id} not found`,
    };
  }
  return { code: 'error', status: 400, message: 'Id is undefined' };
};

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
