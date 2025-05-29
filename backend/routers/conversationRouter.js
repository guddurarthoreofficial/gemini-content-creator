import express from "express";
import { newConversation,newMessage } from "../controllers/conversationController.js"; // Correct named import

const conversationRouter = express.Router();

conversationRouter.post("/conversation", newConversation);

conversationRouter.put("/conversation/:id", newMessage);

export { conversationRouter };
