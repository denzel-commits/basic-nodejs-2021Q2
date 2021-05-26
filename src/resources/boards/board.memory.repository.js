const boardsTable = [
  {
    id: '1',
    title: 'Board 1',
    columns: [
      { id: '111', title: 'col1', order: 1 },
      { id: '222', title: 'col2', order: 2 },
      { id: '333', title: 'col3', order: 3 },
    ],
  },
  {
    id: '2',
    title: 'Board 2',
    columns: [
      { id: '444', title: 'col241', order: 1 },
      { id: '555', title: 'col2', order: 2 },
      { id: '666', title: 'col3', order: 3 },
    ],
  },
  {
    id: '3',
    title: 'Board 3',
    columns: [
      { id: '888', title: 'col1', order: 1 },
      { id: '999', title: 'col2', order: 2 },
      { id: '1022', title: 'col3', order: 3 },
    ],
  },
  {
    id: '4',
    title: 'Board 4',
    columns: [
      { id: '1023', title: 'col1', order: 1 },
      { id: '1024', title: 'col2', order: 2 },
      { id: '1035', title: 'col3', order: 3 },
    ],
  },
  {
    id: '5',
    title: 'Board 5',
    columns: [
      { id: '1036', title: 'col1', order: 1 },
      { id: '1037', title: 'col2', order: 2 },
      { id: '1045', title: 'col3', order: 3 },
    ],
  },
];

// TODO: mock implementation. should be replaced during task development
const getAll = async () => boardsTable;

const create = async (board) => boardsTable.push(board);

const read = async (id) => boardsTable.find((entry) => entry.id === id);

const update = async (id, board) => {
  const index = boardsTable.findIndex((entry) => entry.id === id);

  boardsTable[index].title = board.title;
  boardsTable[index].columns = board.columns;

  return true;
};

const remove = async (id) => {
  const index = boardsTable.findIndex((entry) => entry.id === id);
  boardsTable.splice(index, 1);

  return true;
};

module.exports = { getAll, create, read, update, remove };
