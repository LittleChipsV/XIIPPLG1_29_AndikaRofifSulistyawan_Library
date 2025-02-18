const express = require("express");
const userController = require("../controllers/user");
const userValidation = require ('../middleware/validations/user');
const errorValidationHandler = require('../middleware/errorValidationHandler');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.route("/")
  .get(authenticate, userController.index)
  .post(authenticate, userValidation, errorValidationHandler, userController.store);

router.route("/:id")
  .get(authenticate, userController.show)
  .put(authenticate, userValidation, errorValidationHandler, userController.update)
  .delete(authenticate, userController.destroy);

module.exports = router;
