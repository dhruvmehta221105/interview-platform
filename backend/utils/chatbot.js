const getBotResponse = async (message) => {
  const msg = message.toLowerCase();

  if (msg.includes("hello")) {
    return "Hello! How can I help you?";
  }

  if (msg.includes("oop")) {
    return "OOP stands for Object-Oriented Programming.";
  }

  return "I am your interview assistant.";
};

module.exports = getBotResponse;