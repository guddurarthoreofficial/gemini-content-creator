import express from "express";
import dotenv from "dotenv";

dotenv.config(); // Load .env before using process.env 
import {generateContent} from './service/geminiService.js'

const app = express();

app.get("/", (req, res) => {
  res.send("hello");
});

// console.log(process.env.GEMINI_API_KEY)
// generateContent("Do you know  guddu singh rathore youtuber ")

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
