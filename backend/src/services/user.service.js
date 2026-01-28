const bcrypt = require("bcrypt");
const HttpError = require("../helpers/httpError")
const userRepository = require("../repositories/user.repository");

const registerService = async (data) => {
    const userExist = await userRepository.findByUserName(data.username)

    if (userExist) throw new HttpError(409, "Este usuario ya esta registrado");

    let pwd = await bcrypt.hash(data.password, 10);
    data.password = pwd;

    const user = await userRepository.register(data)

    return user
}

const loginService = async (data) => {
    const userExists = await userRepository.findByUserName(data.username)

    if (!userExists) throw new HttpError(409, "Credenciales incorrectas");

    let pwd = bcrypt.compareSync(data.password, userExists.password)

    if (!pwd) throw new HttpError(409, "Credenciales incorrectas");
    
    return userExists
}

module.exports = {
    registerService,
    loginService
}