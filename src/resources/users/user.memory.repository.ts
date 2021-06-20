/**
 * @module User memory repository
 */

import {getRepository} from "typeorm";
import { User } from './user.model';

import {User as UserEntity} from "../../entity/User";

/**
 * Returns all available users
 *
 * @returns {Promise<User[]>} - All users
 */
const getAll = async (): Promise<User[]> => {

  const userRepository = getRepository(UserEntity); // you can also get it via getConnection().getRepository() or getManager().getRepository()
  const Users : User[] = await userRepository.find();
  
  return Users;
}

/**
 * Save new user in database
 * @param {User} user - User info
 *
 * @returns {Promise<User>} Returns created user
 */
const create = async (user: User): Promise<User> => {
  
  const userRepository = getRepository(UserEntity); 

  const createdUser = userRepository.create(user);
  await userRepository.save(createdUser);

  return createdUser;
};

/**
 * Get user data from database by user id
 * @param {String} id - User id
 * @returns {Promise<User | null>} User info
 */
const read = async (id:string):Promise<User | null> => {
 
  const userRepository = getRepository(UserEntity);
  const user = await userRepository.findOne(id);

  return user ?? null;
}

/**
 * Update user data in database
 * @param {String} id - User id
 * @param {Object} user - User object to update to
 * @returns {Promise<void>} Returns nothing
 */
const update = async (id: string, user: User): Promise<void> => {
  const userRepository = getRepository(UserEntity); 
  await userRepository.save({...user, id});
};

/**
 * Delete user from database
 * @param {String} id - User id to delete
 * @returns {Promise<void>} Returns nothing
 */
const remove = async (id: string):Promise<void> => {
  const userRepository = getRepository(UserEntity);
  await userRepository.delete(id);
};

export { getAll, create, read, update, remove };
