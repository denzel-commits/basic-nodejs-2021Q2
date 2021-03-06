import { v4 as uuidv4 } from 'uuid';
import { Column } from './column.model';

class Board {

  id:string;

  title:string;

  columns:Column[];

  /**
   * Board model constructor
   * @param {Object} Board - Board
   * @param {string} [Board.id=uuidv4()] - The id of the board.
   * @param {string} [Board.title='USER'] - The title of the board.
   * @param {Column[]} [Board.columns=''] - The columns of the board.
   */
  constructor({ id = uuidv4(), title = 'Board', columns = [{}] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map((col) => new Column(col));
  }

  /**
   * Formats user for response, removing password from output
   * @param {Board} board - Board object
   * @returns {Board} Formatted board object
   */
  static toResponse = (board:Board):{id: string, title: string, columns: Column[]} => {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

export { Board };
