const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");
const check = require("../middlewares/auth");

// Definir rutas
router.get("/prueba-user", UserController.prueba);
router.post("/login", UserController.login)
router.post("/register", UserController.register);
router.get("/check", check.auth, UserController.checkAuth);
router.post("/logout", check.auth, UserController.logout)

// Exportar rutes
module.exports = router;