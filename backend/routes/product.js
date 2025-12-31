const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const ProductController = require("../controllers/product");
const check = require("../middlewares/auth");
const { convertNewImagesToWebP } = require("../middlewares/convertNewImagesToWebP");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './assets/');
  },
  filename: function (req, file, cb) {
    try {
      const data = JSON.parse(req.body.data);
      const productKey = data.key.replace(/\s+/g, '-');
      const timestamp = Date.now();
      let fileName;

      if (file.fieldname === 'generalImage') {
        fileName = `${productKey}-General-${timestamp}${path.extname(file.originalname)}`;
      } else if (file.fieldname === 'colorImages') {
        if (!storage.counter) storage.counter = 0;
        const index = storage.counter++;

        let colorName = "color";
        if (data.colors && data.colors[index]) {
          colorName = data.colors[index].color.replace(/\s+/g, '-');
        }
        fileName = `${productKey}-${colorName}-${timestamp}${path.extname(file.originalname)}`;
      }
      cb(null, fileName);
    } catch (err) {
      cb(err);
    }
  }
});

const upload = multer({ storage });

router.get("/prueba-producto", ProductController.prueba);
router.get("/obtener-productos/:category/:page", ProductController.getProducts);
router.get("/obtener-producto/:id", ProductController.getOneProduct);
router.get("/buscar-productos/:category/:search/:page", ProductController.findProducts);
router.get("/obtener-productos-carrusel", ProductController.getCarouselProducts);

router.delete("/eliminar-producto/:id", check.auth, ProductController.deleteProduct);

router.post(
  "/crear-producto",
  check.auth,
  (req, res, next) => { storage.counter = 0; next(); },
  upload.fields([{ name: 'generalImage', maxCount: 1 }, { name: 'colorImages', maxCount: 20 }]),
  convertNewImagesToWebP,
  ProductController.addProduct
);

router.put(
  "/actualizar-producto",
  check.auth,
  (req, res, next) => { storage.counter = 0; next(); },
  upload.fields([{ name: 'generalImage', maxCount: 1 }, { name: 'colorImages', maxCount: 20 }]),
  convertNewImagesToWebP,
  ProductController.updateProduct
);

module.exports = router;
