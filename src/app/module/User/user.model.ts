import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import { USER_ROLE, USER_STATUS } from "./user.constant";


const userSchema = new Schema<TUser>({
    userName: {
        type: String,
        required: [true, 'UserName is required']
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

export const User = model<TUser>('User', userSchema)

