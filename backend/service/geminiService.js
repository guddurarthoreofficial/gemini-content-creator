import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


async function generateContent(promt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: promt,
    });
    console.log("AI Response:", response.text);
  } catch (error) {
    console.error("Error:", error);
  }
}

export {generateContent};
