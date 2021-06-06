/**
 * @module Task memory repository
 */

import { Task } from './task.model';

function ensure<Task>(argument: Task | undefined | null, message = 'This value was promised to be there.'): Task {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

const tasksTable: Task[] = [];

/**
 * Get all tasks by board id
 * @param {String} boardId - Board id
 * @returns {Promise<Task[]>} All tasks for given board id
 */
const getAllByBoardId = async (boardId:string): Promise<Task[]> =>
  tasksTable.filter((entry) => entry.boardId === boardId);

/**
 * Get all tasks by user id
 * @param {String} userId - User id
 * @returns {Promise<Task[]>} All tasks assigned to user id
 */
const getAllByUserId = async (userId:string): Promise<Task[]> =>
  tasksTable.filter((entry) => entry.userId === userId);

/**
 * Save new task in database
 * @param {String} boardId - Board id for new task
 * @param {Task} task - Task object
 *
 * @returns {Promise<Task>} Created task
 */
const create = async (boardId: string, task: Task): Promise<Task> => {

  const newTask = new Task(boardId, task);
  tasksTable.push(newTask);

  return ensure(tasksTable.find((entry) => entry.id === newTask.id));
};

/**
 * Get task from database by board id and by task id
 *
 * @param {String} id - Board id
 * @param {String} id - Task id
 * @returns {Promise<Task>} Task object
 */
const read = async (boardId:string, taskId:string):Promise<Task> =>{


  const task = tasksTable.find((entry) => entry.id === taskId && entry.boardId === boardId);

  if (!task) { throw new Error('NOT_FOUND') }
  else return task;

}

/**
 * Update task in database
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @param {Object} task - Task object to update to
 * @returns {Promise<void>} Returns nothing
 */
const update = async (boardId:string, taskId:string, task:Task):Promise<void> => {
  const index = tasksTable.findIndex(
    (entry) => entry.id === taskId && entry.boardId === boardId
  );

  ensure(tasksTable[index]).title = task.title;
  ensure(tasksTable[index]).order = task.order;
  ensure(tasksTable[index]).description = task.description;
  ensure(tasksTable[index]).userId = task.userId;
  ensure(tasksTable[index]).boardId = task.boardId;
  ensure(tasksTable[index]).columnId = task.columnId;
};

/**
 * Delete task from database
 * @param {String} boardId - Board id of the task
 * @param {String} taskId - Task id to delete
 * @returns {Promise<void>} - Returns nothing
 */
const remove = async (boardId:string, taskId:string):Promise<void> => {
  const index = tasksTable.findIndex(
    (entry) => entry.id === taskId && entry.boardId === boardId
  );
  tasksTable.splice(index, 1);
};

export {
  getAllByBoardId,
  getAllByUserId,
  create,
  read,
  update,
  remove,
};
