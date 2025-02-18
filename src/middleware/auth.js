const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }

    req.user = user;
    next();
  });
};
