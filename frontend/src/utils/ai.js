const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = "mistralai/mixtral-8x7b-instruct";
export async function getAIResponse(prompt) {
  console.log("[OpenRouter] API Key Present:", !!API_KEY);

  if (!API_KEY) {
    console.error("[OpenRouter] ERROR: VITE_OPENROUTER_API_KEY is not set in .env");
    return "API key not configured";
  }

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    console.warn("[OpenRouter] WARNING: Invalid prompt provided");
    return "Invalid prompt";
  }

  try {
    console.log("[OpenRouter] Sending request to:", API_URL);
    console.log("[OpenRouter] Model:", MODEL);
    console.log("[OpenRouter] Prompt:", prompt.substring(0, 50) + (prompt.length > 50 ? "..." : ""));

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.href,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "user",
            content: prompt.trim(),
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    console.log("[OpenRouter] HTTP Status:", response.status, response.statusText);

    const responseText = await response.text();
    console.log("[OpenRouter] Raw Response:", responseText);

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      console.error("[OpenRouter] JSON Parse Error:", parseError.message);
      return `Parse Error: ${response.status}`;
    }

    if (!response.ok) {
      const errorMessage = data?.error?.message || `HTTP ${response.status}`;
      console.error("[OpenRouter] API Error:", data?.error);
      return `Error: ${errorMessage}`;
    }

    console.log("[OpenRouter] Full Response Object:", data);

    if (!data || !data.choices || data.choices.length === 0) {
      console.warn("[OpenRouter] WARNING: No choices in response");
      return "No response generated";
    }

    const textContent = data.choices[0]?.message?.content;
    if (!textContent) {
      console.warn("[OpenRouter] WARNING: No text content in response");
      return "Empty response";
    }

    console.log("[OpenRouter] SUCCESS: Response received");
    return textContent;
  } catch (error) {
    console.error("[OpenRouter] Fetch Error:", error.message);
    console.error("[OpenRouter] Error Stack:", error.stack);
    return "Error fetching response";
  }
}
