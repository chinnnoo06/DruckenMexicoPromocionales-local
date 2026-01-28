const Category = require("../models/Category");
const Product = require("../models/Product");

const categoryRepository = {
    async getCategories() {
        return Category.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "name",
                    foreignField: "category",
                    as: "products"
                }

            },
            {
                $addFields: {
                    productCount: { $size: "$products" }
                }
            },
            {
                $project: {
                    products: 0
                }
            }
        ]);
    },

    async addCategory(data) {
        return Category.create(data)
    },

    async findById(id) {
        return Category.findById(id);
    },

    async findByName(name) {
        return Category.findOne({ name });
    },

    async updateMany(oldCategoryName, data) {
        return Product.updateMany(
            { category: oldCategoryName },
            { $set: { category: data.name } }
        );
    },

    async deleteMany(id) {
        return Product.deleteMany({ category: id });
    },
}

module.exports = categoryRepository