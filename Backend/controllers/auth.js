const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userSignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      return res
        .status(400)
        .json(new ApiError(400, "All fields are mandatory"));
    }
    const existingUser = await User.findOne({
      where: { email },
    });
    if (existingUser) {
      return res.status(409).json(new ApiError(409, "User already exists"));
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json(new ApiResponse(201, "New user registered successfully", newUser));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
};
