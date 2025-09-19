// Importar dependencias
const jwt = require("jwt-simple");
require('dotenv').config();
const moment = require("moment");

// Clave secreta
const secret = process.env.SECRET_KEY;

// Crear función para generar tokens
const createToken = (user) => {
    const payload = {
        id: user._id,
        username: user.username,
        iat: moment().unix(),
        exp: moment().add(1, "days").unix()
    }

    // Devovler token codificado
    return jwt.encode(payload, secret);
}

module.exports = {
    secret,
    createToken
}