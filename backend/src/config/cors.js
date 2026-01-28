const { FRONTEND_URL } = require("./env");

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir llamadas sin origin (Postman, curl, pm2 logs, healthchecks)
    if (!origin) return callback(null, true);

    // Permitir SOLO tu frontend
    if (origin === FRONTEND_URL) {
      return callback(null, true);
    }

    // Bloquear cualquier otro origen
    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true, // 🔥 OBLIGATORIO PARA COOKIES
};

module.exports = corsOptions;
