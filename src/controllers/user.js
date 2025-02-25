const { User } = require("../models");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

exports.index = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.json({ message: "User berhasil didapat", data: { users } });
});

exports.show = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    throw new AppError("User tidak ditemukan", 404);
  }

  res.json({ message: "User berhasil didapat", data: { user } });
});


exports.store = asyncHandler(async (req, res) => {
  const { username, name, email, password, phone } = req.body;

  const user = await User.create({ username, name, email, password, phone });

  const userResponse = { ...user.get(), password: undefined };

  res.status(201).json({
    message: "User berhasil dibuat",
    data: { user: userResponse },
  });
});


exports.update = asyncHandler(async (req, res) => {
  const { username, name, email, password, phone } = req.body;

  const user = await User.scope("withPassword").findByPk(req.params.id);

  if (!user) {
    throw new AppError("User tidak ditemukan", 404);
  }

  await user.update({ username, name, email, password, phone })

  const userResponse = { ...user.get(), password: undefined };

  res.json({
    message: "User berhasil di-update",
    data: { user:  userResponse },
  });
});


exports.destroy = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);

  if (!user) {
    throw new AppError("User tidak ditemukan", 404);
  }

  await user.destroy();
  res.json({ message: "User berhasil dihapus" });
});
