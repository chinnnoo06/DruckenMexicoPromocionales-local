const connection = require("./database/conection");
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

console.log("API NODE para DRUCKEN MÉXICO PROMOCIONALES ARRANCADA!!!");

// Conectar a MongoDB
connection();

const app = express();
const puerto = process.env.PORT || 3000;

// Configurar CORS
app.use(cors({
    origin: process.env.URL, // URL de tu frontend
    credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Servir assets estáticos
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Rutas API
const productRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);

// Servir frontend React (Vite)
const frontendPath = path.join(__dirname, '../frontend');

if (process.env.NODE_ENV === 'production') {
    // Servir archivos de la carpeta dist generada por Vite
    app.use(express.static(path.join(frontendPath, 'dist')));

    // Todas las rutas que no sean /api/... van al index.html de Vite
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(frontendPath, 'dist', 'index.html'));
    });
} else {
    // Desarrollo: mostrar mensaje simple
    app.get('/', (req, res) => {
        res.send('Backend corriendo en modo desarrollo');
    });
}

// Iniciar servidor
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto: ${puerto}`);
});
