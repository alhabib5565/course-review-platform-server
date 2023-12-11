/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";
import { handleZodError } from "../errorHandler/handleZodError";


// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
const globlaErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = 500

    let errFormate = {
        message: "Validation Error",
        errorMessage: "gender is required. email is required.",
    }


    if (err instanceof ZodError) {
        errFormate = handleZodError(err)
    } else if (err instanceof mongoose.Error.ValidationError) {
        // console.log('valdation error')
        const er = Object.values(err.errors).map(errorDetails => {
            return {
                path: errorDetails.path,
                message: errorDetails.message
            }
        })
        console.log(er)
    } else if (err instanceof mongoose.Error.CastError) {
        console.log('castError')
    } else if (err && err.code === 11000) {
        console.log('duplicat error')
    }

    res.status(statusCode).json({
        success: false,
        message: errFormate.message,
        errorMessage: errFormate.errorMessage,
        errorDetails: err
    })
}



export default globlaErrorHandler