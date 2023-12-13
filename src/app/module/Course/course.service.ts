import mongoose from "mongoose";
import { AppError } from "../../errorHandler/appError";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import { ObjectId } from "mongodb";
import { Review } from "../Review/review.model";

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload)
    return result
}

const getAllCourses = async (query: Record<string, unknown>) => {
    const searchableFields = ["provider", "language", "title", "instructor"]

    console.log('query', query)
    // copy query fields from query
    const queryObj = { ...query }

    const excludedFields = ["page", "limit", "searchTerm", "sortBy", "sortOrder"]
    // delete constant field from queryObj
    excludedFields.forEach(excludeField => delete queryObj[excludeField])
    console.log('queryObj', queryObj)
    let searchTerm = ''
    if (query.searchTerm) {
        searchTerm = query.searchTerm as string
    }

    const search = searchableFields.map(serarcField => ({
        [serarcField]: { $regex: searchTerm, $options: 'i' }
    }))

    // search query [partial match]
    const searchQuery = Course.find({ $or: search })

    //filter query [exat match]
    const filterQuery = searchQuery.find(queryObj)

    // for paginate query
    const page = Number(query.page) || 1
    const limit = Number(query.limit) || 10
    const skip = (page - 1) * limit
    const paginateQuery = filterQuery.skip(skip).limit(limit)

    // for sortig 
    let sortString = '' || "title"
    if (query.sortBy && query.sortOrder) {
        const sortOrder = query.sortOrder
        const sortBy = query.sortBy
        sortString = `${sortOrder === "desc" ? "-" : ''}${sortBy}`
    }
    const sortQuery = await paginateQuery.sort(sortString)
    return sortQuery
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
        },
    ])
    return { course: result[0] }
}

const getBestCourse = async () => {
    const bestCourse = await Review.aggregate([
        {
            $group: {
                _id: "$courseId",
                averageRating: { $avg: "$rating" },
                reviewCount: { $sum: 1 }
            }
        },
        {
            $sort: { averageRating: -1 }
        },
        {
            $limit: 1
        }
    ])
    const { averageRating, reviewCount, _id } = bestCourse[0];

    const result = await Course.findById(_id, { __v: 0 })
    return {
        course: result,
        averageRating,
        reviewCount
    }
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
    updateCourseInfoIntoDB,
    getBestCourse
}