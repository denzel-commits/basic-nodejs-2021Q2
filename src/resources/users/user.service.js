/**
 * @module User service
 */

import usersRepo from './user.memory.repository';
import tasksService from '../tasks/task.service';

/**
 * Get all users
 *
 * @returns {Promise<User[]>} All users
 */
const getAll = () => usersRepo.getAll();

/**
 * Get user by id
 * @param {String} id - User id
 * @returns {Promise<User>} Returns user object
 */
const getById = (id) => usersRepo.read(id);

/**
 * Create new user with given user info
 * @param {User} user - User info
 * @returns {Promise<User>} Returns created user
 */
const createUser = (user) => usersRepo.create(user);

/**
 * Update user by id
 * @param {String} userId - User id to update
 * @param {User} user - User info to update to
 * @returns {Promise<Boolean>} Returns "true" on success and "false" if user does not exist
 */
const updateUser = async (id, user) => {
  const foundUser = await usersRepo.read(id);

  if (foundUser === undefined) return false;

  usersRepo.update(id, user);

  return true;
};

/**
 * Delete user by id and set userId = null for all assigned tasks
 * @param {String} userId - User id to delete
 * @returns {Promise<void>} Returns nothing
 */
const deleteUser = async (id) => {
  const user = await usersRepo.read(id);

  if (user === undefined) return false;

  usersRepo.remove(id);

  const userTasks = await tasksService.getAllByUserId(id);

  userTasks.forEach((task) => {
    const curTask = task;
    curTask.userId = null;
    tasksService.updateTask(task.boardId, task.id, curTask);
  });

  return true;
};

export { getAll, getById, createUser, updateUser, deleteUser };
