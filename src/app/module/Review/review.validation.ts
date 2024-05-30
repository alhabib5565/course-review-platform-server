
import { Types } from "mongoose";
import { z } from "zod";
const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
    message: "Invalid ObjectId",
});

// Define the Zod schema
const reviewValidationSchema = z.object({
    courseId: objectIdSchema,
    rating: z.number().min(1).max(5), // Assuming rating is between 1 and 5
    review: z.string().nonempty({ message: 'Review is required' }),
    createdBy: objectIdSchema,
});

export const ReviewSchema = {
    reviewValidationSchema
}