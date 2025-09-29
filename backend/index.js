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
    origin: process.env.URL, // tu frontend
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

// Servir frontend React
const frontendPath = path.join(__dirname, '../frontend');

// Detectar si estamos en producción (build) o desarrollo
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(frontendPath, 'build')));
    app.get(/^\/(?!api).*/, (req, res) => {
        res.sendFile(path.join(frontendPath, 'build', 'index.html'));
    });
} else {
    // En desarrollo puede apuntar al build de Vite si lo quieres servir así
    app.get('/', (req, res) => {
        res.send('Backend corriendo en modo desarrollo');
    });
}

// Iniciar servidor
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto: ${puerto}`);
});
