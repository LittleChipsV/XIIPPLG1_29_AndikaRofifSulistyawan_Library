const express = require("express");
const authController = require("../controllers/auth");
const userValidation = require('../middleware/validations/user');
const errorValidationHandler = require('../middleware/errorValidationHandler');

const router = express.Router();

router.post("/signup", userValidation, errorValidationHandler, authController.signup);
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);

module.exports = router; 
