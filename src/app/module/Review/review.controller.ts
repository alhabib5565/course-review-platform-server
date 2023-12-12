import { Request, Response } from "express";
// import { CourseService } from "./course.service";
import catchAsync from "../../utils/catchAsync";
import sendSuccessResponse from "../../utils/sendSuccessResponse";
import { ReviewService } from "./review.service";


const createReview = catchAsync(async (req: Request, res: Response,) => {
    const result = await ReviewService.createReviewIntoDB(req.body)
    sendSuccessResponse(res, {
        statusCode: 201,
        message: "Review created successfully",
        data: result
    })

})

const getAllReviews = catchAsync(async (req: Request, res: Response,) => {
    const result = await ReviewService.getAllReviews()
    sendSuccessResponse(res, {
        statusCode: 200,
        message: " Review retrieved successfully",
        data: result
    })

})

const getSingleReview = catchAsync(async (req: Request, res: Response,) => {
    const { reviewId } = req.params
    const result = await ReviewService.getSingleReview(reviewId)
    sendSuccessResponse(res, {
        statusCode: 200,
        message: "Review retrieved successfully",
        data: result
    })

})
export const ReviewController = {
    createReview,
    getAllReviews,
    getSingleReview
}