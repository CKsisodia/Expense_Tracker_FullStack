const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const { validateAccessToken } = require("../middlewares/auth");

router.post("/signup", authController.userSignup);
router.post("/login", authController.userLogin);
router.post("/refresh", authController.refreshAccessToken);
router.get("/get-user-info", validateAccessToken, authController.getUserInfo);

module.exports = router;
