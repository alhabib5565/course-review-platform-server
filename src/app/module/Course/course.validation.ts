import { z } from "zod";


const createTagValidationSchema = z.object({
    name: z.string({
        required_error: "name is required.",
        invalid_type_error: "name must be string"
    }).trim(),
    isDeleted: z.boolean().default(false)
})


const createCourseValidationSchema = z.object({
    title: z.string({
        required_error: "title is required.",
        invalid_type_error: "title must be string."
    }).trim(),
    instructor: z.string({
        required_error: "instructor is required.",
        invalid_type_error: "instructor must be string."
    }).trim(),
    categoryId: z.string(),
    price: z.number({
        required_error: "price is required.",
        invalid_type_error: 'price must be number.'
    }),
    tags: z.array(createTagValidationSchema).min(1, "must contain 1 or more item."),
    startDate: z.string({
        required_error: "startDate is required.",
    }),
    endDate: z.string({
        required_error: "endDate is required.",
    }),
    language: z.string({
        required_error: "language is required.",
        invalid_type_error: 'language must be string.'
    }),
    provider: z.string({
        required_error: "provider is required.",
        invalid_type_error: 'provider must be string.'
    }),
    details: z.object({
        level: z.string({
            required_error: "level is required.",
            invalid_type_error: "level must be string."
        }).trim(),
        description: z.string({
            required_error: "description is required.",
            invalid_type_error: "level must be description."
        }).trim()
    })
})
const updateTagValidationSchema = z.object({
    name: z.string({
        required_error: "name is required.",
        invalid_type_error: "name must be string"
    }).trim().optional(),
    isDeleted: z.boolean().default(false).optional()
})


const updateCourseValidationSchema = z.object({
    title: z.string({
        required_error: "title is required.",
        invalid_type_error: "title must be string."
    }).trim().optional(),
    instructor: z.string({
        required_error: "instructor is required.",
        invalid_type_error: "instructor must be string."
    }).trim().optional(),
    categoryId: z.string().optional(),
    price: z.number({
        required_error: "price is required.",
        invalid_type_error: 'price must be number.'
    }).optional(),
    tags: z.array(updateTagValidationSchema).min(1, "must contain 1 or more item.").optional(),
    startDate: z.string({
        required_error: "startDate is required.",
    }).optional(),
    endDate: z.string({
        required_error: "endDate is required.",
    }).optional(),
    language: z.string({
        required_error: "language is required.",
        invalid_type_error: 'language must be string.'
    }).optional(),
    provider: z.string({
        required_error: "provider is required.",
        invalid_type_error: 'provider must be string.'
    }).optional(),
    durationInWeeks: z.number().optional(),
    details: z.object({
        level: z.string({
            required_error: "level is required.",
            invalid_type_error: "level must be string."
        }).trim().optional(),
        description: z.string({
            required_error: "description is required.",
            invalid_type_error: "level must be description."
        }).trim().optional()
    }).optional()
})

export const courseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema
}
