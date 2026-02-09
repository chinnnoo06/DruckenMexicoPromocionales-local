
const Product = require("../models/Product");

const productRepository = {
    async findAll(filter) {
        return Product.find(filter).sort({ _id: 1 });
    },

    async findById(id) {
        return Product.findById(id);
    },

    async getCarouselProducts() {
        return Product.aggregate([
            { $sample: { size: 15 } }
        ]);
    },

    async addProduct(data) {
        return Product.create(data)
    },

    async getTotalCount() {
        return Product.countDocuments()
    },

    async updateMany(oldCategoryName, newCategoryName) {
        return Product.updateMany(
            { category: oldCategoryName },
            { $set: { category: newCategoryName } }
        );
    },

    async deleteMany(categoryName) {
        return Product.deleteMany({ category: categoryName });
    }

}

module.exports = productRepository