const express = require("express");
const { body } = require("express-validator")
const router = express.Router();
const UserController = require("../controllers/user.controller");
const check = require("../middlewares/auth");
const handleInputErrors = require("../middlewares/handleInputErrors");

// Definir rutas
router.post("/register",
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('password').notEmpty().withMessage('La constraseña es obligatoria'),
    handleInputErrors,
    UserController.register
)

router.post("/login",
    body('username').notEmpty().withMessage('El nombre de usuario es obligatorio'),
    body('password').notEmpty().withMessage('La constraseña es obligatoria'),
    handleInputErrors,
    UserController.login
)

router.get("/check", check.auth, UserController.checkAuth);

router.post("/logout", check.auth, UserController.logout)

module.exports = router;