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

}
)
export const courseController = {
    createCourse
}