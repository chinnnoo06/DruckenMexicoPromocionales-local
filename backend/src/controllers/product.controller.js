const Product = require("../models/Product");
const spanOptions = require("../helpers/spanOptions")
const productService = require('../services/product.service')

const getProducts = async (req, res, next) => {
    const category = req.params.category;
    let page = parseInt(req.params.page);
    if (isNaN(page) || page < 1) page = 1;

    try {
        const data = await productService.getProductsService(category, page)

        return res.status(200).send({
            status: "success",
            products: data.products,
            total: data.total,
            page: data.page,
            itemsPerPage: data.itemsPerPage,
            pages: data.pages
        });

    } catch (error) {
        console.error("Error al listar productos", error);
        next(error)
    }
};

const getOneProduct = async (req, res, next) => {
    const id = req.params.id;

    try {
        const product = await productService.getOneProductService(id)

        return res.status(200).send({
            status: "success",
            product
        });

    } catch (error) {
        console.error("Error al obtener producto", error);
        next(error)
    }
}

const findProducts = async (req, res, next) => {
    const search = req.params.search || "";
    const category = req.params.category;
    let page = parseInt(req.params.page);
    if (isNaN(page) || page < 1) page = 1;

    try {
        const data = await productService.findProductsService(category, page, search)

        setTimeout(() => {
            return res.status(200).json({
                status: "success",
                products: data.products,
                total: data.total,
                page: data.page,
                itemsPerPage: data.itemsPerPage,
                pages: data.pages
            });
        }, 500);

    } catch (error) {
        console.error("Error al realizar busqueda", error);
        next(error)
    }
}

const getCarouselProducts = async (req, res, next) => {
    try {
        const products = await productService.getCarouselProductsService()

        return res.status(200).send({
            status: "success",
            products
        });
    } catch (error) {
        console.error("Error al obtener productos del carrusel", error);
        next(error)
    }
}

const deleteProduct = async (req, res, next) => {
    const id = req.params.id

    try {
        await productService.deleteProductService(id)

        return res.status(200).send({
            status: "success",
            mensaje: "Producto eliminado correctamente y sus imágenes eliminadas"
        });
    } catch (error) {
        console.log("Error al eliminar el producto");
        next(error)
    }
}

const addProduct = async (req, res, next) => {
    const params = req.body;
    const files = req.files;

    try {
        const product = await productService.addProductService(params, files)

        return res.status(200).json({
            status: "success",
            product,
            mensaje: "Producto registrado con éxito"
        });

    } catch (error) {
        console.error("Error al agregar el producto:", error);
        next(error)
    }
};

const updateProduct = async (req, res, next) => {
    const { id } = req.params
    const params = req.body
    const files = req.files;

    try {
        const product = await productService.updateProductService(id, params, files)

        return res.status(200).json({
            status: "success",
            product,
            mensaje: "Producto actualizado con éxito"
        });
    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        next(error)
    }
};

const getTotalCountProducts = async (req, res, next) => {
    try {
        const count = await productService.getTotalCountProductsService()

        return res.status(200).json({
            status: "success",
            count,
            mensaje: "Total obtenido con éxito"
        });
    } catch (error) {
        console.error("Error al obtener total:", error);
        next(error)
    }
};

const randomSpan = async () => {
    try {
        const Products = await Product.find();

        for (let product of Products) {
            const newSpan = spanOptions[Math.floor(Math.random() * spanOptions.length)];
            await Product.findByIdAndUpdate(product._id, { span: newSpan });
        }

        console.log("Span actualizado");

    } catch (error) {
        console.error("Error al obtener productos para colocar span:", error);
    }
}

setInterval(randomSpan, 24 * 60 * 60 * 1000);

module.exports = {
    getProducts,
    getOneProduct,
    findProducts,
    getCarouselProducts,
    deleteProduct,
    addProduct,
    updateProduct,
    getTotalCountProducts
}