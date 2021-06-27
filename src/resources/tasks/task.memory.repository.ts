/**
 * @module Task memory repository
 */

import {getRepository} from "typeorm";
import { Task } from './task.model';

import {Task as TaskEntity} from "../../entity/Task";


/**
 * Get all tasks by board id
 * @param {String} boardId - Board id
 * @returns {Promise<Task[]>} All tasks for given board id
 */
const getAllByBoardId = async (boardId:string): Promise<Task[]> => {
  
  const taskRepository = getRepository(TaskEntity);
  const Tasks : Task[] = await taskRepository.find({ where: { boardId } });
  
  return Tasks;
}


/**
 * Get all tasks by user id
 * @param {String} userId - User id
 * @returns {Promise<Task[]>} All tasks assigned to user id
 */
const getAllByUserId = async (userId:string): Promise<Task[]> => {
  
  const taskRepository = getRepository(TaskEntity);
  const Tasks : Task[] = await taskRepository.find({ where: { userId } });
  
  return Tasks;
}
  
/**
 * Save new task in database
 * @param {String} boardId - Board id for new task
 * @param {Task} task - Task object
 *
 * @returns {Promise<Task>} Created task
 */
const create = async (boardId: string, task: Task): Promise<Task> => {

  const taskRepository = getRepository(TaskEntity); 

  const createdTask = taskRepository.create({...task, boardId});
  await taskRepository.save(createdTask);

  return createdTask;
};

/**
 * Get task from database by board id and by task id
 *
 * @param {String} id - Board id
 * @param {String} id - Task id
 * @returns {Promise<Task | null>} Task object
 */
const read = async (boardId:string, taskId:string):Promise<Task | null>  =>{

  const taskRepository = getRepository(TaskEntity);
  const task = await taskRepository.findOne({ where: { boardId, id: taskId } });

  return task ?? null;
}

/**
 * Update task in database
 * @param {String} boardId - Board id
 * @param {String} taskId - Task id
 * @param {Object} task - Task object to update to
 * @returns {Promise<void>} Returns nothing
 */
const update = async (boardId:string, taskId:string, task:Task):Promise<void> => {

  const taskRepository = getRepository(TaskEntity);
  await taskRepository.save({...task, taskId, boardId});
};

/**
 * Delete task from database
 * @param {String} boardId - Board id of the task
 * @param {String} taskId - Task id to delete
 * @returns {Promise<void>} - Returns nothing
 */
const remove = async (boardId:string, taskId:string):Promise<void> => {

  const taskRepository = getRepository(TaskEntity);
  await taskRepository.delete({ boardId, id: taskId });

  // await getConnection()
  //   .createQueryBuilder()
  //   .delete()
  //   .from(TaskEntity)
  //   .where("boardId = :boardId", { boardId })
  //   .andWhere("id = :taskId", { taskId })
  //   .execute();
};

export {
  getAllByBoardId,
  getAllByUserId,
  create,
  read,
  update,
  remove,
};
