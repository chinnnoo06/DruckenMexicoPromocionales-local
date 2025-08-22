// Importar modelos
const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

const spanOptions = ["Destacado", "Para ti", "Novedad", "Recomendado", "Favorito"];

const prueba = async (req, res) => {
    return res.status(200).json({
        mensaje: "Hola",
    });
}

const getProducts = async (req, res) => {
    const category = req.params.category;
    let page = parseInt(req.params.page);
    if (isNaN(page) || page < 1) page = 1;
    let itemsPerPage = 20;


    const filter = category === "all" ? {} : { category };

    try {
        const products = await Product.paginate(filter, { page, limit: itemsPerPage, sort: { _id: 1 } });

        setTimeout(() => {
            return res.status(200).send({
                status: "success",
                products: products.docs,
                total: products.totalDocs,
                page: products.page,
                itemsPerPage: products.limit,
                pages: products.totalPages
            });
        }, 1000);

    } catch (error) {
        console.error("Error al listar productos", error);
        return res.status(400).json({
            status: "error",
            mensaje: "Error al listar productos"
        });
    }
}

const getOneProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findById(id);

        return res.status(200).send({
            status: "success",
            product: product
        });

    } catch (error) {
        console.error("Error al obtener producto", error);
        return res.status(400).json({
            status: "error",
            mensaje: "Error al obtener producto"
        });
    }
}

const findProducts = async (req, res) => {
    const search = req.params.search || "";
    const category = req.params.category || "all";
    let page = parseInt(req.params.page);
    if (isNaN(page) || page < 1) page = 1;
    let itemsPerPage = 10;

    const filter = {
        ...(category !== "all" && { category }),
        name: { $regex: search, $options: "i" }
    };

    try {
        const products = await Product.paginate(filter, {
            page,
            limit: itemsPerPage,
            sort: { _id: 1 }
        });

        setTimeout(() => {
            return res.status(200).send({
                status: "success",
                products: products.docs,
                total: products.totalDocs,
                page: products.page,
                itemsPerPage: products.limit,
                pages: products.totalPages
            });
        }, 1000)


    } catch (error) {
        console.error("Error al realizar busqueda", error);
        return res.status(400).json({
            status: "error",
            mensaje: "Error al realizar busqueda"
        });
    }
}

const getCarouselProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            { $sample: { size: 15 } } // 15 productos random
        ]);

        return res.status(200).send({
            status: "success",
            products
        });
    } catch (error) {
        console.error("Error al obtener productos del carrusel", error);
        return res.status(400).json({
            status: "error",
            mensaje: "Error al obtener productos del carrusel"
        });
    }
}

const deleteProduct = async (req, res) => {
    const id = req.params.id

    try {
        const product = await Product.findOneAndDelete({ _id: id });

        if (!product) {
            console.log("No se ha encontrado el producto en la base de datos");
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el producto en la base de datos"
            });
        }

        if (product.colors && product.colors.length > 0) {
            product.colors.forEach(c => {
                if (c.image) {
                    const filePath = path.join(__dirname, "../assets", c.image);
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`Error eliminando ${c.image}:`, err.message);
                        } else {
                            console.log(`Imagen eliminada: ${c.image}`);
                        }
                    });
                }
            });
        }

        console.log("Producto e imágenes eliminados correctamente");
        return res.status(200).send({
            status: "success",
            mensaje: "Producto eliminado correctamente y sus imágenes eliminadas"
        });
    } catch (error) {
        console.log("Error al eliminar el producto");
        return res.status(400).json({
            status: "error",
            mensaje: "Error al eliminar el producto"
        });
    }
}

const addProduct = async (req, res) => {
    try {
        const params = JSON.parse(req.body.data);
        const files = req.files;

        params.colors = params.colors.map((color, index) => {
            if (files[index]) {
                color.image = files[index].filename;
            } else {
                color.image = null;
            }
            return color;
        });

        params.span = spanOptions[Math.floor(Math.random() * spanOptions.length)];

        const newProduct = new Product(params);
        const createProduct = await newProduct.save();

        return res.status(200).json({
            status: "success",
            product: createProduct,
            mensaje: "Producto registrado con éxito"
        });

    } catch (error) {
        console.error("Error al agregar el producto:", error);
        return res.status(400).json({
            status: "error",
            mensaje: "Error al agregar el producto"
        });
    }
};


