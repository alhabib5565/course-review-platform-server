import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import { courseValidations } from "./course.validation";

const createCourseIntoDB = async (payload: TCourse) => {
    const zodData = courseValidations.courseValidationSchema.parse(payload)
    const result = await Course.create(zodData)
    return result
}

export const CourseService = {
    createCourseIntoDB
}