import { USER_ROLE, USER_STATUS } from "./user.constant"

export type TUser = {
    userName: string
    email: string
    password: string
    role: TUser_Role
    isDeleted: boolean,
    status: TUser_Status
    passwordChangeAt: Date
}

export type TUser_Role = keyof typeof USER_ROLE

export type TUser_Status = keyof typeof USER_STATUS