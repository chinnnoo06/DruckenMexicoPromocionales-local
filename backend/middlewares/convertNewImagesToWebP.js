const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

exports.convertNewImagesToWebP = async (req, res, next) => {
  try {
    const filesToConvert = [];

    if (req.files.generalImage) filesToConvert.push(...req.files.generalImage);
    if (req.files.colorImages) filesToConvert.push(...req.files.colorImages);

    for (const file of filesToConvert) {
      const ext = path.extname(file.path).toLowerCase();

      if (ext === ".webp") {
        console.log(`Saltando conversión porque ya es WebP: ${file.filename}`);
        continue;
      }

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
