import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const run = async () => {
  try {
    // Create client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Pick a model (from .env or fallback to gemini-pro)
    const model = genAI.getGenerativeModel({
      model: process.env.GEMINI_MODEL || "gemini-pro",
    });

    // Quick test prompt
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: "Hello Gemini, say hi!" }] }],
    });

    console.log("🤖 Gemini says:", result.response.text());
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

run();