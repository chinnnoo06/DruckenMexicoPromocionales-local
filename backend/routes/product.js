const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const router = express.Router();
const ProductController = require("../controllers/product");
const check = require("../middlewares/auth");

// === Configuración de Multer ===
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

// === Middleware para convertir solo las nuevas imágenes a WebP con reintento ===
const convertNewImagesToWebP = async (req, res, next) => {
  try {
    const filesToConvert = [];

    if (req.files.generalImage) filesToConvert.push(...req.files.generalImage);
    if (req.files.colorImages) filesToConvert.push(...req.files.colorImages);

    for (const file of filesToConvert) {
      const ext = path.extname(file.path).toLowerCase();
      const outputPath = file.path.replace(ext, ".webp");

      let converted = false;
      let attempts = 0;
      const maxAttempts = 3;

      while (!converted && attempts < maxAttempts) {
        try {
          attempts++;
          await sharp(file.path)
            .webp({ quality: 80 })
            .toFile(outputPath);

          // Eliminación segura del archivo original
          try {
            if (fs.existsSync(file.path)) fs.unlinkSync(file.path);
          } catch (unlinkErr) {
            console.warn(`No se pudo eliminar el archivo original ${file.filename}:`, unlinkErr);
          }

          file.path = outputPath;
          file.filename = path.basename(outputPath);
          console.log(`Convertido a WebP: ${file.filename} (Intento ${attempts})`);
          converted = true;
        } catch (err) {
          console.warn(`Error convirtiendo ${file.filename} a WebP (Intento ${attempts}):`, err);
          if (attempts >= maxAttempts) {
            // ⚠️ Enviar respuesta al frontend y cortar la ejecución
            return res.status(500).json({
              status: "error",
              mensaje: `Error al convertir la imagen ${file.filename}. Intenta nuevamente.`
            });
          }
        }
      }
    }

    // Si todo salió bien, continuar al controlador
    next();
  } catch (err) {
    console.error("Error inesperado en la conversión a WebP:", err);
    return res.status(500).json({
      status: "error",
      mensaje: "Error inesperado al procesar las imágenes. Intenta nuevamente."
    });
  }
};



// === Rutas ===
router.get("/prueba-producto", ProductController.prueba);
router.get("/obtener-productos/:category/:page", ProductController.getProducts);
router.get("/obtener-producto/:id", ProductController.getOneProduct);
router.get("/buscar-productos/:category/:search/:page", ProductController.findProducts);
router.get("/obtener-productos-carrusel", ProductController.getCarouselProducts);

// Admin
router.get("/obtener-productos-admin/:category/:page", check.auth, ProductController.getProducts);
router.get("/obtener-producto-admin/:id", check.auth, ProductController.getOneProduct);
router.get("/buscar-productos-admin/:category/:search/:page", check.auth, ProductController.findProducts);
router.delete("/eliminar-producto/:id", check.auth, ProductController.deleteProduct);

// Crear producto
router.post(
  "/crear-producto",
  (req, res, next) => { storage.counter = 0; next(); },
  upload.fields([{ name: 'generalImage', maxCount: 1 }, { name: 'colorImages', maxCount: 20 }]),
  convertNewImagesToWebP,
  ProductController.addProduct
);

// Actualizar producto
router.post(
  "/actualizar-producto",
  (req, res, next) => { storage.counter = 0; next(); },
  upload.fields([{ name: 'generalImage', maxCount: 1 }, { name: 'colorImages', maxCount: 20 }]),
  convertNewImagesToWebP,
  ProductController.updateProduct
);

module.exports = router;
