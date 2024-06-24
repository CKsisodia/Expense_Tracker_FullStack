const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("../utils/authHelperFunctions");

exports.userSignup = async (req, res) => {
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

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res
        .status(400)
        .json(new ApiError(400, "All fields are mandatory"));
    }
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json(new ApiError(401, "User data not found"));
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(400).json(new ApiError(400, "Password does not match"));
    }
    const accessToken = generateAccessToken(user);
    const updateUser = await User.update(
      {
        access_token: accessToken,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    if (updateUser) {
      return res
        .status(200)
        .json(
          new ApiResponse(200, "User Logged in successfully.", { accessToken })
        );
    }
  } catch (error) {
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
};
