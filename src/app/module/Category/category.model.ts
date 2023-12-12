import { Schema, model } from "mongoose";

export type TCategory = {
    name: string
}

const categorySchema = new Schema<TCategory>({
    name: {
        type: String,
        required: [true, "category name is required"],
        unique: true
    }
})


export const Category = model<TCategory>('Category', categorySchema)