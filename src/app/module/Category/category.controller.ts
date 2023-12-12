import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendSuccessResponse from "../../utils/sendSuccessResponse";
import { CategoryService } from "./category.service";


const createCategory = catchAsync(async (req: Request, res: Response,) => {
    const result = await CategoryService.createCategoryIntoDB(req.body)

    sendSuccessResponse(res, {
        statusCode: 201,
        message: "Category created successfully",
        data: result
    })

})

const getAllCategories = catchAsync(async (req: Request, res: Response,) => {
    const result = await CategoryService.getAllCategories()
    sendSuccessResponse(res, {
        statusCode: 200,
        message: " Category retrieved successfully",
        data: result
    })

})

const getSingleCategory = catchAsync(async (req: Request, res: Response,) => {
    const { courseId } = req.params
    const result = await CategoryService.getSingleCategory(courseId)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Category retrieved successfully",
        data: result
    })

})
export const CategoryController = {
    createCategory,
    getAllCategories,
    getSingleCategory
}