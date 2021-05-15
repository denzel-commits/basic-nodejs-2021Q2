const usersTable = [
  { id: '1', name: 'Ivan L', login: 'ivanl', password: 'bbgdtekw' },
  { id: '2', name: 'Josef K', login: 'joseka', password: 'nbgtyuewf' },
  { id: '3', name: 'Michel C', login: 'miha', password: 'vnkdv8793' },
  { id: '4', name: 'Alexandr Darwin', login: 'darwin', password: 'uuisns823J' },
  { id: '5', name: 'Semen K', login: 'senya', password: 'lmvodf83' },
  { id: '6', name: 'Olga J', login: 'helga', password: 'cfvhuii22' },
  { id: '7', name: 'Sasha P', login: 'shura', password: 'vsluh24' },
  { id: '8', name: 'Dmitriy K', login: 'demon', password: 'asbjksdfkh8832j' },
  { id: '9', name: 'Lester Hi', login: 'dexter', password: 'svfdkljh3489' },
  { id: '10', name: 'Vasya Vas', login: 'avas', password: 'sfer343jkh*' },
];

// TODO: mock implementation. should be replaced during task development
const getAll = async () => usersTable;

const create = async (user) => usersTable.push(user);

const read = async (id) => usersTable.find((entry) => entry.id === id);

const update = async (id, user) => {
  const index = usersTable.findIndex((entry) => entry.id === id);

  usersTable[index].name = user.name;
  usersTable[index].login = user.login;
  usersTable[index].password = user.password;

  return true;
};

const remove = async (id) => {
  const index = usersTable.findIndex((entry) => entry.id === id);
  usersTable.splice(index, 1);

  return true;
};

module.exports = { getAll, create, read, update, remove };
