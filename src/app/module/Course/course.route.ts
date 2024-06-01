import { Router } from "express";
import { validationData } from "../../middlewares/validateData";
import { courseController } from "./course.controller";
import { courseValidations } from "./course.validation";
import { auth } from "../../middlewares/auth";


const router = Router()

router.post(
    "/",
    auth("admin"),
    validationData(courseValidations.createCourseValidationSchema),
    courseController.createCourse
)
router.put(
    "/:courseId",
    auth("admin"),
    validationData(courseValidations.updateCourseValidationSchema),
    courseController.updateCourse
)
router.get(
    "",
    courseController.getAllCourses
)
router.get(
    "/:courseId/reviews",
    courseController.getSingleCourse
)
router.get(
    "/best",
    courseController.bestCourse
)

export const courseRoutes = router