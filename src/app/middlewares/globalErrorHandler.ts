/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { ZodError } from "zod";
import { handleZodError } from "../errorHandler/handleZodError";
import handleCastError from "../errorHandler/handleCastError";
import { handleValidationError } from "../errorHandler/handleValidationError";
import { AppError } from "../errorHandler/appError";


// eslint-disable-next-line @typescript-eslint/no-explicit-any, no-unused-vars
const globlaErrorHandler = async (err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500

    let errFormate = {
        message: err.message || "something went wrong",
        errorMessage: "",
    }


    if (err instanceof ZodError) {
        errFormate = handleZodError(err)
    } else if (err instanceof mongoose.Error.ValidationError) {
        errFormate = handleValidationError(err)
    } else if (err instanceof mongoose.Error.CastError) {
        errFormate = handleCastError(err)
    } else if (err && err.code === 11000) {
        errFormate.message = 'Duplicat value'
        errFormate.errorMessage = `${Object.values(err.keyValue)} already exist`
    } else if (err instanceof AppError) {
        errFormate.message = err.message
        statusCode = err.statusCode
    } else {
        errFormate.message = err.message
    }

    res.status(statusCode).json({
        success: false,
        message: errFormate.message,
        errorMessage: errFormate.errorMessage,
        errorDetails: err,
        stack: err.stack
    })
}



export default globlaErrorHandler