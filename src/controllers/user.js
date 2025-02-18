const { User } = require('../models');
const { hashPassword } = require("../utils/hash");

 exports.index = async (req, res, next) => {
   try {
     const users = await User.findAll({
       attributes: ['id', 'username', 'name', 'email', 'phone'],
     });
 
     res.json({ message: "User berhasil didapat", data: users });
   } catch (error) {
     next(error);
   }
 };
 
 exports.show = async (req, res, next) => {
   try {
     const user = await User.findByPk(req.params.id, {
       attributes: ['id', 'username', 'name', 'email', 'phone'],
     });
 
     if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
 
     res.json({ message: "User berhasil didapat", data: user });
   } catch (error) {
     next(error);
   }
 };

 exports.store = async (req, res, next) => {
   try {
     const { username, name, email, password, phone } = req.body;
 
     const hashedPassword = await hashPassword(password);
 
     const newUser = await User.create({
       username,
       name,
       email,
       password: hashedPassword,
       phone,
     });
 
     const userResponse = newUser.toJSON();
     delete userResponse.password;
 
     res.status(201).json({
       message: 'User berhasil dibuat',
       data: userResponse,
     });
   } catch (error) {
     next(error);
   }
 };
 
 exports.update = async (req, res, next) => {
   try {
     const { username, name, email, password, phone } = req.body;
 
     const user = await User.findByPk(req.params.id);

     if (!user) {
      return res.status(404).json({ message: 'User tidak ditemukan' });
    }
 
     const hashedPassword = await hashPassword(password);
 
     user.username = username || user.username;
     user.name = name || user.name;
     user.email = email || user.email;
     user.password = hashedPassword || user.password;
     user.phone = phone || user.phone;
 
     await user.save();
 
     const userResponse = user.toJSON();
     delete userResponse.password;
 
     res.json({
       message: 'User berhasil di-update',
       data: userResponse,
     });
   } catch (error) {
     next(error);
   }
 };
 
 exports.destroy = async (req, res, next) => {
   try { 
     const user = await User.findByPk(req.params.id);
     
     if (!user) {
       return res.status(404).json({ message: 'User tidak ditemukan' });
     }
 
     await user.destroy();
 
     res.json({ message: 'User berhasil dihapus' });
   } catch (error) {
     next(error);
   }
 };