import { Router } from "express";
import { validationData } from "../../middlewares/validateData";
import { courseController } from "./course.controller";
import { courseValidations } from "./course.validation";


const router = Router()

router.post(
    "/course",
    validationData(courseValidations.createCourseValidationSchema),
    courseController.createCourse)
router.put(
    "/courses/:courseId",
    validationData(courseValidations.updateCourseValidationSchema),
    courseController.updateCourse)
router.get("/courses", courseController.getAllCourses)
router.get("/courses/:courseId/reviews", courseController.getSingleCourse)
router.get("/course/best", courseController.bestCourse)

export const courseRoute = router