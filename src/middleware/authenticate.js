const AppError = require("../utils/AppError");
const { verifyAccessToken } = require("../utils/jwtHelper");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyAccessToken(token);
  req.user = decoded;
  
  next();
};

module.exports = authenticate;
