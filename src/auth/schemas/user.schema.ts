import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
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
})


export const User = mongoose.model('User', UserSchema)