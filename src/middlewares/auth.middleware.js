const jwt = require("jsonwebtoken");
const { env } = require("../config/env");
const ApiError = require("../utils/api-error");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization || "";
    const [scheme, token] = authorization.split(" ");

    if (scheme !== "Bearer" || !token) {
      throw new ApiError(401, "Authentication token is required");
    }

    const payload = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(payload.id);

    if (!user) {
      throw new ApiError(401, "User no longer exists");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
      return next(new ApiError(401, "Invalid or expired token"));
    }

    return next(error);
  }
};

module.exports = { protect };
