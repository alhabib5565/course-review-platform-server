import express from 'express';
import { validationData } from '../../middlewares/validateData';
import { AuthSchema } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router()

router.post(
    '/register',
    validationData(AuthSchema.registerValidationSchema),
    AuthController.register
)

router.post(
    '/login',
    validationData(AuthSchema.loginUserValidationSchema),
    AuthController.login
)

export const authRoutes = router