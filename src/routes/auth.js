const express = require("express");
const authController = require("../controllers/auth");
const validateData = require("../middleware/validateRequest");
const userSchema = require("../validations/user");
const loginSchema = require("../validations/login");

const router = express.Router();

router.post("/signup", validateData(userSchema), authController.signup);
router.post("/login", validateData(loginSchema), authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

module.exports = router; 
