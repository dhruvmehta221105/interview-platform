const config = require("../config/env");
const ServiceError = require("./serviceError");

const generateResponse = async (message) => {
  if (!config.openRouterApiKey) {
    throw new ServiceError("AI service is not configured", 503);
  }

  const response = await fetch(config.openRouterUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.openRouterApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: config.openRouterModel,
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      max_tokens: 1024
    })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new ServiceError(data?.error?.message || "AI service request failed", 502);
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) throw new ServiceError("AI service returned an empty response", 502);
  return content;
};

module.exports = { generateResponse };
