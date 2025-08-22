const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const ProductController = require("../controllers/product");
const check = require("../middlewares/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/');
  },
  filename: function (req, file, cb) {
    try {
      const data = JSON.parse(req.body.data);
      const productName = data.name.replace(/\s+/g, '-');

      // Multer pasa un segundo argumento: file.originalname, pero no hay índice aquí
      // Así que usamos un contador en closure
      if (!storage.counter) storage.counter = 0;
      const index = storage.counter++;

      let colorName = "color";
      if (data.colors && data.colors[index]) {
        colorName = data.colors[index].color.replace(/\s+/g, '-');
      }

      const fileName = `${productName}-${colorName}${path.extname(file.originalname)}`;
      cb(null, fileName);
    } catch (err) {
      cb(err);
    }
  }
});

// Resetear contador por cada request
const upload = multer({ storage });

// Definir rutas
router.get("/prueba-producto", ProductController.prueba);
router.get("/obtener-productos/:category/:page", ProductController.getProducts);
router.get("/obtener-producto/:id", ProductController.getOneProduct);
router.get("/buscar-productos/:category/:search", ProductController.findProducts);
router.get("/obtener-productos-carrusel", ProductController.getCarouselProducts);


//Admin
router.get("/obtener-productos-admin/:category/:page", check.auth, ProductController.getProducts);
router.get("/obtener-producto-admin/:id", check.auth, ProductController.getOneProduct);
router.get("/buscar-productos-admin/:category/:search", check.auth, ProductController.findProducts);
router.delete("/eliminar-producto/:id", check.auth, ProductController.deleteProduct)
router.post("/crear-producto", (req, res, next) => {
  storage.counter = 0; // reinicia contador para cada request
  next();
}, upload.array("colorImages"), ProductController.addProduct);
router.post("/actualizar-producto", (req, res, next) => {
  storage.counter = 0; // reinicia contador para cada request
  next();
}, upload.array("colorImages"), ProductController.updateProduct);


// Exportar rutes
module.exports = router;