import { USER_ROLE, USER_STATUS } from "./user.constant"

export type TPasswordHistory = {
    password: string,
    changed_at: Date
}


export type TUser = {
    username: string
    email: string
    password: string
    passwordHistory: TPasswordHistory[]
    role: TUser_Role
    isDeleted: boolean,
    status: TUser_Status
    passwordChangeAt: Date
}

export type TUser_Role = keyof typeof USER_ROLE

export type TUser_Status = keyof typeof USER_STATUS