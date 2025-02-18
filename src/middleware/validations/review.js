const { body } = require("express-validator");

module.exports = [
   body("book_id")
     .trim()
     .notEmpty().withMessage("Buku ID tidak boleh kosong")
     .isInt().withMessage("Buku ID harus berupa angka"),
 
   body("rating")
     .trim()
     .notEmpty().withMessage("Rating tidak boleh kosong")
     .isInt({ min: 1, max: 5 }).withMessage("Rating harus antara 1 sampai 5"),
 
   body("comment")
     .optional({ nullable: true })
     .trim()
];