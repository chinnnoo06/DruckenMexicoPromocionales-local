const HttpError = require("../helpers/httpError")
const categoryRepository = require("../repositories/category.repository");
const productRepository = require("../repositories/product.repository");

const getCategoriesService = async () => {
    const categories = await categoryRepository.getCategories()

    if (!categories || categories.length === 0) {
        throw new HttpError(404, "No hay categorías");
    }

    return categories
}

const addCategoryService = async (data) => {
    const category = await categoryRepository.addCategory(data)

    return category
}

const updateCategoryService = async (id, data) => {
    const category = await categoryRepository.findById(id)

    if (!category) {
        throw new HttpError(404, "No existe la categoría");
    }

    const oldCategoryName = category.name;

    category.name = data.name

    await category.save()

    if (oldCategoryName !== data.name) {
        await productRepository.updateMany(oldCategoryName, data.name)
    }

    return category
}

const removeCategoryService = async (id) => {
    const category = await categoryRepository.findById(id)

    if (!category) {
        throw new HttpError(404, "No existe la categoría");
    }

    await category.deleteOne()

    await productRepository.deleteMany(category.name)
}

module.exports = {
    getCategoriesService,
    addCategoryService,
    updateCategoryService,
    removeCategoryService
}