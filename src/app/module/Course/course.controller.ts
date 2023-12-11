import { NextFunction, Request, Response } from "express";
import { CourseService } from "./course.service";


const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await CourseService.createCourseIntoDB(req.body)
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Course created successfully",
            data: result
        })
    } catch (error) {
        next(error)
        // console.log(error)
    }
}

export const courseController = {
    createCourse
}