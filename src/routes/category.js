const express = require("express");
const categoryController = require("../controllers/category");
const authenticate = require('../middleware/auth');
const categoryValidation = require ('../middleware/validations/category');
const errorValidationHandler = require('../middleware/errorValidationHandler');

const router = express.Router();

router.route("/")
  .get(authenticate, categoryController.index)
  .post(authenticate, categoryValidation, errorValidationHandler, categoryController.store);

router.route("/:id")
  .get(authenticate, categoryController.show)
  .put(authenticate,  categoryValidation, errorValidationHandler, categoryController.update)
  .delete(authenticate, categoryController.destroy);

module.exports = router;
