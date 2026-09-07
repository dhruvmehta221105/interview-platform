const express = require("express");
const { sendMessage, getChatHistory } = require("../controller/chatController");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/send", auth, sendMessage);
router.get("/history", auth, getChatHistory);

module.exports = router;