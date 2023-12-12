import { Request, Response } from "express";
import { CourseService } from "./course.service";
import catchAsync from "../../utils/catchAsync";
import sendSuccessResponse from "../../utils/sendSuccessResponse";


const createCourse = catchAsync(async (req: Request, res: Response,) => {
    const result = await CourseService.createCourseIntoDB(req.body)
    sendSuccessResponse(res, {
        statusCode: 201,
        message: "Course created successfully",
        data: result
    })

})

const getAllCourses = catchAsync(async (req: Request, res: Response,) => {
    const result = await CourseService.getAllCourses()
    sendSuccessResponse(res, {
        statusCode: 200,
        message: " Courses retrieved successfully",
        data: result
    })

})

const getSingleCourse = catchAsync(async (req: Request, res: Response,) => {
    const { courseId } = req.params
    const result = await CourseService.getSingleCourse(courseId)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Course retrieved successfully",
        data: result
    })

})
export const courseController = {
    createCourse,
    getAllCourses,
    getSingleCourse
}