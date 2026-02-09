// Importar servicios
const jwt = require("../services/jwt.service");
const userService = require("../services/user.service");

const register = async (req, res, next) => {
    if (process.env.NODE_ENV === "production") {
        return res.status(404).end()
    }

    const params = req.body;

    try {
        const user = await userService.registerService(params)

        console.log("Usuario Registrado con exito");
        return res.status(200).json({
            status: "success",
            user,
            mensaje: "Usuario Registrado con exito"
        });
    } catch (error) {
        console.log("Error al crear cuenta");
        next(error)
    }
}

const login = async (req, res, next) => {
    const params = req.body;

    try {
        const user = await userService.loginService(params)

        const token = jwt.createToken(user);

        // Guardar token en cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        console.log("Login con exito");
        return res.status(200).json({
            status: "success",
            mensaje: "Login con exito",
            user: { username: user.username }
        });

    } catch (error) {
        console.log("Error al iniciar sesión", error);
        next(error)
    }
};

const checkAuth = (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            status: "error",
            mensaje: "No autorizado"
        });
    }

    return res.status(200).json({
        status: "success",
        user: { username: req.user.username }
    });
};

const logout = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    });
    return res.json({ status: "success", message: "Sesión cerrada correctamente" });
}

module.exports = {
    login,
    register,
    checkAuth,
    logout

}