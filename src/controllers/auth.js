const { User, UserRefreshToken } = require("../models");
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require("../utils/jwtHelper");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");

const REFRESH_TOKEN_EXPIRATION_MS =
  parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_DAYS, 10) *
  24 *
  60 *
  60 *
  1000;

const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    signed: true,
    maxAge: REFRESH_TOKEN_EXPIRATION_MS,
  });
};

exports.signup = asyncHandler(async (req, res) => {
  const { username, name, email, password, phone } = req.body;

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new AppError("Email sudah digunakan", 400);
  }

  const user = await User.create({ username, name, email, password, phone });

  const access_token = generateAccessToken(user);
  const refresh_token = generateRefreshToken(user);

  await UserRefreshToken.create({ user_id: user.id, token: refresh_token });

  setRefreshTokenCookie(res, refresh_token);

  const userResponse = { ...user.get(), password: undefined };

  res.status(201).json({
    message: "Berhasil signup",
    data: { access_token, user: userResponse },
  });
});


exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.scope("withPassword").findOne({ where: { email } });

  if (!user || !(await user.isValidPassword(password))) {
    throw new AppError("Email atau password salah", 401);
  }

  const access_token = generateAccessToken(user);
  const refresh_token = generateRefreshToken(user);

  await UserRefreshToken.create({ user_id: user.id, token: refresh_token });

  setRefreshTokenCookie(res, refresh_token);

  const userResponse = { ...user.get(), password: undefined };

  res.json({
    message: "Berhasil login",
    data: { access_token, user: userResponse },
  });
});


exports.refreshToken = asyncHandler(async (req, res) => {
  const refreshToken = req.signedCookies.refresh_token;

  if (!refreshToken) {
    throw new AppError("Unauthorized", 401);
  }

  const decoded = verifyRefreshToken(refreshToken);
  const user = await User.findByPk(decoded.id);
  const userRefreshToken = await UserRefreshToken.findOne({
    where: { user_id: decoded.id, token: refreshToken },
  });

  if (!user || !userRefreshToken) {
    throw new AppError("Unauthorized", 401);
  }

  const access_token = generateAccessToken(user);
  res.json({ message: "Token berhasil diperbarui", data: { access_token } });
});


exports.logout = asyncHandler(async (req, res) => {
  const refreshToken = req.signedCookies.refresh_token;

  if (!refreshToken) {
    throw new AppError("Unauthorized", 401);
  }

  
  const decoded = verifyRefreshToken(refreshToken);
  const userRefreshToken = await UserRefreshToken.findOne({
    where: { user_id: decoded.id, token: refreshToken },
  });

  if (!userRefreshToken) {
    throw new AppError("Unauthorized", 401);
  }

  await userRefreshToken.destroy();

  res.clearCookie("refresh_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    signed: true,
  });

  res.json({ message: "Berhasil logout" });
});
