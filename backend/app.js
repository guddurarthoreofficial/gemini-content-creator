import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

import { conversationRouter } from "./routers/conversationRouter.js";
import { errorController } from "./controllers/errorController.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api", conversationRouter);

// Optional Error Handling Middleware
app.use(errorController);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server running on http://localhost:3000");
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });
