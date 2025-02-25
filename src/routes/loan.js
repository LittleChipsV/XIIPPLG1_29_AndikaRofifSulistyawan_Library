const express = require("express");
const loanController = require("../controllers/loan");
const authenticate = require('../middleware/authenticate');
const validateData = require("../middleware/validateRequest");
const loanSchema = require("../validations/loan");

const router = express.Router();

router.route("/")
  .get(authenticate,loanController.index)
  .post(authenticate, validateData(loanSchema), loanController.store);

router.route("/:id")
  .get(authenticate, loanController.show)
  .put(authenticate, validateData(loanSchema), loanController.update)
  .delete(authenticate, loanController.destroy);

module.exports = router;
