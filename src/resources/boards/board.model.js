const { v4: uuidv4 } = require('uuid');
const Column = require('./column.model.js');

class Board {
  constructor({ id = uuidv4(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((col) => new Column(col));
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
