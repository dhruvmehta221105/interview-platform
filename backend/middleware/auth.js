const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // ❌ REMOVE old one-line return (not informative)
  if (!authHeader) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    // 🟢 SAFE extraction (handles wrong format too)
    const token = authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : authHeader;

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

   const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;

    next();

  } catch (err) {
    console.error("Auth Error:", err.message); // 🟢 helpful debug
    res.status(401).json({ message: "Invalid or expired token" });
  }
};