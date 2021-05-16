const { v4: uuidv4 } = require('uuid');

class Task {
  constructor(
    boardId,
    {
      id = uuidv4(),
      title = 'Board',
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

  static toResponse(task) {
    const { id, title, order, description, userId, boardId, columnId } = task;
    return { id, title, order, description, userId, boardId, columnId };
  }
}

module.exports = Task;
