import express from "express";
import conversationController from "../controllers/conversationController.js"
const  conversationRouter = express.Router;

conversationRouter = post("/conversation",conversationController.newConservation)


export{conversationRouter}