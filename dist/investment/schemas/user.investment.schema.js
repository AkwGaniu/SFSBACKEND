"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvestmentSchema = void 0;
const mongoose = require("mongoose");
const user_schema_1 = require("../../auth/schemas/user.schema");
exports.InvestmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user_schema_1.User,
        required: true
    },
    totalInvestment: {
        type: String,
        default: '0.0'
    },
    totalEarned: {
        type: String,
        default: '0.0'
    },
    totalPayOff: {
        type: String,
        default: '0.0'
    },
    numberOfInvestment: {
        type: Number,
        default: 0
    }
});
//# sourceMappingURL=user.investment.schema.js.map