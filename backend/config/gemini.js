import dotenv from "dotenv";
dotenv.config();

/**
 * Generate text using Gemini REST API
 * Uses a model that is confirmed available for this API key
 */
export const generateText = async (prompt, options = {}) => {
  try {
    const MODEL = "gemini-flash-latest"; // ✅ confirmed from ListModels
    const API_VERSION = "v1beta";

    const { temperature = 0.7, maxTokens = 2048 } = options;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/${API_VERSION}/models/${MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature,
            maxOutputTokens: maxTokens,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("❌ Gemini API Error:", data.error);
      throw new Error(data.error.message);
    }

    if (!data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error("⚠️ Gemini raw response:", data);
      throw new Error("Empty Gemini response");
    }

    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("❌ Gemini REST Error:", error.message);
    throw new Error("Gemini generation failed: " + error.message);
  }
};

/**
 * Validate Gemini configuration
 */
export const validateGeminiConfig = () => {
  if (!process.env.GEMINI_API_KEY) {
    console.error("❌ GEMINI_API_KEY missing");
    return false;
  }
  return true;
};
