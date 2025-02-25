const { Book, Category, User } = require("../models");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

exports.index = asyncHandler(async (req, res) => {
  const books = await Book.findAll({
    include: [
      { model: User, as: "user", attributes: ["id", "username", "email"] },
      { model: Category, as: "category", attributes: ["id", "name"] },
    ],
  });
  res.json({ message: "Buku berhasil didapat", data: { books } });
});


exports.show = asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id, {
    include: [
      { model: User, as: "user", attributes: ["id", "username", "email"] },
      { model: Category, as: "category", attributes: ["id", "name"] },
    ],
  });

  if (!book) {
    throw new AppError("Buku tidak ditemukan", 404);
  }

  res.json({ message: "Buku berhasil didapat", data: { book } });
});


exports.store = asyncHandler(async (req, res) => {
  const { title, writer, publisher, user_id, category_id, year } = req.body;
  const book = await Book.create({ title, writer, publisher, user_id, category_id, year });
  res.status(201).json({ message: "Buku berhasil ditambahkan", data: { book } });
});


exports.update = asyncHandler(async (req, res) => {
  const { title, writer, publisher, user_id, category_id, year } = req.body;
  const book = await Book.findByPk(req.params.id);

  if (!book) {
    throw new AppError("Buku tidak ditemukan", 404);
  }

  await book.update({ title, writer, publisher, user_id, category_id, year });
  res.json({ message: "Buku berhasil di-update", data: { book } });
});


exports.destroy = asyncHandler(async (req, res) => {
  const book = await Book.findByPk(req.params.id);

  if (!book) {
    throw new AppError("Buku tidak ditemukan", 404);
  }

  await book.destroy();
  res.json({ message: "Buku berhasil dihapus" });
});
