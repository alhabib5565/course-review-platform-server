import express from 'express';
import { validationData } from '../../middlewares/validateData';
import { AuthSchema } from './auth.validation';
import { AuthController } from './auth.controller';
import { auth } from '../../middlewares/auth';

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

router.post(
    '/change-password',
    auth('admin', 'user'),
    validationData(AuthSchema.changePasswordValidationSchema),
    AuthController.changePassword
)

export const authRoutes = router