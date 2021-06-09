"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Column = void 0;
const uuid_1 = require("uuid");
class Column {
    /**
     * Column model constructor
     * @param {Object} Column - Column
     * @param {string} [Column.id=uuidv4()] - The id of the column.
     * @param {string} [Column.title='Column'] - The title of the column.
     * @param {number} [Column.order=0] - The order of the column in board.
     */
    constructor({ id = uuid_1.v4(), title = 'Column', order = 0 } = {}) {
        this.id = id;
        this.title = title;
        this.order = order;
    }
}
exports.Column = Column;
//# sourceMappingURL=column.model.js.map