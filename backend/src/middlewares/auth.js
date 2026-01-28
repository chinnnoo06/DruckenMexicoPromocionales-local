const jwt = require("jwt-simple");
const moment = require("moment");
const libjwt = require("../services/jwt.service");
const secret = libjwt.secret;

exports.auth = (req, res, next) => {
    let token = null;

    // 👉 Buscar primero en cookies
    if (req.cookies.token) {
        token = req.cookies.token;
    }

    // (Opcional) también aceptar token en Authorization por si lo usas en el futuro
    if (!token && req.headers.authorization) {
        token = req.headers.authorization.replace(/['"]+/g, '');
    }

    // Si no hay token
    if (!token) {
        return res.status(403).send({
            status: "error",
            mensaje: "No hay token de autenticación"
        });
    }

    try {
        let payload = jwt.decode(token, secret);

        // Validar expiración
        if (payload.exp <= moment().unix()) {
            return res.status(401).send({
                status: "error",
                mensaje: "Token expirado"
            });
        }

        req.user = payload;
        next();

    } catch (error) {
        return res.status(401).send({
            status: "error",
            mensaje: "Token inválido"
        });
    }
};
