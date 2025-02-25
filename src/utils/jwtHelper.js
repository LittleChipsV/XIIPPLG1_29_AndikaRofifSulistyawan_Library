const jwt = require("jsonwebtoken");

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES}m` }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id }, 
    process.env.JWT_REFRESH_TOKEN_SECRET, 
    { expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_DAYS}d` });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
