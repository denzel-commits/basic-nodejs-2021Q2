import { v4 as uuidv4 } from 'uuid';

class Task {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string;

  boardId: string;

  columnId: string;

  /**
   * Task model constructor
   * @param {string} boardId - The boardId of the task.
   * @param {Object} Task - Task
   * @param {string} [Task.id=uuidv4()] - The id of the task.
   * @param {string} [Task.title='Task'] - The title of the task.
   * @param {number} [Task.order=0] - The order of the task in column.
   * @param {string} [Task.description='Task description'] - The description of the task.
   * @param {string|null} [Task.userId=''] - The userId of the task assignee.
   * @param {string} [Task.columnId=''] - The columnId of the task.
   */
  constructor(
    boardId:string,
    {
      id = uuidv4(),
      title = 'Task',
      order = 0,
      description = 'Task description',
      userId = '',
      columnId = '',
    } = {}
  ) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Formats task for response
   * @param {Task} task - Task object
   * @returns {Task} Formatted task object
   */
  static toResponse = (task: Task): Task => {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  };
}

export { Task };
