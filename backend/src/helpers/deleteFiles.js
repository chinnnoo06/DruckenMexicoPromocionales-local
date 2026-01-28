const fs = require("fs");
const path = require("path");

const deleteUploadedFiles = (files) => {
  if (!files) return;

  // Recorremos cada campo (generalImage, colorImages, etc.)
  Object.values(files).forEach(fileArray => {
    if (!Array.isArray(fileArray)) return;

    fileArray.forEach(file => {
      try {
        const filePath = path.join(__dirname, "../assets", file.filename);
        fs.unlinkSync(filePath);
        console.log("Eliminada basura:", file.filename);
      } catch (err) {
        console.error(`Error eliminando ${file.filename}:`, err.message);
      }
    });
  });
};

module.exports = deleteUploadedFiles;
