import { Schema, Types, model } from "mongoose";

export type TCategory = {
    name: string,
    createdBy: Types.ObjectId
}

const categorySchema = new Schema<TCategory>({
    name: {
        type: String,
        required: [true, "category name is required"],
        unique: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})


export const Category = model<TCategory>('Category', categorySchema)