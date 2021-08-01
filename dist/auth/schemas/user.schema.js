"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserSchema = void 0;
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        default: null,
    },
    lastName: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    activationString: {
        type: String,
        default: null
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
    }
});
exports.User = mongoose.model('User', exports.UserSchema);
//# sourceMappingURL=user.schema.js.map