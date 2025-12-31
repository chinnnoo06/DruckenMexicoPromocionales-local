// Importar modelos
const Category = require("../models/Category");
const Product = require("../models/Product");
const fs = require("fs");
const path = require("path");

const prueba = async (req, res) => {
    return res.status(200).json({
        mensaje: "Hola",
    });
}

const getCategorys = async (req, res) => {
    try {
        const categorys = await Category.aggregate([
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

        return res.status(200).json({
            status: "success",
            categorys,
            mensaje: "Categorias obtenidas"
        });
    } catch (error) {
        console.log("Error al obtener categorías");
        return res.status(400).json({
            status: "error",
            mensaje: "Error al obtener categorías"
        });
    }

}

const addCategory = async (req, res) => {
    let params = req.body;

    // Comprobar que me llegan bien (+ validación)
    if (!params.name) {
        console.log("Faltan datos por enviar");
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }

    try {
        const newCategory = new Category(params);
        const createCategory = await newCategory.save();

        console.log("Categoria registrada con exito");
        return res.status(200).json({
            status: "success",
            category: createCategory,
            mensaje: "Categoria registrada con exito"
        });
    } catch (error) {
        console.log("Error al guardar categoria en la bd");
        return res.status(400).json({
            status: "error",
            mensaje: "Error al guardar categoria en la bd"
        });
    }
}

const updateCategory = async (req, res) => {
    let params = req.body;
    let categoryId = params._id;

    // Comprobar que me llegan bien (+ validación)
    if (!params.name) {
        console.log("Faltan datos por enviar");
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }

    try {
        // Obtener la categoría actual para saber su nombre anterior
        const oldCategory = await Category.findById(categoryId);
        if (!oldCategory) {
            return res.status(400).json({
                status: "error",
                mensaje: "Categoría no encontrada"
            });
        }

        // Actualizar categoría
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, params, { new: true });

        // Si el nombre cambió, actualizar productos
        if (oldCategory.name !== params.name) {
            await Product.updateMany(
                { category: oldCategory.name },
                { $set: { category: params.name } }
            );
        }

        console.log("Categoria y productos actualizados con éxito");
        return res.status(200).json({
            status: "success",
            category: updatedCategory,
            mensaje: "Categoria actualizada correctamente"
        });

    } catch (error) {
        console.log("Error al actualizar categoria en la bd", error);
        return res.status(400).json({
            status: "error",
            mensaje: "Error al guardar categoria en la bd"
        });
    }
}

const remove = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(400).json({
                status: "error",
                mensaje: "Categoria no encontrada"
            });
        }

        // Borrar categoría
        await Category.findByIdAndDelete(categoryId);

        // Eliminar productos con esa categoría
        await Product.deleteMany({ category: category.name });

        console.log("Categoria y productos eliminados correctamente");
        return res.status(200).json({
            status: "success",
            mensaje: "Categoria y productos eliminados correctamente"
        });
    } catch (error) {
        console.log("Error al eliminar categoria en la bd", error);
        return res.status(400).json({
            status: "error",
            mensaje: "Error al eliminar categoria en la bd"
        });
    }

}

module.exports = {
    prueba,
    getCategorys,
    addCategory,
    updateCategory,
    remove
}