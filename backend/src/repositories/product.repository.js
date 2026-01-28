
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

}

module.exports = productRepository