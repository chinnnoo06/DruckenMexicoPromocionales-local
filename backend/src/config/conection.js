const mongoose = require("mongoose");
const { MONGO_URI } = require('./env')

const connection = async () => {

    try {
        const mongoUri = MONGO_URI;

        if (!mongoUri) {
            throw new Error("MONGO_URI no está definida en el .env");
        }

        await mongoose.connect(mongoUri);
        console.log("Conectado correctamente a la base de datos drucken_mexico_promocionales_db");
    } catch (error) {
        console.log(error);
        throw new Error("No se ha podido conectar a la base de datos");
    }

}

module.exports = connection
