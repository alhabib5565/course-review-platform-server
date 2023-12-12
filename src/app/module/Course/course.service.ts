import mongoose from "mongoose";
import { AppError } from "../../errorHandler/appError";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import { ObjectId } from "mongodb";

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload)
    return result
}

const getAllCourses = async () => {
    const result = await Course.find()
    return result
}

const getSingleCourse = async (id: string) => {
    const result = await Course.aggregate([
        {
            $match: { _id: new ObjectId(id) }
        },
        {
            $project: { __v: 0 }
        },
        {
            $lookup: {
                from: "reviews",
                localField: "_id",
                foreignField: "courseId",
                as: 'reviews'
            }
        }
    ])
    return result
}

const updateCourseInfoIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { details, tags, ...remainingCourseInfo } = payload
    const modifiedCourseInfo: Record<string, unknown> = {
        ...remainingCourseInfo
    }

    if (details && Object.keys(details).length) {
        for (const [keys, value] of Object.entries(details)) {
            modifiedCourseInfo[`details.${keys}`] = value
        }
    }

    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        if (tags && tags.length > 0) {
            // filtter prvious tags 
            const previousTags = tags
                .filter((tag) => tag.name && tag.isDeleted)
                .map(tagName => tagName.name)

            // filter new tags 
            const newTags = tags.filter(tag => tag.name && !tag.isDeleted)

            const removePreviousTags = await Course.findByIdAndUpdate(id,
                {
                    $pull: { tags: { name: { $in: previousTags } } }
                },
                {
                    new: true,
                    runValidators: true,
                    session
                })

            if (!removePreviousTags) {
                throw new AppError('Course info update failed', 400)
            }

            const addNewTags = await Course.findByIdAndUpdate(id,
                {
                    $addToSet: { tags: { $each: newTags } }
                },
                {
                    new: true,
                    runValidators: true,
                    session
                }
            )
            if (!addNewTags) {
                throw new AppError('Course info update failed', 400)
            }
            const basicInfo = await Course.findByIdAndUpdate(id, modifiedCourseInfo, {
                new: true,
                runValidators: true,
                session
            })
            if (!basicInfo) {
                throw new AppError('Course info update failed', 400)
            }
        }



        await session.commitTransaction()
        await session.endSession()
        const result = await Course.findById(id, { __v: 0 })
        return result
    } catch (error) {
        await session.abortTransaction()
        await session.endSession()
        throw new AppError('Course info update failed', 400)
    }
}

export const CourseService = {
    createCourseIntoDB,
    getAllCourses,
    getSingleCourse,
    updateCourseInfoIntoDB
}