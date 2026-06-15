const ApiError = require("../utils/api-error");

const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

const errorHandler = (error, req, res, next) => {
  console.error("FULL ERROR:", error);

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message,
    stack: error.stack,
  });
};

module.exports = { notFoundHandler, errorHandler };
