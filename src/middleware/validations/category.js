const { body } = require("express-validator");

module.exports = [
   body("name")
     .trim()
     .notEmpty().withMessage("Nama kategori tidak boleh kosong")
     .isLength({ min: 3, max: 255 }).withMessage("Nama kategori harus antara 3 hingga 255 karakter"),
 ];