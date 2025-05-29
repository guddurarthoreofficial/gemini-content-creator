import Conversation from "../models/Conversation.js";
import { generateContent } from "../service/geminiService.js";

const newConversation = async (req, res, next) => {
  const { prompt, model = "gemini-1.5-flash" } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const content = await generateContent(prompt);

    const conversation = new Conversation({
      title: prompt,
      model,
      messages: [
        { role: "user", content: prompt },
        { role: "assistant", content },
      ],
    });

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

export { newConversation, newMessage };
