import { Router } from "express";
import { courseController } from "./course.controller";


const router = Router()

router.post("/course", courseController.createCourse)
router.get("/courses", courseController.getAllCourses)
router.get("/course/:courseId", courseController.getSingleCourse)

export const courseRoute = router