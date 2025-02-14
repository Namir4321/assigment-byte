const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "You are not authenticated." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token." });
  }
};

module.exports = verifyToken;
