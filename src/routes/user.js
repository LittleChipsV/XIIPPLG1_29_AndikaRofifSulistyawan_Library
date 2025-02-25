const express = require("express");
const authenticate = require('../middleware/authenticate');
const userController = require("../controllers/user");
const validateData = require("../middleware/validateRequest");
const userSchema = require("../validations/user");

const router = express.Router();

router.route("/")
  .get(authenticate, userController.index)
  .post(authenticate, validateData(userSchema), userController.store);

router.route("/:id")
  .get(authenticate, userController.show)
  .put(authenticate, validateData(userSchema), userController.update)
  .delete(authenticate, userController.destroy);

module.exports = router;
