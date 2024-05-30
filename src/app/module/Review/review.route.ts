import { Router } from "express";
import { validationData } from "../../middlewares/validateData";
import { ReviewController } from "./review.controller";
import { ReviewSchema } from "./review.validation";



const router = Router()

router.post(
    "/create-review",
    validationData(ReviewSchema.reviewValidationSchema),
    ReviewController.createReview
)
router.get(
    "/",
    ReviewController.getAllReviews
)
router.get(
    "/:reviewId",
    ReviewController.getSingleReview
)

export const reviewRoutes = router