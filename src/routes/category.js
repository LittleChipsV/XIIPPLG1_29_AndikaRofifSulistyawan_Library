const express = require("express");
const categoryController = require("../controllers/category");
const authenticate = require('../middleware/authenticate');
const validateData = require("../middleware/validateRequest");
const categorySchema = require("../validations/category");

const router = express.Router();

router.route("/")
  .get(authenticate, categoryController.index)
  .post(authenticate, validateData(categorySchema), categoryController.store);

router.route("/:id")
  .get(authenticate, categoryController.show)
  .put(authenticate, validateData(categorySchema), categoryController.update)
  .delete(authenticate, categoryController.destroy);

module.exports = router;
