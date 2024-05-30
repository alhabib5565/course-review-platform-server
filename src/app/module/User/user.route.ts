import { Router } from "express";
import { validationData } from "../../middlewares/validateData";
import { UserSchema } from "./user.validation";
import { UserController } from "./user.controller";


const router = Router()

router.post("/create-user", validationData(UserSchema.userValidationSchema), UserController.createUser)
router.get("/", UserController.getAllUsers)
router.get("/:userId", UserController.getSingleUser)

export const userRoutes = router