const tasksTable = [
  {
    id: '3453',
    title: 'Task1',
    order: 0,
    description: 'to-dos',
    userId: 'uid923',
    boardId: '2',
    columnId: 'columnid1',
  },
  {
    id: '345436',
    title: 'Task2',
    order: 0,
    description: 'to-dos',
    userId: 'uid4345',
    boardId: '3',
    columnId: 'columnid1',
  },
  {
    id: '23464',
    title: 'Task3',
    order: 0,
    description: 'to-dos',
    userId: 'uid2345',
    boardId: '4',
    columnId: 'columnid1',
  },
];

// TODO: mock implementation. should be replaced during task development
const getAllByBoardId = async (boardId) =>
  tasksTable.find((entry) => entry.boardId === boardId);

const create = async (task) => tasksTable.push(task);

const read = async (boardId, taskId) =>
  tasksTable.find((entry) => entry.id === taskId && entry.boardId === boardId);

const update = async (boardId, taskId, task) => {
  const index = tasksTable.findIndex(
    (entry) => entry.id === taskId && entry.boardId === boardId
  );

  tasksTable[index].title = task.title;
  tasksTable[index].order = task.order;
  tasksTable[index].description = task.description;
  tasksTable[index].userId = task.userId;
  tasksTable[index].boardId = task.boardId;
  tasksTable[index].columnId = task.columnId;

  return true;
};

const remove = async (boardId, taskId) => {
  const index = tasksTable.findIndex(
    (entry) => entry.id === taskId && entry.boardId === boardId
  );
  tasksTable.splice(index, 1);

  return true;
};

module.exports = { getAllByBoardId, create, read, update, remove };
