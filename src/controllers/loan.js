const { Loan, Book, User } = require('../models');

exports.index = async (req, res, next) => {
  try {
    const loans = await Loan.findAll({
      include: [
        { model: Book, as: "book", attributes: ["id", "title"] },
        { model: User, as: "user", attributes: ["id", "username", "email"] },
      ],
    });
    res.json({message: "Loan berhasil ditemukan", data: loans});
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    const loan = await Loan.findByPk(req.params.id, {
      include: [
        { model: Book, as: "book", attributes: ["id", "title"] },
        { model: User, as: "user", attributes: ["id", "username", "email"] },
      ],
    });

    if (!loan) {
      return res.status(404).json({  message: "Loan tidak ditemukan" });
    }

    res.json({message: "Loan berhasil ditemukan", data: loan});
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    const { book_id, user_id, loan_date, return_date, status } = req.body;
    const newLoan = await Loan.create({ book_id, user_id, loan_date, return_date, status });
    res.status(201).json({message: "Loan berhasil ditambahkan", data: newLoan});
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const loan = await Loan.findByPk(req.params.id);

    if (!loan) {
      return res.status(404).json({  message: "Loan tidak ditemukan" });
    }

    const { book_id, user_id, loan_date, return_date, status } = req.body;

    await loan.update({ book_id, user_id, loan_date, return_date, status });
    res.json({message: "Loan berhasil di-update", data: loan});
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const loan = await Loan.findByPk(req.params.id);
    if (!loan) {
      return res.status(404).json({  message: "Loan tidak ditemukan" });
    }

    await loan.destroy();
    res.json({message: "Loan berhasil dihapus"});
  } catch (error) {
    next(error);
  }
};
