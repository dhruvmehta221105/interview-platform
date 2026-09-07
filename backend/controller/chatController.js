const Chat = require("../models/Chat");
const getBotResponse = require("../utils/chatbot");

// send message + store in DB
const sendMessage = async (req, res) => {
  try {
    console.log("API HIT");
    console.log("BODY:", req.body);

    const { message, response } = req.body;

    // validate input
    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    // get response from chatbot
    const botResponse = response;

    // save to MongoDB
    const chat = await Chat.create({
      userId: req.user.id,
      message,
      response: botResponse,
    });

    console.log("SAVED TO DB:", chat);

    res.json({
      message,
      response: botResponse,
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// get chat history
const getChatHistory = async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user.id })
      .sort({ createdAt: 1 });

    res.json(chats);

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendMessage, getChatHistory };