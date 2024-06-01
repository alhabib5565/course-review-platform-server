import { Schema, model } from "mongoose";
import { TPasswordHistory, TUser } from "./user.interface";
import { USER_ROLE, USER_STATUS } from "./user.constant";
import bcrypt from 'bcrypt';
import { config } from "../../config";

const passwordHistorySchema = new Schema<TPasswordHistory>({
    password: String,
    changed_at: Date
}, {
    _id: false
})

const userSchema = new Schema<TUser>({
    username: {
        type: String,
        required: [true, 'username is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: 0
    },
    passwordHistory: {
        type: [passwordHistorySchema],
        default: []
    },
    role: {
        type: String,
        enum: Object.keys(USER_ROLE),
        default: 'user'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: Object.keys(USER_STATUS),
        default: "active"
    },
    passwordChangeAt: {
        type: Date,
        default: null
    }
})

userSchema.pre('save', async function () {
    const hashedPassword = await bcrypt.hash(this.password, Number(config.saltRounds))
    this.password = hashedPassword
})

userSchema.post('save', function () {
    this.password = ''
})

export const User = model<TUser>('User', userSchema)

