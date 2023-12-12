import { z } from "zod";


export const categoryValidations = z.object({
    name: z.string({
        invalid_type_error: "category name must be string.",
        required_error: "categroy name is required."
    })
})