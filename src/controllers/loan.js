const { Loan, Book, User } = require('../models');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.index = asyncHandler(async (req, res) => {
  const loans = await Loan.findAll({
    include: [
      { model: Book, as: "book", attributes: ["id", "title"] },
      { model: User, as: "user", attributes: ["id", "username", "email"] },
    ],
  });
  res.json({message: "Loan berhasil didapat", data: { loans }});
});


exports.show = asyncHandler(async (req, res) => {
  const loan = await Loan.findByPk(req.params.id, {
    include: [
      { model: Book, as: "book", attributes: ["id", "title"] },
      { model: User, as: "user", attributes: ["id", "username", "email"] },
    ],
  });

  if (!loan) {
    throw new AppError("Loan tidak ditemukan", 404)
  }

  res.json({message: "Loan berhasil didapat", data: { loan }});
});


exports.store = asyncHandler(async (req, res) => {
  const { book_id, user_id, loan_date, return_date, status } = req.body;
  const loan = await Loan.create({ book_id, user_id, loan_date, return_date, status });
  res.status(201).json({message: "Loan berhasil ditambahkan", data: { loan }});
});


exports.update = asyncHandler(async (req, res) => {
  const loan = await Loan.findByPk(req.params.id);

  if (!loan) {
    throw new AppError("Loan tidak ditemukan", 404)
  }

  const { book_id, user_id, loan_date, return_date, status } = req.body;
  
  await loan.update({ book_id, user_id, loan_date, return_date, status });
  res.json({message: "Loan berhasil di-update", data: { loan }});
});


exports.destroy = asyncHandler(async (req, res, next) => {
  const loan = await Loan.findByPk(req.params.id);

  if (!loan) {
    throw new AppError("Loan tidak ditemukan");
  }

  await loan.destroy();
  res.json({message: "Loan berhasil dihapus"});
});
