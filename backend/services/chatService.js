const Chat = require("../models/Chat");
const { generateResponse } = require("./aiService");

const sendMessage = async (userId, message) => {
  const response = await generateResponse(message);
  const chat = await Chat.create({ userId, message, response });
  return { message: chat.message, response: chat.response };
};

const getChatHistory = (userId) =>
  Chat.find({ userId }).sort({ createdAt: 1 });

module.exports = { sendMessage, getChatHistory };
