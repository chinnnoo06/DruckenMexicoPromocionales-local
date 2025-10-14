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

// Shuffle determinista usando seed
function shuffleWithSeed(array, seed) {
    let m = array.length, t, i;
    const arr = [...array];
    while (m) {
        i = Math.floor(random(seed) * m--);
        t = arr[m];
        arr[m] = arr[i];
        arr[i] = t;
        seed++;
    }
    return arr;
}

// Generador pseudoaleatorio simple
function random(seed) {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

const getProducts = async (req, res) => {
    const category = req.params.category;
    let page = parseInt(req.params.page);
    if (isNaN(page) || page < 1) page = 1;
    const itemsPerPage = 20;

    const filter = category === "all" ? {} : { category };

    try {
        const allProducts = await Product.find(filter);

        // 🔹 Seed basado en la hora actual (hora Unix / 3600)
        const seed = Math.floor(Date.now() / (1000 * 60 * 60));

        const shuffled = shuffleWithSeed(allProducts, seed);

        const startIndex = (page - 1) * itemsPerPage;
        const paginated = shuffled.slice(startIndex, startIndex + itemsPerPage);

        return res.status(200).send({
            status: "success",
            products: paginated,
            total: allProducts.length,
            page,
            itemsPerPage,
            pages: Math.ceil(allProducts.length / itemsPerPage)
        });

    } catch (error) {
        console.error("Error al listar productos", error);
        return res.status(400).json({
            status: "error",
            mensaje: "Error al listar productos"
        });
    }
};

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
    let itemsPerPage = 20;

    try {

        // Construimos filtro base
        const filter = {
            ...(category !== "all" && { category }),
            ...(search && {
                $or: [
                    { name: { $regex: search, $options: "i" } },
                    { key: { $regex: search, $options: "i" } }
                ]
            })
        };

        // Obtenemos los productos sin paginar (para poder reordenar)
        let allProducts = await Product.find(filter).sort({ _id: 1 });

        // Reordenamos: coincidencias exactas primero
        if (search) {
            allProducts = allProducts.sort((a, b) => {
                const aExact =
                    a.name.toLowerCase() === search.toLowerCase() ||
                    a.key.toLowerCase() === search.toLowerCase();
                const bExact =
                    b.name.toLowerCase() === search.toLowerCase() ||
                    b.key.toLowerCase() === search.toLowerCase();

                if (aExact && !bExact) return -1;
                if (!aExact && bExact) return 1;
                return 0;
            });
        }

        // Paginamos manualmente
        const totalDocs = allProducts.length;
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const docs = allProducts.slice(start, end);

        // Respondemos
        setTimeout(() => {
            return res.status(200).json({
                status: "success",
                products: docs,
                total: totalDocs,
                page,
                itemsPerPage,
                pages: Math.ceil(totalDocs / itemsPerPage)
            });
        }, 500);

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

        if (product.generalImage) {
            const generalPath = path.join(__dirname, "../assets", product.generalImage);
            fs.unlink(generalPath, (err) => {
                if (err) console.error(`Error eliminando ${product.generalImage}:`, err.message);
                else console.log(`Imagen general eliminada: ${product.generalImage}`);
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
        // CORRECCIÓN CLAVE: Aseguramos que 'req.body.data' es una cadena limpia
        const dataString = req.body.data.toString().trim();
        const params = JSON.parse(dataString);

        const files = req.files;

        // Asignar nombre de archivo de la imagen general
        if (files.generalImage && files.generalImage.length > 0) {
            params.generalImage = files.generalImage[0].filename;
        }

        // Asignar nombres de archivo a cada color
        if (files.colorImages && files.colorImages.length > 0) {
            params.colors = params.colors.map((color, index) => {
                if (files.colorImages[index]) {
                    color.image = files.colorImages[index].filename;
                } else {
                    color.image = null;
                }
                return color;
            });
        }

        // 3️⃣ Asignar span aleatorio (Asumiendo que spanOptions está definido)
        const spanOptions = ["Destacado", "Para ti", "Novedad", "Recomendado", "Favorito"];
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
        // CORRECCIÓN CLAVE: Aseguramos que 'req.body.data' es una cadena limpia
        const dataString = req.body.data.toString().trim();
        const params = JSON.parse(dataString);

        const files = req.files;

        // Obtener el producto actual
        const product = await Product.findById(params._id);
        if (!product) {
            return res.status(404).json({ status: "error", mensaje: "Producto no encontrado" });
        }

        // Lógica de eliminación de imágenes antiguas (solo si existen y hay nuevas para reemplazar)
        // Nota: Esta lógica elimina TODAS las imágenes del producto anterior. 
        // Si no quieres eliminar las imágenes que NO se reemplazan, esta lógica necesita ser revisada.
        if (product.colors && product.colors.length > 0) {
            product.colors.forEach(c => {
                if (c.image) {
                    const filePath = path.join(__dirname, "../assets", c.image);
                    fs.unlink(filePath, (err) => {
                        if (err) console.error(`Error eliminando ${c.image}:`, err.message);
                        else console.log(`Imagen eliminada: ${c.image}`);
                    });
                }
            });
        }

        if (product.generalImage) {
            const generalPath = path.join(__dirname, "../assets", product.generalImage);
            fs.unlink(generalPath, (err) => {
                if (err) console.error(`Error eliminando ${product.generalImage}:`, err.message);
                else console.log(`Imagen general eliminada: ${product.generalImage}`);
            });
        }

        // Asignar nombre de archivo de la imagen general (nuevas subidas)
        if (files.generalImage && files.generalImage.length > 0) {
            params.generalImage = files.generalImage[0].filename;
        } else {
            // Si no se sube una nueva imagen general, mantenemos la anterior (o la ponemos a null si no queremos guardarla)
            params.generalImage = product.generalImage;
        }

        // Asignar nombres de archivo a cada color (nuevas subidas)
        if (files.colorImages && files.colorImages.length > 0) {
            params.colors = params.colors.map((color, index) => {
                if (files.colorImages[index]) {
                    color.image = files.colorImages[index].filename;
                } else {
                    // Si no se subió una nueva imagen para este color, mantenemos la antigua
                    color.image = product.colors[index] ? product.colors[index].image : null;
                }
                return color;
            });
        } else {
            // Si no se subieron nuevas imágenes de color, mantenemos las antiguas
            params.colors = product.colors;
        }

        // 3️⃣ Asignar span aleatorio
        const spanOptions = ["Destacado", "Para ti", "Novedad", "Recomendado", "Favorito"];
        params.span = spanOptions[Math.floor(Math.random() * spanOptions.length)];

        // 4️⃣ Actualizar producto
        const productUpdated = await Product.findByIdAndUpdate(params._id, params, { new: true });

        return res.status(200).json({
            status: "success",
            product: productUpdated,
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
    prueba,
    getProducts,
    getOneProduct,
    findProducts,
    getCarouselProducts,
    deleteProduct,
    addProduct,
    updateProduct
}