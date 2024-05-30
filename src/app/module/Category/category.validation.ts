import { Types } from "mongoose";
import { z } from "zod";

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
});
export const categoryValidations = z.object({
    name: z.string({
        invalid_type_error: "category name must be string.",
        required_error: "categroy name is required."
    }),
    createdBy: objectIdSchema
})