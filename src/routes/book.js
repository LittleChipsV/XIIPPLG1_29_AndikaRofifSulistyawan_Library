const express = require("express");
const bookController = require("../controllers/book");
const authenticate = require('../middleware/authenticate');
const validateData = require("../middleware/validateRequest");
const bookSchema = require("../validations/book");

const router = express.Router();

router.route("/")
  .get(authenticate, bookController.index)
  .post(authenticate, validateData(bookSchema), bookController.store);

router.route("/:id")
  .get(authenticate, bookController.show)
  .put(authenticate, validateData(bookSchema), bookController.update)
  .delete(authenticate, bookController.destroy);

module.exports = router;
