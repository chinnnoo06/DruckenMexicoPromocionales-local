const express = require("express");
const { body, param } = require("express-validator")
const CategoryController = require("../controllers/category.controller");
const check = require("../middlewares/auth");
const handleInputErrors = require("../middlewares/handleInputErrors")

const router = express.Router();

// Definir rutas
router.get("/obtener-categorias",
    CategoryController.getCategories
);
router.post("/crear-categoria",
    check.auth,
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    handleInputErrors,
    CategoryController.addCategory
)

router.post("/actualizar-categoria/:id",
    check.auth, 
    param('id').isMongoId().withMessage('El ID es incorrecto'),
    body('name').notEmpty().withMessage('El nombre es obligatorio'),
    handleInputErrors,
    CategoryController.updateCategory

)
router.delete("/eliminar-categoria/:id", 
    check.auth, 
    param('id').isMongoId().withMessage('El ID es incorrecto'),
    CategoryController.remove

)

module.exports = router;