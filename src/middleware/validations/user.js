const { body } = require("express-validator");

module.exports = [
   body("username")
     .trim()
     .notEmpty().withMessage("Username harus diisi")
     .isLength({ min: 3, max: 255 }).withMessage("Username harus antara 3 hingga 255 karakter")
     .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username hanya boleh mengandung huruf, angka, dan underscore"),
 
   body("name")
     .trim()
     .notEmpty().withMessage("Nama harus diisi")
     .isLength({ min: 3, max: 255 }).withMessage("Nama harus antara 3 hingga 255 karakter"),
 
   body("password")
     .trim()
     .notEmpty().withMessage("Password harus diisi")
     .isLength({ min: 8 }).withMessage("Password minimal 8 karakter")
     .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/)
     .withMessage("Password harus mengandung setidaknya satu huruf besar, satu huruf kecil, satu angka, dan satu karakter khusus"),
 
   body("email")
     .trim()
     .notEmpty().withMessage("Email harus diisi")
     .isEmail().withMessage("Email tidak valid")
     .isLength({ max: 255 }).withMessage("Email maksimal 255 karakter"),
 
   body("phone")
     .optional({ checkFalsy: true }) 
     .trim()
     .isLength({ max: 20 }).withMessage("Nomor telepon maksimal 20 karakter")
     .matches(/^[0-9+]+$/).withMessage("Nomor telepon hanya boleh mengandung angka dan tanda +"),
 ];