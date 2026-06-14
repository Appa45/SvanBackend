const jwt = require("jsonwebtoken");
const { env } = require("../config/env");

const signToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn }
  );
};

module.exports = { signToken };
