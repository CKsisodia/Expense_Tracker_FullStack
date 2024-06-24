require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.generateAccessToken = (user) => {
  try {
    const accesssTokenSecretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    const userData = {
      id: user.id,
      email: user.email,
    };
    const jwtToken = jwt.sign(userData, accesssTokenSecretKey, {
      expiresIn: "30m",
    });
    return jwtToken;
  } catch (error) {
    console.log("Access token not generated", error);
  }
};

exports.generateRefreshToken = (user) => {
  try {
    const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY;
    const userData = {
      id: user.id,
      email: user.email,
    };
    const jwtRefreshToken = jwt.sign(userData, refreshTokenSecretKey, {
      expiresIn: "24h",
    });
    return jwtRefreshToken;
  } catch (error) {
    console.log("Refresh token not generated", error);
  }
};
