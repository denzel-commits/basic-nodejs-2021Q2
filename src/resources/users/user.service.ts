/**
 * @module User service
 */

import { getAll as getAllDBUsers, create as createDBUser, read as readDBUser, update as updateDBUser, remove as removeDBUser } from './user.memory.repository.js';
import { getAllByUserId, updateTask } from '../tasks/task.service.js';
import { User } from './user.model.js';
import { Task } from '../tasks/task.model.js';

/**
 * Get all users
 *
 * @returns {Promise<User[]>} All users
 */
const getAll = ():Promise<User[]> => getAllDBUsers();

/**
 * Get user by id
 * @param {String} id - User id
 * @returns {Promise<User>} Returns user object
 */
const getById = (id:string):Promise<User> => readDBUser(id);

/**
 * Create new user with given user info
 * @param {User} user - User info
 * @returns {Promise<User>} Returns created user
 */
const createUser = (user:User):Promise<User> => createDBUser(user);

/**
 * Update user by id
 * @param {String} userId - User id to update
 * @param {User} user - User info to update to
 * @returns {Promise<Boolean>} Returns "true" on success and "false" if user does not exist
 */
const updateUser = async (id:string, user:User):Promise<boolean> => {
  const foundUser = await readDBUser(id);

  if (foundUser === undefined) return false;

  await updateDBUser(id, user);

  return true;
};

/**
 * Delete user by id and set userId = null for all assigned tasks
 * @param {String} userId - User id to delete
 * @returns {Promise<Boolean>} Returns nothing
 */
const deleteUser = async (id: string):Promise<boolean> => {
  const user = await readDBUser(id);

  if (user === undefined) 
  return false;

  await removeDBUser(id);

  const userTasks = await getAllByUserId(id);

  userTasks.forEach( (task:Task) => {
    const curTask = task;
    curTask.userId = null;
    void updateTask(task.boardId, task.id, curTask);

  });

  return true;
};

export { getAll, getById, createUser, updateUser, deleteUser };
