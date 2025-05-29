import Conversation from "../models/Conversation.js";
import { generateContent,generateTitle } from "../service/geminiService.js";

const getConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find();
    res.json(conversations);
  } catch (error) {
    next(error);
  }
};


const newConversation = async (req, res, next) => {
  const { prompt, model = "gemini-1.5-flash" } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const content = await generateContent(prompt);
     const messages =  [
        { role: "user", content: prompt },
        { role: "assistant", content },
      ];

      const title =  await generateTitle(messages);
      console.log("tiltle: " , title);


    const conversation = new Conversation({title, model, messages});

    await conversation.save();
    res.status(201).json(conversation);
  } catch (error) {
    next(error);
  }
};

const newMessage = async (req, res, next) => {
  const { id } = req.params;
  const { prompt } = req.body;

  const conversation = await Conversation.findById(id);
  if (!conversation) {
    res.status(404).json({ message: "conversation not found" });
  }

  const content = await generateContent(
    prompt,
    conversation.model,
    conversation.messages
  );

  conversation.messages.push({ role: "user", content: prompt });
  conversation.messages.push({ role: "assistant", content: content });

  await conversation.save(); // <- Save updates to DB

  res.json(conversation);
};


const deleteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedConversation = await Conversation.findByIdAndDelete(id);

    if (!deletedConversation) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    res.status(204).send(); // No content response for successful deletion
  } catch (error) {
    next(error); // Pass error to the error-handling middleware
  }
};



export { newConversation, newMessage, getConversations, deleteConversation};
