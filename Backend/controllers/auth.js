const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/auth");

exports.userSignup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!(username && email && password)) {
      return res.status(400).json(new ApiError("All fields are mandatory"));
    }
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(404).json(new ApiError("User already exists"));
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    console.log(newUser);

    return res
      .status(201)
      .json(new ApiResponse("Welcome! Account created", newUser));
  } catch (error) {
    return res.status(500).json(new ApiError("Internal server error"));
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json(new ApiError("All fields are mandatory"));
    }
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json(new ApiError("Please create your account"));
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res
        .status(400)
        .json(new ApiError("Please enter correct password"));
    }
    const accessToken = generateAccessToken(user);
    const { refreshToken, hashedRefreshToken } = await generateRefreshToken(
      user
    );

    const updateUser = await User.update(
      {
        refreshToken: hashedRefreshToken,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    if (updateUser) {
      return res.status(200).json(
        new ApiResponse("You've successfully logged in", {
          accessToken,
          refreshToken,
        })
      );
    }
  } catch (error) {
    return res.status(500).json(new ApiError("Internal server error"));
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findOne({
      where: userId,
    });
    if (!user) {
      return res.status(404).json(new ApiError("User details not found"));
    }
    const userDetails = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    return res
      .status(200)
      .json(new ApiResponse("User details get successfully", userDetails));
  } catch (error) {
    return res.status(500).json(new ApiError("Internal server error"));
  }
};

exports.refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken, email } = req.body;
    if (!(refreshToken && email)) {
      return res
        .status(400)
        .json(new ApiError("Error occured in refresh token or email"));
    }
    const user = await User.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(400).json(new ApiError("No user found", user));
    }
    const isValidToken = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!isValidToken) {
      return res.status(401).json(new ApiError("Invalid refresh token"));
    }
    const accessToken = generateAccessToken(user);
    return res
      .status(200)
      .json(
        new ApiResponse("Access token refreshed", { accessToken: accessToken })
      );
  } catch (error) {
    return res.status(500).json(new ApiError("Internal server error"));
  }
};
