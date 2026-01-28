const HttpError = require("../helpers/httpError");
const spanOptions = require("../helpers/spanOptions")
const fs = require("fs");
const path = require("path");
const productRepository = require("../repositories/product.repository");
const { findCategoryByNameService } = require("./category.service");
const deleteUploadedFiles = require("../helpers/deleteFiles");

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

const getProductsService = async (category, page) => {
    let categoryName = ''

    if (category !== "todos") {
        const categoryExist = await findCategoryByNameService(category)

        if (!categoryExist) {
            throw new HttpError(404, "No existe esa categoría");
        }
        categoryName = categoryExist.name
    }

    const itemsPerPage = 20;

    const filter = category === "todos" ? {} : { category: categoryName };

    const allProducts = await productRepository.findAll(filter)

    if (!allProducts || allProducts.length === 0) {
        throw new HttpError(404, "No hay productos");
    }

    // 🔹 Seed basado en la hora actual (hora Unix / 3600)
    const seed = Math.floor(Date.now() / (1000 * 60 * 60));

    const shuffled = shuffleWithSeed(allProducts, seed);

    const startIndex = (page - 1) * itemsPerPage;
    const paginated = shuffled.slice(startIndex, startIndex + itemsPerPage);

    const data = {
        products: paginated,
        total: allProducts.length,
        page,
        itemsPerPage,
        pages: Math.ceil(allProducts.length / itemsPerPage)
    }

    return data
}

const getOneProductService = async (id) => {
    const product = await productRepository.findById(id)

    if (!product) {
        throw new HttpError(404, "No existe el producto");
    }

    return product
}

const findProductsService = async (category, page, search) => {
    let categoryName = ''

    if (category !== "all") {
        const categoryExist = await findCategoryByNameService(category)

        if (!categoryExist) {
            throw new HttpError(404, "No existe esa categoría");
        }
        categoryName = categoryExist.name
    }

    let itemsPerPage = 20;

    const filter = {
        ...(category !== "all" && { category: categoryName }),
        ...(search && {
            $or: [
                { name: { $regex: search, $options: "i" } },
                { key: { $regex: search, $options: "i" } }
            ]
        })
    };

    let allProducts = await productRepository.findAll(filter)

    if (!allProducts || allProducts.length === 0) {
        throw new HttpError(404, "No hay productos");
    }

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

    const data = {
        products: docs,
        total: totalDocs,
        page,
        itemsPerPage,
        pages: Math.ceil(totalDocs / itemsPerPage)
    }

    return data
}

const getCarouselProductsService = async () => {
    const products = await productRepository.getCarouselProducts()

    if (!products || products.lenght === 0) {
        throw new HttpError(404, "No hay productos");
    }

    return products
}

const deleteProductService = async (id) => {
    const product = await productRepository.findById(id)

    if (!product) {
        throw new HttpError(404, "No existe el producto");
    }

    await product.deleteOne()

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
}

const addProductService = async (data, files) => {
    try {
        // Asignar nombre de archivo de la imagen general
        if (files.generalImage && files.generalImage.length > 0) {
            data.generalImage = files.generalImage[0].filename;
        }

        // Asignar nombres de archivo a cada color
        if (files.colorImages && files.colorImages.length > 0) {
            data.colors = data.colors.map((color, index) => {
                if (files.colorImages[index]) {
                    color.image = files.colorImages[index].filename;
                } else {
                    color.image = null;
                }
                return color;
            });
        }

        //  Asignar span aleatorio (Asumiendo que spanOptions está definido)z
        data.span = spanOptions[Math.floor(Math.random() * spanOptions.length)];

        const product = await productRepository.addProduct(data)

        return product
    } catch (error) {
        deleteUploadedFiles(files)
        throw error
    }
}

const updateProductService = async (id, data, files) => {
    try {
        const product = await productRepository.findById(id)

        if (!product) {
            throw new HttpError(404, "No existe el producto");
        }

        // Esta lógica elimina TODAS las imágenes del producto anterior. 
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
            data.generalImage = files.generalImage[0].filename;
        }

        // Asignar nombres de archivo a cada color (nuevas subidas)
        data.colors = data.colors.map((color, index) => {
            color.image = files.colorImages[index].filename;
            return color;
        });

        data.span = spanOptions[Math.floor(Math.random() * spanOptions.length)];

        product.set(data);

        await product.save()

        return product
    } catch (error) {
        deleteUploadedFiles(files)
        throw error
    }
}

module.exports = {
    getProductsService,
    getOneProductService,
    findProductsService,
    getCarouselProductsService,
    deleteProductService,
    addProductService,
    updateProductService
}