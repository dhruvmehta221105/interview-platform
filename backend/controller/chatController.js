const Chat = require("../models/Chat");
const getBotResponse = require("../utils/chatbot");

// send message + store in DB
const sendMessage = async (req, res) => {
  try {
    console.log("API HIT");
    console.log("BODY:", req.body);

    const { userId, message, response } = req.body;

    // validate input
    if (!userId || !message) {
      return res.status(400).json({ error: "userId and message are required" });
    }

    // get response from chatbot
    const botResponse = response;

    // save to MongoDB
    const chat = await Chat.create({
      userId,
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
    console.log("FETCH CHAT FOR:", req.params.userId);

    const chats = await Chat.find({ userId: req.params.userId })
      .sort({ createdAt: 1 });

    res.json(chats);

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { sendMessage, getChatHistory };