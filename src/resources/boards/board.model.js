const { v4: uuidv4 } = require('uuid');
const Column = require('./column.model.js');

class Board {
  /**
   * Board model constructor
   * @param {Object} Board - Board
   * @param {string} [Board.id=uuidv4()] - The id of the board.
   * @param {string} [Board.title='USER'] - The title of the board.
   * @param {Column[]} [Board.columns=''] - The columns of the board.
   */
  constructor({ id = uuidv4(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((col) => new Column(col));
  }

  /**
   * Formats user for response, removing password from output
   * @param {Board} board - Board object
   * @returns {Board} Formatted board object
   */
  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
