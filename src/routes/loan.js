const express = require("express");
const loanController = require("../controllers/loan");
const loanValidation = require ('../middleware/validations/loan');
const errorValidationHandler = require('../middleware/errorValidationHandler');
const authenticate = require('../middleware/auth');

const router = express.Router();

router.route("/")
  .get(authenticate,loanController.index)
  .post(authenticate, loanValidation, errorValidationHandler, loanController.store);

router.route("/:id")
  .get(authenticate, loanController.show)
  .put(authenticate, loanValidation, errorValidationHandler, loanController.update)
  .delete(authenticate, loanController.destroy);

module.exports = router;
