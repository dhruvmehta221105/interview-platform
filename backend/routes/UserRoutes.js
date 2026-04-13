// backend/routes/UserRoutes.js
const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers
} = require("../controller/UserController");

// Routes
router.post("/", createUser);
router.get("/", getUsers);

module.exports = router; 