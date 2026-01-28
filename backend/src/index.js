require('dotenv').config();
const connection = require("./config/conection");
const corsOptions = require("./config/cors");
const errorHandler = require("./middlewares/error")

const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const path = require('path');
const morgan = require("morgan")

// Rutas API
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");

connection();

const app = express();
const puerto = process.env.PORT;

// Configurar CORS
app.use(cors(corsOptions))

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Servir assets estáticos (RUTA CORREGIDA A /files)
app.use('/files', express.static(path.join(__dirname, 'assets')));

app.use(morgan('dev'))

// Primero las rutas API
app.use("/api/product", productRoutes);
app.use("/api/user", userRoutes);
app.use("/api/category", categoryRoutes);

app.use(errorHandler);

// Luego React
app.use(express.static(path.join(__dirname, '../../frontend/dist')));
app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

// Iniciar servidor
app.listen(puerto, () => {
   console.log("Servidor corriendo en el puerto:", puerto);
});