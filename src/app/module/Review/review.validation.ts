
import { z } from "zod";

export const reviewValidationSchema = z.object({
    courseId: z.string().nonempty('Course ID is required'),
    rating: z.number({
        required_error: "Rating is required.",
        invalid_type_error: "Rating must be number."
    }).int().min(1, 'Rating must be at least 1.').max(5, 'Rating must be at most 5.'),
    review: z.string({
        required_error: "Review is required.",
        invalid_type_error: "Review must be String."
    })
});
