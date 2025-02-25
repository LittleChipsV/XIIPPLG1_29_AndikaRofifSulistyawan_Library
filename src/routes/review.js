const express = require("express");
const authenticate = require('../middleware/authenticate');
const reviewController = require("../controllers/review");
const validateData = require("../middleware/validateRequest");
const reviewSchema = require("../validations/review");

const router = express.Router();

router.route("/")
  .get(authenticate, reviewController.index)
  .post(authenticate, validateData(reviewSchema), reviewController.store);

router.route("/:id")
  .get(authenticate, reviewController.show)
  .put(authenticate, validateData(reviewSchema), reviewController.update)
  .delete(authenticate, reviewController.destroy);

module.exports = router;
