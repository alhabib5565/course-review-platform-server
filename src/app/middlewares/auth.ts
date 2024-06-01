import { NextFunction, Request, Response } from "express";
import { TUser_Role } from "../module/User/user.interface";
import catchAsync from "../utils/catchAsync";
import { AppError } from "../errorHandler/appError";
import httpStatus from "http-status";
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { config } from "../config";
import { User } from "../module/User/user.model";

export const auth = (...roles: TUser_Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req?.headers?.authorization
        if (!token) {
            throw new AppError('Unauthorized user', httpStatus.UNAUTHORIZED)
        }

        const decodecUser = jwt.verify(token, config.jwt_access_secret as Secret) as JwtPayload
        const user = await User.findOne({ username: decodecUser.username })
        if (!user) {
            throw new AppError('User not found', httpStatus.NOT_FOUND)
        }

        if (user.isDeleted) {
            throw new AppError('User not found', httpStatus.NOT_FOUND)
        }

        if (user.status === 'blocked') {
            throw new AppError('User already blocked', httpStatus.BAD_REQUEST)
        }

        if (
            user.passwordChangeAt
            && decodecUser.iat
            && decodecUser.iat > user.passwordChangeAt.getTime() / 1000
        ) {
            throw new AppError('Unauthorized user', httpStatus.UNAUTHORIZED)
        }

        if (!roles.includes(decodecUser.role)) {
            throw new AppError('Unauthorized user', httpStatus.UNAUTHORIZED)
        }
        req.user = decodecUser
        next()
    })
}