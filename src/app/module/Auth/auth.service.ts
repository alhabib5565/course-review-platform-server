import httpStatus from "http-status";
import { AppError } from "../../errorHandler/appError";
import { User } from "../User/user.model";
import { TLogin, TRegister } from "./auth.interface";
import { comparePassword } from "../../utils/auth.utils";
import jwt, { Secret } from 'jsonwebtoken';
import { config } from "../../config";


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

export const AuthService = {
    register,
    login
}