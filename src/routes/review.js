const express = require("express");
const reviewController = require("../controllers/review");
const reviewValidation = require ('../middleware/validations/review');
const errorValidationHandler = require('../middleware/errorValidationHandler');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.route("/")
  .get(authenticate, reviewController.index)
  .post(authenticate, reviewValidation, errorValidationHandler, reviewController.store);

router.route("/:id")
  .get(authenticate, reviewController.show)
  .put(authenticate, reviewValidation, errorValidationHandler, reviewController.update)
  .delete(authenticate, reviewController.destroy);

module.exports = router;
