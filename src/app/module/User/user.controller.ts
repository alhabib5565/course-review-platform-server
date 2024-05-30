import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendSuccessResponse from "../../utils/sendSuccessResponse";
import { UserService } from "./user.service";
import httpStatus from "http-status";


const createUser = catchAsync(async (req: Request, res: Response,) => {
    const result = await UserService.createUserIntoDB(req.body)

    sendSuccessResponse(res, {
        statusCode: httpStatus.OK,
        message: "User created succesfully",
        data: result
    })

})

const getAllUsers = catchAsync(async (req: Request, res: Response,) => {
    const result = await UserService.getAllUsers()

    sendSuccessResponse(res, {
        statusCode: httpStatus.OK,
        message: " User retrieved succesfully",
        data: result
    })

})

const getSingleUser = catchAsync(async (req: Request, res: Response,) => {
    const { userId } = req.params
    const result = await UserService.getSingleUser(userId)

    sendSuccessResponse(res, {
        statusCode: httpStatus.OK,
        message: "User retrieved succesfully",
        data: result
    })

})
export const UserController = {
    createUser,
    getAllUsers,
    getSingleUser
}