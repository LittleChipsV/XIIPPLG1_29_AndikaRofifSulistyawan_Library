const express = require("express");
const bookController = require("../controllers/book");
const authenticate = require('../middleware/auth');
const bookValidation = require ('../middleware/validations/book');
const errorValidationHandler = require('../middleware/errorValidationHandler');

const router = express.Router();

router.route("/")
  .get(authenticate, bookController.index)
  .post(authenticate, bookValidation, errorValidationHandler, bookController.store);

router.route("/:id")
  .get(authenticate, bookController.show)
  .put(authenticate, bookValidation, errorValidationHandler, bookController.update)
  .delete(authenticate, bookController.destroy);

module.exports = router;
