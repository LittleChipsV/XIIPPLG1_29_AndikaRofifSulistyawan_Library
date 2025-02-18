const { Review, Book, User } = require("../models");

exports.index = async (req, res, next) => {
   try {
     const reviews = await Review.findAll({
       include: [
         { model: User, as: 'user', attributes: ['id', 'name'] }, 
         { model: Book, as: 'book', attributes: ['id', 'title'] },
       ],
     });
 
     res.json({ message: "Review berhasil didapat", data: reviews });
   } catch (error) {
     next(error);
   }
 };
 

exports.show = async (req, res, next) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id, {
      include: [
        { model: User, as: 'user', attributes: ["id", "name"] },
        { model: Book, as: 'book', attributes: ["id", "title"] },
      ],
    });

    if (!review) {
      return res.status(404).json({ message: "Review tidak ditemukan" });
    }

    res.json({ message: "Review berhasil didapat", data: review});
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    const { book_id, rating, comment } = req.body;
    const user_id = req.user.id;

    const book = await Book.findByPk(book_id);

    if (!book) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    } 

    const newReview = await Review.create({
      book_id,
      user_id,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review berhasil ditambahkan",
      data: newReview,
    });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const review = await Review.findByPk(req.params.id);

    if (!review) {
       return res.status(404).json({ message: "Review tidak ditemukan" });
    }

    review.rating = rating;
    review.comment = comment;
    await review.save();

    res.status(200).json({
      message: "Review berhasil di-update",
      data: review,
    });
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const review = await Review.findByPk(req.params.id);

    if (!review) { 
      return res.status(404).json({ message: "Review not found" });
    }

    await review.destroy();

    res.json({ message: "Review berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};
