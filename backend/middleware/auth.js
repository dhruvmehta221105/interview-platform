const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
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

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not configured");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id role");

    if (!user) {
      return res.status(401).json({ message: "User account no longer exists" });
    }

    req.user = { id: user._id.toString(), role: user.role };

    next();

  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};