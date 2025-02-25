const { Review, Book, User } = require("../models");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

exports.index = asyncHandler(async (req, res) => {
  const reviews = await Review.findAll({
    include: [
      { model: User, as: 'user', attributes: ['id', 'name'] }, 
      { model: Book, as: 'book', attributes: ['id', 'title'] },
    ],
  });

  res.json({ message: "Review berhasil didapat", data: { reviews } });
 });
 

exports.show = asyncHandler(async (req, res) => {
  const review = await Review.findByPk(req.params.id, {
    include: [
      { model: User, as: 'user', attributes: ["id", "name"] },
      { model: Book, as: 'book', attributes: ["id", "title"] },
    ],
  });

  if (!review) {
    throw new AppError("Review tidak ditemukan", 404);
  }

  res.json({ message: "Review berhasil didapat", data: { review }});
});


exports.store = asyncHandler(async (req, res) => {
  const { book_id, user_id, rating, comment } = req.body;

  const review = await Review.create({book_id, user_id, rating, comment});

  res.status(201).json({
    message: "Review berhasil ditambahkan",
    data: { review },
  });
});


exports.update = asyncHandler(async (req, res) => {
  const { book_id, user_id, rating, comment } = req.body;

  const review = await Review.findByPk(req.params.id);

  if (!review) {
    throw new AppError("Review tidak ditemukan", 404);
  }

  await review.update({ book_id, user_id, rating, comment });

  res.status(200).json({
    message: "Review berhasil di-update",
    data: { review },
  });
});


exports.destroy = asyncHandler(async (req, res) => {
  const review = await Review.findByPk(req.params.id);

  if (!review) { 
    throw new AppError("Review tidak ditemukan", 404);
  }

  await review.destroy();

  res.json({ message: "Review berhasil dihapus" });
});
