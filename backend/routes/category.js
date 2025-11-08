const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categorys");
const check = require("../middlewares/auth");

// Definir rutas
router.get("/prueba-category", check.auth, CategoryController.prueba);
router.get("/obtener-categorias", CategoryController.getCategorys);
router.post("/crear-categoria", check.auth, CategoryController.addCategory)
router.post("/actualizar-categoria", check.auth, CategoryController.updateCategory)
router.delete("/eliminar-categoria/:id", check.auth, CategoryController.remove)

// Exportar rutes
module.exports = router;