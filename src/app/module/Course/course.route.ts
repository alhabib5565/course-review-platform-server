import { Router } from "express";
import { courseController } from "./course.controller";


const router = Router()

router.post("/course", courseController.createCourse)

export const courseRoute = router