const updateProduct = async (req, res) => {
    try {
        const params = JSON.parse(req.body.data);
        const files = req.files;

        const product = await Product.findById(params._id);

        if (!product) {
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el producto en la base de datos"
            });
        }

        const productName = params.name.replace(/\s+/g, '-');
        const oldProductName = product.name.replace(/\s+/g, '-');

        // Verificar si el nombre del producto ha cambiado
        const productNameChanged = productName !== oldProductName;

        params.colors = params.colors.map((color, index) => {
            const oldColor = product.colors[index];

            // Si hay un archivo nuevo
            if (files && files[index]) {
                if (oldColor && oldColor.image) {
                    const filePath = path.join(__dirname, "../assets", oldColor.image);
                    // Usar versión asíncrona para no bloquear el event loop
                    fs.unlink(filePath, (err) => {
                        if (err) console.error(`Error eliminando ${oldColor.image}:`, err.message);
                    });
                }
                color.image = files[index].filename;
            }
            // Si no hay archivo nuevo pero existe imagen antigua
            else if (oldColor && oldColor.image) {
                // Renombrar archivo si cambió el nombre del producto o del color
                const ext = path.extname(oldColor.image);
                const oldFilePath = path.join(__dirname, "../assets", oldColor.image);

                // Obtener el nombre del color actual y antiguo
                const oldColorName = oldColor.color ? oldColor.color.replace(/\s+/g, '-') : "color";
                const newColorName = color.color ? color.color.replace(/\s+/g, '-') : "color";

                // Determinar si debemos renombrar
                const shouldRename = productNameChanged || (oldColorName !== newColorName);

                if (shouldRename) {
                    const newFileName = `${productName}-${newColorName}${ext}`;
                    const newFilePath = path.join(__dirname, "../assets", newFileName);

                    try {
                        // Renombrar archivo (síncrono pero necesario para el flujo)
                        fs.renameSync(oldFilePath, newFilePath);
                        color.image = newFileName;
                    } catch (error) {
                        console.error("Error renombrando archivo:", error);
                        // Si hay error al renombrar, mantener el nombre antiguo
                        color.image = oldColor.image;
                    }
                } else {
                    // Mantener el nombre actual si no hay cambios
                    color.image = oldColor.image;
                }
            }

            return color;
        });

        const spanOptions = ["Destacado", "Para ti", "Novedad", "Recomendado", "Favorito"];
        params.span = spanOptions[Math.floor(Math.random() * spanOptions.length)];

        const updatedProduct = await Product.findOneAndUpdate({ _id: params._id }, params, { new: true });

        if (!updatedProduct) {
            console.log("No se ha encontrado el producto en la base de datos");
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el producto en la base de datos"
            });
        }

        return res.status(200).json({
            status: "success",
            product: updatedProduct,
            mensaje: "Producto actualizado con éxito"
        });

    } catch (error) {
        console.error("Error al actualizar el producto:", error);
        return res.status(400).json({
            status: "error",
            mensaje: "Error al actualizar el producto"
        });
    }
};

const randomSpan = async () => {
    try {
        const Products = await Product.find();

        for(let product of Products){
            const newSpan = spanOptions[Math.floor(Math.random() * spanOptions.length)];
            await Product.findByIdAndUpdate(product._id, {span: newSpan});
        }

        console.log("Span actualizado");

    } catch (error) {
        console.error("Error al obtener productos para colocar span:", error);
    }
}

setInterval(randomSpan, 24 * 60 * 60 * 1000);

module.exports = {
    prueba,
    getProducts,
    getOneProduct,
    findProducts,
    getCarouselProducts,
    deleteProduct,
    addProduct,
    updateProduct
}