const { FRONTEND_URL } = require("./env");

const corsOptions = {
  origin: function (origin, callback) {
    // Permitir llamadas sin origin (Postman, curl, pm2 logs, healthchecks)
    if (!origin) return callback(null, true);

    if (origin === FRONTEND_URL) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true, 
};

module.exports = corsOptions;
