import { AnyZodObject } from "zod";
import { NextFunction, Request, Response } from "express";

export const validationData = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const result = await schema.safeParseAsync(req.body)
        if (!result.success) {
            next(result.error)
        } else {
            req.body = result.data
            next()
        }
    }
}