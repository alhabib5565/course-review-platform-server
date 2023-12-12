import { Schema, model } from "mongoose";
import { TCourse, TTags } from "./course.interface";

const tagSchema = new Schema<TTags>({
    name: {
        type: String,
        required: [true, "tag name is required"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    _id: false
})


const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        unique: true,
        required: [true, "title is required"]
    },
    instructor: {
        type: String,
        required: [true, "instructor is required"]
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, 'categoryId is required']
    },
    price: {
        type: Number,
        required: [true, 'price is required']
    },
    tags: {
        type: [tagSchema],
        required: [true, 'tags is required']
    },
    startDate: {
        type: String,
        required: [true, "satartDate is required"]
    },
    endDate: {
        type: String,
        required: [true, "endDate is required"]
    },
    language: {
        type: String,
        required: [true, "language is required"]
    },
    provider: {
        type: String,
        required: [true, "language is required"]
    },
    durationInWeeks: {
        type: Number,
    },
    details: {
        level: {
            type: String,
            required: [true, "level is required"]
        },
        description: {
            type: String,
            required: [true, "description is required"]
        }
    }
})


courseSchema.pre('save', function (next) {
    const startDate = new Date(this.startDate)
    const endDate = new Date(this.endDate)
    const weeks = 1000 * 60 * 60 * 24 * 7
    const durationInWeeks = Math.ceil((endDate.getTime() - startDate.getTime()) / weeks)
    this.durationInWeeks = durationInWeeks
    next()
})

export const Course = model<TCourse>("Course", courseSchema)

