import * as mongoose from 'mongoose'
import { User } from 'src/auth/schemas/user.schema'

export const InvestmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
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
})

