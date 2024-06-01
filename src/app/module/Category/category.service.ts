import { Category, TCategory } from "./category.model"


const createCategoryIntoDB = async (payload: TCategory) => {
    const result = await Category.create(payload)
    return result
}

const getAllCategories = async () => {
    const result = await Category.find().populate('createdBy')
    return result
}

const getSingleCategory = async (id: string) => {
    const result = await Category.findById(id)
    return result
}

export const CategoryService = {
    createCategoryIntoDB,
    getAllCategories,
    getSingleCategory
}