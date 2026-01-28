const categoryService = require("../services/category.service");

const getCategories = async (req, res, next) => {
    try {
        const categories = await categoryService.getCategoriesService()

        return res.status(200).json({
            status: "success",
            categories,
            mensaje: "Categorias obtenidas"
        });
    } catch (error) {
        console.log("Error al obtener categorías");
        next(error)
    }
}

const addCategory = async (req, res, next) => {
    const params = req.body;

    try {
        const category = await categoryService.addCategoryService(params)

        console.log("Categoria registrada con exito");
        return res.status(200).json({
            status: "success",
            category,
            mensaje: "Categoria registrada con exito"
        });
    } catch (error) {
        console.log("Error al guardar categoria en la bd");
        next(error)
    }
}

const updateCategory = async (req, res, next) => {
    const params = req.body;
    const { id } = req.params

    try {
        const category = categoryService.updateCategoryService(id, params)

        console.log("Categoria y productos actualizados con éxito");
        return res.status(200).json({
            status: "success",
            category,
            mensaje: "Categoria actualizada correctamente"
        });

    } catch (error) {
        console.log("Error al actualizar categoria en la bd", error);
        next(error)
    }
}

const remove = async (req, res, next) => {
    const { id } = req.params

    try {
        await categoryService.removeCategoryService(id)

        console.log("Categoria y productos eliminados correctamente");
        return res.status(200).json({
            status: "success",
            mensaje: "Categoria y productos eliminados correctamente"
        });
    } catch (error) {
        console.log("Error al eliminar categoria en la bd", error);
        next(error)
    }
}

module.exports = {
    getCategories,
    addCategory,
    updateCategory,
    remove
}