import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SYSTEM_PROMPT = {
  role: "system",
  content: "Behave like a programming teacher and you should be simple and small"
};

const createMessageString = (messages) => {
  return messages.map(message => `${message.role}: ${message.content}`).join("\n");
};


const generateContent = async (prompt, modelName = "gemini-2.0-flash", messages = []) => {

  console.log( 'femini api called');
  try {
    const newPrompt = {
      role: "user",
      content: prompt
    };

    const finalPrompt = createMessageString([SYSTEM_PROMPT, ...messages, newPrompt]);

    const response = await ai.models.generateContent({
      model: modelName,
      contents: finalPrompt,
    });

    console.log("AI Response:", response.text);

    return response.text;
  } catch (error) {
    console.error("Error:", error);
  }
};

export { generateContent };
