const jwt = require("jsonwebtoken");
const middleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({
          status: "error",
          message: "No token provided or token invalid or token experied.",
        });
      } else {
        req.user = decoded;
        next();
      }
    });
  } else {
    return res.status(400).json({
      status: "error",
      message: "No token provided or token invalid or token experied.",
    });
  }
};

module.exports = { middleware };
