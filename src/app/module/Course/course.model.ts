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
})

// const detailsSchema = new Schema <TDe>

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
        required: [true, "durationInWeeks is required"]
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


export const Course = model<TCourse>("Course", courseSchema)
