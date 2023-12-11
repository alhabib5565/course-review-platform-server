import { Response } from "express";

type TResponseData<T> = {
    statusCode?: number
    message: string,
    data: T
}


const sendSuccessResponse = <T>(res: Response, data: TResponseData<T>) => {
    res.status(data.statusCode || 200).json({
        success: true,
        statusCode: data.statusCode,
        message: data.message,
        data: data.data
    })
}

export default sendSuccessResponse