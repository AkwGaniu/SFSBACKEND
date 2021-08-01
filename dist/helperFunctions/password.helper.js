"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmPassword = exports.hashPassword = void 0;
const bcrypt = require('bcrypt');
const hashPassword = async (password) => {
    const saltRounds = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, saltRounds);
};
exports.hashPassword = hashPassword;
const confirmPassword = async (password, hashedPass) => {
    return await bcrypt.compare(password, hashedPass);
};
exports.confirmPassword = confirmPassword;
//# sourceMappingURL=password.helper.js.map