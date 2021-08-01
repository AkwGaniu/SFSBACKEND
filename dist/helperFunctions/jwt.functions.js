"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = exports.decodeToken = void 0;
const jwt = require('jsonwebtoken');
const config_keys_1 = require("../config.keys");
const decodeToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        return decodedToken.id;
    }
    catch (err) {
        return false;
    }
};
exports.decodeToken = decodeToken;
const createToken = (data) => {
    const token = jwt.sign({ id: data.userId }, config_keys_1.default.JWT_SECRET, { expiresIn: data.tokenLife });
    return token;
};
exports.createToken = createToken;
//# sourceMappingURL=jwt.functions.js.map