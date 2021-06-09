"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promiseWrapper = void 0;
const promiseWrapper = (fn) => (req, res, next) => {
    fn(req, res, next).catch(next);
};
exports.promiseWrapper = promiseWrapper;
//# sourceMappingURL=promise.wrapper.js.map