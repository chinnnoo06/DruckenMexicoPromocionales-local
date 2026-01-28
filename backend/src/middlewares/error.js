const HttpError = require("../helpers/httpError");

const errorHandler = (
  error,
  req,
  res,
  next
) => {
  console.error(error);

  if (error instanceof HttpError) {
    return res.status(error.statusCode).json({
      status: "error",
      mensaje: error.message
    });
  }

  return res.status(500).json({
    status: "error",
    mensaje: "Error interno del servidor"
  });
};

module.exports = errorHandler
