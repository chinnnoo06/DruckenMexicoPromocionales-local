const express = require("express");
const multer = require("multer");
const { body, param } = require("express-validator")
const path = require("path");
const router = express.Router();
const ProductController = require("../controllers/product.controller");
const check = require("../middlewares/auth");
const { convertNewImagesToWebP } = require("../middlewares/convertNewImagesToWebP");
const handleInputErrors = require("../middlewares/handleInputErrors");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, '../../assets');
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    try {
      const productKey = req.body.key.replace(/\s+/g, '-');
      const timestamp = Date.now();
      let fileName;

      if (file.fieldname === 'generalImage') {
        fileName = `${productKey}-General-${timestamp}${path.extname(file.originalname)}`;
      }

      if (file.fieldname === 'colorImages') {
        if (!storage.counter) storage.counter = 0;
        const index = storage.counter++;

        let colorName = "color";
        if (req.body.colors && req.body.colors[index]) {
          colorName = req.body.colors[index].color.replace(/\s+/g, '-');
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

router.get("/obtener-productos/:category/:page",
  param('category').isAlpha('es-ES', { ignore: ' -_' }).withMessage('La categoría es obligatoria').trim(),
  param('page').isInt({ min: 1 }).withMessage('La página debe ser un número mayor a 0'),
  handleInputErrors,
  ProductController.getProducts
);

router.get("/obtener-producto/:id",
  param('id').isMongoId().withMessage('Id invalido'),
  handleInputErrors,
  ProductController.getOneProduct
);

router.get("/buscar-productos/:category/:search/:page",
  param('category').isAlpha('es-ES', { ignore: ' -_' }).withMessage('La categoría es obligatoria').trim(),
  param('page').isInt({ min: 1 }).withMessage('La página debe ser un número mayor a 0'),
  handleInputErrors,
  ProductController.findProducts

);

router.get("/obtener-productos-carrusel",
  ProductController.getCarouselProducts
);

router.delete("/eliminar-producto/:id",
  check.auth,
  param('id').isMongoId().withMessage('Id invalido'),
  handleInputErrors,
  ProductController.deleteProduct
);

router.post("/crear-producto",
  check.auth,

  (req, res, next) => {
    storage.counter = 0;
    next();
  },

  upload.fields([
    { name: 'generalImage', maxCount: 1 },
    { name: 'colorImages', maxCount: 20 }
  ]),

  body("name").notEmpty().withMessage("Nombre obligatorio"),
  body("price").isNumeric().withMessage("Precio inválido"),
  body("category").notEmpty().isAlpha('es-ES', { ignore: ' -_' }).withMessage("Categoría inválida"),
  body("key").notEmpty().withMessage("Clave obligatorio"),
  body("printingTechnique").notEmpty().withMessage("Técnica de impresión obligatoria"),
  body("material").notEmpty().withMessage("Material obligatorio"),
  body("measures").notEmpty().withMessage("Medidas obligatorias"),
  body("printingMeasures").notEmpty().withMessage("Medidas de impresión obligatorias"),
  body("minQuantity").isInt({ min: 1 }).withMessage("Cantidad mínima invalida"),
  body("colors").isArray({ min: 1 }),
  body("colors.*.color").notEmpty().withMessage("Color obligatorio"),
  body("colors.*.hex").notEmpty().isHexColor().withMessage("Color hex invalido"),

  handleInputErrors,

  convertNewImagesToWebP,
  ProductController.addProduct
);

router.put("/actualizar-producto/:id",
  check.auth,

  (req, res, next) => {
    storage.counter = 0;
    next();
  },

  upload.fields([
    { name: 'generalImage', maxCount: 1 },
    { name: 'colorImages', maxCount: 20 }
  ]),

  param('id').isMongoId().withMessage('Id invalido'),
  body("name").notEmpty().withMessage("Nombre obligatorio"),
  body("price").isNumeric().withMessage("Precio inválido"),
  body("category").notEmpty().isAlpha('es-ES', { ignore: ' -_' }).withMessage("Categoría inválida"),
  body("key").notEmpty().withMessage("Clave obligatorio"),
  body("printingTechnique").notEmpty().withMessage("Técnica de impresión obligatoria"),
  body("material").notEmpty().withMessage("Material obligatorio"),
  body("measures").notEmpty().withMessage("Medidas obligatorias"),
  body("printingMeasures").notEmpty().withMessage("Medidas de impresión obligatorias"),
  body("minQuantity").isInt({ min: 1 }).withMessage("Cantidad mínima invalida"),
  body("colors").isArray({ min: 1 }),
  body("colors.*.color").notEmpty().withMessage("Color obligatorio"),
  body("colors.*.hex").notEmpty().isHexColor().withMessage("Color hex invalido"),

  handleInputErrors,

  convertNewImagesToWebP,
  ProductController.updateProduct
);

module.exports = router;
