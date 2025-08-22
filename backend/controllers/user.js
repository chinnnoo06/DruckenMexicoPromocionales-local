// Importar dependencias
const bcrypt = require("bcrypt");

// Importar modelos
const User = require("../models/User");

// Importar servicios
const jwt = require("../services/jwt");
const { validationForm } = require("../helpers/validation");

const prueba = async (req, res) => {
    return res.status(200).json({
        mensaje: "Hola",
    });
}

const register = async (req, res) => {
    // Recoger parametros por post a guardar
    let params = req.body;

    // Comprobar que me llegan bien (+ validación)
    if (!params.username || !params.password) {
        console.log("Faltan datos por enviar");
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar"
        })
    }

    // Control de usuarios duplicados
    try {

        // Cifrar contraseña
        let pwd = await bcrypt.hash(params.password, 10);
        params.password = pwd; // Asginar contraseña encriptada

        try {
            const newUser = new User(params); //Crear objeto y pasar parametros
            const createUser = await newUser.save(); //Guardar el documento/objeto en la base de datos de mongodb

            console.log("Usuario Registrado con exito");
            return res.status(200).json({
                status: "success",
                user: createUser,
                mensaje: "Usuario Registrado con exito"
            });
        } catch (error) {
            console.log("Error al guardar usuario en la bd");
            return res.status(400).json({
                status: "error",
                mensaje: "Error al guardar usuario en la bd"
            });
        }

    } catch (error) {
        console.log("Error al comprobar usuarios duplicados");
        return res.status(400).json({
            status: "error",
            mensaje: "Error al comprobar usuarios duplicados"
        });
    }
}


const login = async (req, res) => {
    let params = req.body;

    try {
        validationForm(params, ["username", "password"]);
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({
            status: "error",
            mensaje: error.message
        });
    }

    try {
        const userExists = await User.findOne({ username: params.username });

        if (!userExists) {
            console.log("No se ha encontrado este usuario");
            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado este usuario"
            });
        }

        let pwd = bcrypt.compareSync(params.password, userExists.password)

        if (!pwd) {
            console.log("Contraseña incorrecta");
            return res.status(400).json({
                status: "error",
                mensaje: "Contraseña incorrecta"
            });
        }

        // Crear token
        const token = jwt.createToken(userExists);

        // Guardar token en cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',  // funciona en localhost
            maxAge: 24 * 60 * 60 * 1000
        });


        console.log("Login con exito");
        return res.status(200).json({
            status: "success",
            mensaje: "Login con exito",
            userExists: { username: userExists.username }
        });

    } catch (error) {
        console.log("Error al comprobar si usuario existe", error);
        return res.status(400).json({
            status: "error",
            mensaje: "Error al comprobar si usuario existe"
        });
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
        secure: false,     
        sameSite: "lax" 
    });
    return res.json({ status: "success", message: "Sesión cerrada correctamente" });
}

module.exports = {
    prueba,
    login,
    register,
    checkAuth,
    logout

}