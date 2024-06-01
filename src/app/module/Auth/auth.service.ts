import httpStatus from "http-status";
import { AppError } from "../../errorHandler/appError";
import { User } from "../User/user.model";
import { TLogin, TRegister } from "./auth.interface";
import { comparePassword } from "../../utils/auth.utils";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { config } from "../../config";
import bcrypt from 'bcrypt';

const register = async (payload: TRegister) => {
    const result = await User.create(payload)
    return result
}

const login = async (payload: TLogin) => {
    const user = await User.findOne({ username: payload.username }).select('+password')
    if (!user) {
        throw new AppError('User not found', httpStatus.NOT_FOUND)
    }

    if (user.isDeleted) {
        throw new AppError('User not found', httpStatus.NOT_FOUND)
    }

    if (user.status === 'blocked') {
        throw new AppError('User already blocked', httpStatus.BAD_REQUEST)
    }

    const isPasswordMatched = await comparePassword(payload.password, user.password)

    if (!isPasswordMatched) {
        throw new AppError('Password does not match', httpStatus.BAD_REQUEST)
    }

    const jwtPayload = {
        username: user.username,
        role: user.role
    }

    const token = jwt.sign(jwtPayload, config.jwt_access_secret as Secret, {
        expiresIn: config.jwt_access_expires_in
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const userObject = user.toObject() as { [key: string]: any };
    delete userObject.password;
    delete userObject.passwordChangeAt;

    return {
        userObject,
        token
    }
}

const changePassword = async (decodedUseruser: JwtPayload, payload: {
    currentPassword: string,
    newPassword: string
}) => {
    const user = await User.findOne({ username: decodedUseruser.username }).select('+password')
    if (!user) {
        throw new AppError('User not found', httpStatus.NOT_FOUND)
    }

    const isPasswordMatched = await comparePassword(payload.currentPassword, user.password)

    if (!isPasswordMatched) {
        throw new AppError('Password does not match', httpStatus.BAD_REQUEST)
    }

    if (payload.currentPassword === payload.newPassword) {
        throw new AppError('Current password and new password are same', httpStatus.BAD_REQUEST)
    }

    for (const pastPassword of user.passwordHistory) {
        const isNewPasswordMatched = await comparePassword(payload.newPassword, pastPassword.password)
        if (isNewPasswordMatched) {
            throw new AppError('Password change failed. Ensure the new password is unique and not among the last 2 used', httpStatus.BAD_REQUEST)
        }
    }

    const newHashedPassword = await bcrypt.hash(payload.newPassword, Number(config.saltRounds))

    const result = await User.findOneAndUpdate(
        { username: user.username },
        {
            password: newHashedPassword,
            passwordHistory: [
                {
                    password: user.password,
                    changed_at: new Date()
                },
                ...user.passwordHistory.slice(0, 1)
            ]
        },

        {
            new: true
        }
    )
    return result
}

export const AuthService = {
    register,
    login,
    changePassword
}