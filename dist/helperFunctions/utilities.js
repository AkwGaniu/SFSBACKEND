"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validEmail = void 0;
const validEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;
    if (regex.test(email) === false) {
        return false;
    }
    else {
        return true;
    }
};
exports.validEmail = validEmail;
//# sourceMappingURL=utilities.js.map