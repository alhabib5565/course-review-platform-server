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
    const result = await CourseService.getAllCourses(req.query)
    // sendSuccessResponse(res, {
    //     statusCode: 200,
    //     message: " Courses retrieved successfully",
    //     data: {
    //         result: result.result,
    //         page: result.page,
    //         limit: result.limit
    //     }
    // })

    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Courses retrieved successfully",
        data: result
    })

})

const getSingleCourse = catchAsync(async (req: Request, res: Response,) => {
    const { courseId } = req.params
    const result = await CourseService.getSingleCourse(courseId)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Course and Reviews retrieved successfully",
        data: result
    })
})

const updateCourse = catchAsync(async (req: Request, res: Response,) => {
    const { courseId } = req.params
    // console.log('course controller', req.body)
    const result = await CourseService.updateCourseInfoIntoDB(courseId, req.body)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Course updated successfully",
        data: result
    })
})

const bestCourse = catchAsync(async (req: Request, res: Response,) => {
    // console.log('course controller', req.body)
    const result = await CourseService.getBestCourse()
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Best course retrieved successfully",
        data: result
    })
})

export const courseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    bestCourse
}