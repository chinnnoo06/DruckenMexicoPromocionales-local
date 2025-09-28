const connection = require("./database/conection");
const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

console.log("API NODE para DRUCKEN MÉXICO PROMOCIONALES ARRANCADA!!!");

connection();

const app = express();
const puerto = process.env.PORT;

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

// Servir frontend React en producción
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Iniciar servidor
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto:", puerto);
});
