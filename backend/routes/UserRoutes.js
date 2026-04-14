const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser
} = require("../controller/UserController");

// ✅ SIGNUP
router.post("/register", registerUser);

// ✅ LOGIN
router.post("/login", loginUser);

module.exports = router;