const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    // 🟢 FIX: remove password from response
    const user = await User.findById(req.user.id).select("-password");

    // 🟢 ADD: handle user not found
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (err) {
    console.error("Profile Error:", err.message); // 🟢 debug
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;