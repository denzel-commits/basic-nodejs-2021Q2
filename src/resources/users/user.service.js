const usersRepo = require('./user.memory.repository');
const tasksRepo = require('../tasks/task.memory.repository');
const User = require('./user.model');

const getAll = () => usersRepo.getAll();

const getById = (id) => usersRepo.read(id);

const createUser = (user) => {
  const newUser = new User(user);

  usersRepo.create(newUser);

  return newUser;
};

const updateUser = async (id, user) => {
  const foundUser = await usersRepo.read(id);

  if (foundUser === undefined) return false;

  usersRepo.update(id, user);

  return true;
};

const deleteUser = async (id) => {
  const user = await usersRepo.read(id);

  if (user === undefined) return false;

  usersRepo.remove(id);
  tasksRepo.removeAssigneeById(id);

  /* const userTasks = await tasksService.getAllByUserId(id);

  userTasks.forEach((task) => {
    task.userId = null;
    tasksService.updateTask(task.boardId, task.id, task);
  }); */

  return true;
};

module.exports = { getAll, getById, createUser, updateUser, deleteUser };
