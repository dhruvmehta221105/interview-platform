const chatService = require("../services/chatService");
const { isNonEmptyString } = require("../validators/commonValidator");

// send message + store in DB
const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // validate input
    if (!isNonEmptyString(message, 4000)) {
      return res.status(400).json({ error: "message is required" });
    }

    res.json(await chatService.sendMessage(req.user.id, message.trim()));

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get chat history
const getChatHistory = async (req, res) => {
  try {
    res.json(await chatService.getChatHistory(req.user.id));

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendMessage, getChatHistory };