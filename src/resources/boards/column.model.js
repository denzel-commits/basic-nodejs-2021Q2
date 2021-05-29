const { v4: uuidv4 } = require('uuid');

class Column {
  /**
   * Column model constructor
   * @param {Object} Column - Column
   * @param {string} [Column.id=uuidv4()] - The id of the column.
   * @param {string} [Column.title='Column'] - The title of the column.
   * @param {number} [Column.order=0] - The order of the column in board.
   */
  constructor({ id = uuidv4(), title = 'Column', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
