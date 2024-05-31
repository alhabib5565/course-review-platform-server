import { z } from "zod";
import { USER_ROLE } from "../User/user.constant";

const registerValidationSchema = z.object({
    username: z.string().nonempty({ message: 'username is required' }),
    email: z.string().email({ message: 'Email is required and must be valid' }),
    password: z.string().nonempty({ message: 'Password is required' }),
    role: z.enum(Object.keys(USER_ROLE) as [keyof typeof USER_ROLE]).optional().default('user'),
});

const loginUserValidationSchema = z.object({
    username: z.string().nonempty({ message: 'username is required' }),
    password: z.string().nonempty({ message: 'Password is required' })
})

export const AuthSchema = {
    registerValidationSchema,
    loginUserValidationSchema
}