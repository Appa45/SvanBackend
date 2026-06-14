const User = require("../models/user.model");
const ApiError = require("../utils/api-error");
const { signToken } = require("../utils/jwt");

const buildAuthResponse = (user) => ({
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  },
  token: signToken(user)
});

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new ApiError(409, "Email is already registered");
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: buildAuthResponse(user)
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      throw new ApiError(401, "Invalid email or password");
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: buildAuthResponse(user)
    });
  } catch (error) {
    next(error);
  }
};

const me = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role
      }
    }
  });
};

module.exports = { register, login, me };
