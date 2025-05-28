import express from "express";
import { newConversation } from "../controllers/conversationController.js"; // Correct named import

const conversationRouter = express.Router();

conversationRouter.post("/conversation", newConversation); // Fixed router usage and function name

export { conversationRouter };
