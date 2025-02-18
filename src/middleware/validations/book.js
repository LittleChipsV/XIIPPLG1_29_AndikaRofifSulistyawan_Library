const { body } = require('express-validator');

module.exports = [
   body("title")
     .trim()
     .notEmpty().withMessage("Judul buku tidak boleh kosong")
     .isLength({ min: 3, max: 255 }).withMessage("Judul buku harus antara 3 sampai 255 karakter"),
 
   body("writer")
     .trim()
     .notEmpty().withMessage("Penulis tidak boleh kosong")
     .isLength({ min: 3, max: 255 }).withMessage("Nama penulis harus antara 3 sampai 255 karakter"),
 
   body("publisher")
     .trim()
     .notEmpty().withMessage("Penerbit tidak boleh kosong")
     .isLength({ min: 3, max: 255 }).withMessage("Nama penerbit harus antara 3 sampai 255 karakter"),
 
   body("year")
     .trim()
     .notEmpty().withMessage("Tahun terbit tidak boleh kosong")
     .isInt({ max: new Date().getFullYear() }).withMessage(`Tahun terbit tidak valid`),
 
   body("user_id")
     .optional({ nullable: true })
     .isInt().withMessage("User ID harus berupa angka"),
 
   body("category_id")
     .trim()
     .notEmpty().withMessage("Kategori ID tidak boleh kosong")
     .isInt().withMessage("Kategori ID harus berupa angka"),
 ];