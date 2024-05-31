import { TUser } from "../User/user.interface";

export type TRegister = Omit<TUser, 'passwordChangeAt' | 'status' | 'isDeleted'>

export type TLogin = {
    username: string
    password: string
}