import { Router } from "express";
import { CategoryController } from "./category.controller";
import { validationData } from "../../middlewares/validateData";
import { categoryValidations } from "./category.validation";

const router = Router()

router.post('/categories', validationData(categoryValidations), CategoryController.createCategory)
router.get('/categories', CategoryController.getAllCategories)
export const categoryRoutes = router