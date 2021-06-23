/**
 * @module Task service
 */

import { getAllByBoardId, getAllByUserId as getAllDBByUserId, create, read, update, remove } from './task.memory.repository';
import { Task } from './task.model';

/**
 * Get all tasks from board by board id
 *
 * @returns {Promise<Task[]>} Returns board's tasks
 */
const getAll = (boardId:string):Promise<Task[]> => getAllByBoardId(boardId);

/**
 * Get tasks by assignee id
 * @param {String} userId - User id
 * @returns {Promise<Task[]>} Returns user's tasks
 */
const getAllByUserId = (userId:string):Promise<Task[]> => getAllDBByUserId(userId);

/**
 * Get task by board id and task id
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @returns {Promise<Task | null>} Returns task object
 */
const getById = (boardId:string, taskId:string):Promise<Task | null> => read(boardId, taskId);

/**
 * Create new task on the board
 * @param {String} boardId - Board id
 * @param {Task} task - Task details
 * @returns {Promise<Task>} Returns created task
 */
const createTask = (boardId:string, task:Task):Promise<Task> => create(boardId, task);

/**
 * Update task by board id and task id
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @param {Task} task - Task details to update
 * @returns {Promise<Boolean>} Returns "true" on success and "false" if task does not exist
 */
const updateTask = async (boardId:string, taskId:string, task:Task):Promise<boolean> => {
  const foundtask = await read(boardId, taskId);

  if (foundtask === null) return false;

  await update(boardId, taskId, task);

  return true;
};

/**
 * Delete task by board id and task id
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @returns {Promise<Boolean>} Returns nothing
 */
const deleteTask = async (boardId:string, taskId:string):Promise<boolean> => {
  const task = await read(boardId, taskId);

  if (task === null) return false;

  

  try {
    await remove(boardId, taskId);
  } catch(err) {
    console.log(err); // TypeError: failed to fetch
  }

  return true;
};

export { getAll, getAllByUserId, getById, createTask, updateTask, deleteTask };
