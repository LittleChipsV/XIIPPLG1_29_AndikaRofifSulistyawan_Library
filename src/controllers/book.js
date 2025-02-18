const { Book, Category, User } = require('../models');

exports.index = async (req, res, next) => {
  try {
    const books = await Book.findAll({
      include: [
        { model: User, as: "user", attributes: ["id", "username", "email"] },
        { model: Category, as: "category", attributes: ["id", "name"] },
      ],
    });
    res.json({ message: "Buku berhasil didapat", data: books });
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [
        { model: User, as: "user", attributes: ["id", "username", "email"] },
        { model: Category, as: "category", attributes: ["id", "name"] },
      ],
    });

    if (!book) { 
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    res.json({message: "Buku berhasil didapat", data: book});
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    const { title, writer, publisher, user_id, category_id, year  } = req.body;
    const newBook = await Book.create({ title, writer, publisher, user_id, category_id, year  });
    res.status(201).json({message: "Buku berhasil ditambahkan", data: newBook});
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { title, writer, publisher, user_id, category_id, year  } = req.body;
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      return res.status(404).json({  message: "Buku tidak ditemukan" });
    }

    await book.update({ title, writer, publisher, user_id, category_id, year });
    res.json({ message: "Buku berhasil di-update", data: book});
  } catch (error) {
    next(error);
  }
};

exports.destroy = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);
    
    if (!book){
      return res.status(404).json({  message: "Buku tidak ditemukan" });
    } 

    await book.destroy();
    res.json({ message: "Buku berhasil dihapus" });
  } catch (error) {
    next(error);
  }
};
