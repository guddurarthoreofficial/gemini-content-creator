import { generateContent } from "../service/geminiService.js";

const newConversation = async (req, res, next) => {
    const { prompt } = req.body;
    try {
        const content = await generateContent(prompt);
        res.json({ content });
    } catch (error) {
        next(error);
    }
};

export { newConversation };
