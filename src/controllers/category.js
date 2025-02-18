const { Category } = require('../models');

exports.index = async (req, res, next) => {
   try {
     const categories = await Category.findAll();
     res.json({ message: "Kategori berhasil didapat", data: categories });
   } catch (error) {
     next(error);
   }
 };
 
 exports.show = async (req, res, next) => {
   try {
     const category = await Category.findByPk(req.params.id);
     if (!category) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }
 
     res.json({ message: "Kategori berhasil didapat", data: category });
   } catch (error) {
     next(error);
   }
 };
 
exports.store = async (req, res, next) => {
  try {
    const { name } = req.body;

    const newCategory = await Category.create({ name });

    res.status(201).json({
      message: 'Kategori berhasil ditambahkan',
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { name } = req.body;

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
  }

    category.name = name;
    await category.save();

    res.json({
      message: 'Kategori berhasil di-update',
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ message: 'Kategori tidak ditemukan' });
    }

    await category.destroy();
    res.json({ message: 'Kategori berhasil dihapus' });
  } catch (error) {
    next(error);
  }
};
