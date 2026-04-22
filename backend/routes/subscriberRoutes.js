const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");
const sendWelcomeEmail = require("../utils/sendWelcomeEmail");

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: "Invalid email address." });
  }

  try {
    const subscriber = new Subscriber({ email });
    await subscriber.save();

    await sendWelcomeEmail(email);

    return res.status(201).json({
      success: true,
      message: "🎉 Successfully registered! Check your inbox.",
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This email is already registered!",
      });
    }
    console.error("Subscribe error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
});

module.exports = router;