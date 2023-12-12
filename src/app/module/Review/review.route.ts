import { Router } from "express";
import { validationData } from "../../middlewares/validateData";
import { ReviewController } from "./review.controller";
import { reviewValidationSchema } from "./review.validation";



const router = Router()

router.post("/reviews", validationData(reviewValidationSchema), ReviewController.createReview)
router.get("/reviews", ReviewController.getAllReviews)
router.get("/reviews/:reviewId", ReviewController.getSingleReview)

export const reviewRoute = router