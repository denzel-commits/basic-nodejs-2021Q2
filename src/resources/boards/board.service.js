const boardsRepo = require('./board.memory.repository');
const Board = require('./board.model');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const getById = (id) => boardsRepo.read(id);

const createBoard = (board) => {
  const newBoard = new Board(board);

  boardsRepo.create(newBoard);

  return newBoard;
};

const updateBoard = async (id, board) => {
  const foundboard = await boardsRepo.read(id);

  if (foundboard === undefined) return false;

  boardsRepo.update(id, board);

  return true;
};

const deleteBoard = async (id) => {
  const board = await boardsRepo.read(id);

  if (board === undefined) return false;

  boardsRepo.remove(id);

  // get all tasks on board
  const boardTasks = await tasksService.getAllByBoardId(id);

  // remove all tasks on board
  boardTasks.forEach((task) => {
    tasksService.deleteTask(task.boardId, task.id);
  });

  return true;
};

module.exports = { getAll, getById, createBoard, updateBoard, deleteBoard };
