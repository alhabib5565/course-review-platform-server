import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendSuccessResponse from "../../utils/sendSuccessResponse";
import httpStatus from "http-status";


const register = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body)

    sendSuccessResponse(res, {
        message: 'User registered successfully',
        statusCode: httpStatus.OK,
        data: result
    })
})

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body)

    sendSuccessResponse(res, {
        message: 'User login successfully',
        statusCode: httpStatus.OK,
        data: result
    })
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.changePassword(req.user, req.body)

    sendSuccessResponse(res, {
        message: 'Change password successfully',
        statusCode: httpStatus.OK,
        data: result
    })
})

export const AuthController = {
    register,
    login,
    changePassword
}