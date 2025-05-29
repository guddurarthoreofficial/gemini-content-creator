import express from "express";
import { deleteConversation, getConversations, newConversation,newMessage } from "../controllers/conversationController.js"; // Correct named import

const conversationRouter = express.Router();



conversationRouter.get("/conversation", getConversations);
conversationRouter.post("/conversation", newConversation);
conversationRouter.put("/conversation/:id", newMessage);
conversationRouter.delete("/conversation/:id", deleteConversation);



export { conversationRouter };
