import { Router } from "express";
import { validationData } from "../../middlewares/validateData";
import { courseController } from "./course.controller";
import { courseValidations } from "./course.validation";


const router = Router()

router.post("/course", validationData(courseValidations.courseValidationSchema), courseController.createCourse)
router.get("/courses", courseController.getAllCourses)
router.get("/course/:courseId", courseController.getSingleCourse)

export const courseRoute = router