const { Category } = require("../models");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

exports.index = asyncHandler(async (req, res) => {
  const categories = await Category.findAll();
  res.json({ message: "Kategori berhasil didapat", data: { categories } });
});


exports.show = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);

  if (!category) {
    throw new AppError("Kategori tidak ditemukan", 404);
  }

  res.json({ message: "Kategori berhasil didapat", data: { category } });
});


exports.store = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const newCategory = await Category.create({ name });

  res.status(201).json({
    message: "Kategori berhasil ditambahkan",
    data: newCategory,
  });
});


exports.update = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findByPk(req.params.id);

  if (!category) {
    throw new AppError("Kategori tidak ditemukan", 404);
  }

  category.name = name;
  await category.save();

  res.json({
    message: "Kategori berhasil di-update",
    data: { category },
  });
});


exports.destroy = asyncHandler(async (req, res) => {
  const category = await Category.findByPk(req.params.id);

  if (!category) {
    throw new AppError("Kategori tidak ditemukan", 404);
  }

  await category.destroy();
  res.json({ message: "Kategori berhasil dihapus" });
});
