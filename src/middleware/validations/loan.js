const { body } = require("express-validator");

module.exports = [
   
   body("book_id")
     .trim()
     .notEmpty().withMessage("Buku ID tidak boleh kosong")
     .isInt().withMessage("Buku ID harus berupa angka"),
 
   body("user_id")
     .trim()
     .notEmpty().withMessage("User ID tidak boleh kosong")
     .isInt().withMessage("User ID harus berupa angka"),
 
   body("loan_date")
     .trim()
     .notEmpty().withMessage("Tanggal peminjaman tidak boleh kosong")
     .isISO8601().withMessage("Format tanggal peminjaman tidak valid (gunakan format YYYY-MM-DD)"),
 
   body("return_date")
     .optional({ nullable: true })
     .trim()
     .isISO8601().withMessage("Format tanggal pengembalian tidak valid (gunakan format YYYY-MM-DD)"),
 
   body("status")
     .trim()
     .notEmpty().withMessage("Status tidak boleh kosong")
     .isIn(["dipinjam", "dikembalikan"]).withMessage("Status harus berupa 'dipinjam' atau 'dikembalikan'"),
 ];