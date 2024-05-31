import { z } from "zod";
import { USER_ROLE, USER_STATUS } from "./user.constant";

const userValidationSchema = z.object({
    username: z.string().nonempty({ message: 'username is required' }),
    email: z.string().email({ message: 'Email is required and must be valid' }),
    password: z.string().nonempty({ message: 'Password is required' }),
    role: z.enum(Object.keys(USER_ROLE) as [keyof typeof USER_ROLE]).optional().default('user'),
    isDeleted: z.boolean().optional().default(false),
    status: z.enum(Object.keys(USER_STATUS) as [keyof typeof USER_STATUS]).optional().default('active'),
    passwordChangeAt: z.date().nullable().optional().default(null),
});

export const UserSchema = {
    userValidationSchema
}