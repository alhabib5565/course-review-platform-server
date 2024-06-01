import { Router } from "express";
import { CategoryController } from "./category.controller";
import { validationData } from "../../middlewares/validateData";
import { categoryValidations } from "./category.validation";
import { auth } from "../../middlewares/auth";

const router = Router()

router.post(
    '/',
    auth("admin"),
    validationData(categoryValidations),
    CategoryController.createCategory
)
router.get(
    '/',
    CategoryController.getAllCategories
)
export const categoryRoutes = router