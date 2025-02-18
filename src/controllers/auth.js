const { User, UserRefreshToken } = require("../models");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");
const { hashPassword, comparePassword } = require("../utils/hash");
const jwt = require('jsonwebtoken');

exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);

    const user = await User.create({ ...req.body, password: hashedPassword });

    const access_token = generateAccessToken(user);
    const refresh_token = generateRefreshToken(user);

    await UserRefreshToken.create({ userId: user.id, token: refresh_token });

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    };

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      signed: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });


    res.status(201).json({ message: "Berhasil signup", data: { access_token, user: userData } });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user || !(await comparePassword(req.body.password, user.password))) {
      return res.status(401).json({ message: "Email atau password salah" });
    }

    const access_token = generateAccessToken(user);
    const refresh_token = generateRefreshToken(user);

    await UserRefreshToken.create({ userId: user.id, token: refresh_token });

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
      phone: user.phone,
    };

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      signed: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    res.json({ message: "Berhasil login", data: {access_token, user: userData} });
  } catch (error) {
    next(error);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const refresh_token = req.signedCookies.refresh_token;

    if (!refresh_token) {
      return res.sendStatus(401);
    }

    let decoded;

    try {
      decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res.sendStatus(403);
    }

    const userRefreshToken = await UserRefreshToken.findOne({
      where: { userId: decoded.id, token: refresh_token },
    });

    if (!userRefreshToken) {
      return res.status(404).json({ message: "Token tidak valid" });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    await userRefreshToken.update({ token: newRefreshToken });

    res.cookie("refresh_token", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      signed: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 hari
    });

    res.json({ access_token: newAccessToken });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    const refreshToken = req.signedCookies.refresh_token;

    if (!refreshToken) {
      return res.sendStatus(401);
    }

    await UserRefreshToken.destroy({ where: { token: refreshToken } });

    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ message: "Berhasil logout" });
  } catch (error) {
    next(error);
  }
};