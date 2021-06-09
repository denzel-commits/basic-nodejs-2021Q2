"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const uuid_1 = require("uuid");
const column_model_1 = require("./column.model");
class Board {
    /**
     * Board model constructor
     * @param {Object} Board - Board
     * @param {string} [Board.id=uuidv4()] - The id of the board.
     * @param {string} [Board.title='USER'] - The title of the board.
     * @param {Column[]} [Board.columns=''] - The columns of the board.
     */
    constructor({ id = uuid_1.v4(), title = 'Board', columns = [{}] } = {}) {
        this.id = id;
        this.title = title;
        this.columns = columns.map((col) => new column_model_1.Column(col));
    }
}
exports.Board = Board;
/**
 * Formats user for response, removing password from output
 * @param {Board} board - Board object
 * @returns {Board} Formatted board object
 */
Board.toResponse = (board) => {
    const { id, title, columns } = board;
    return { id, title, columns };
};
//# sourceMappingURL=board.model.js.map