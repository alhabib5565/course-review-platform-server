import { config } from "../../config";
import { TUser } from "./user.interface"
import { User } from "./user.model"
import bcrypt from 'bcrypt';

const createUserIntoDB = async (payload: TUser) => {
    const hashedPassword = await bcrypt.hash(payload.password, Number(config.saltRounds))
    payload.password = hashedPassword
    const result = await User.create(payload)
    return result
}

const getAllUsers = async () => {
    const result = await User.find()
    return result
}

const getSingleUser = async (id: string) => {
    const result = await User.findById(id)
    return result
}

export const UserService = {
    createUserIntoDB,
    getAllUsers,
    getSingleUser
}