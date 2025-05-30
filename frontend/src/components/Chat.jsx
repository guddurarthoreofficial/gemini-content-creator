import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatContext } from "../store/Chatcontex";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { id } = useParams();
  const { chats, addChat, updateChat } = useContext(ChatContext);
  const [chat, setChat] = useState();
  const messageRef = useRef(null);
  const modelRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate  = useNavigate();

  useEffect(() => {
    if (id) {
      setChat(chats.find((chat) => chat._id === id));
    } else {
      setChat(null);
    }
  }, [id, chats]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = id
      ? `http://localhost:3000/api/conversation/${id}`
      : "http://localhost:3000/api/conversation";

    const method = id ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: messageRef.current.value,
        model: modelRef.current.value,
      }),
    })
      .then((res) => res.json())
      .then((chat) => {
        setChat(chat);
        if (id) updateChat(chat);
        else addChat(chat);
        messageRef.current.value = "";
        navigate(`conversation/${chat._id}`);
      })
      .catch((err) => setError(err.message || "Something went wrong."))
      .finally(() => setLoading(false));
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-blue-100">

      <div className="sticky top-0 z-10 bg-white shadow-sm px-4 py-3 border-b">
        {chat ? (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xl font-semibold text-blue-900 truncate">{chat.title}</span>
            <span className="text-sm text-gray-500 font-medium mt-1 sm:mt-0 sm:ml-3">
              Model: {chat.model}
            </span>
          </div>
        ) : (
          <div className="text-xl font-semibold text-blue-900">New Conversation</div>
        )}
      </div>


      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {chat && chat.messages.length > 0 ? (
          chat.messages.map((message) => (
            <div
              key={message._id}
              className={`flex ${message.role === "user" ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl shadow ${message.role === "user"
                    ? "bg-gray-200 text-gray-900"
                    : "bg-blue-600 text-white"
                  }`}
              >
                <div className="text-xs text-gray-500 mb-1 flex justify-between">
                  <span className="font-medium capitalize">
                    {message.role === "user" ? "You" : "Assistant"}
                  </span>
                </div>
                <div className="whitespace-pre-line text-sm">{message.content}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 italic mt-10">
            Send a message to start the conversation.
          </div>
        )}
      </div>

      {/* Error Display */}
      {error && <div className="text-red-500 px-4 mb-2">{error}</div>}

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        className="sticky bottom-0 z-10 bg-white border-t p-4 flex flex-col sm:flex-row gap-3"
      >
        <input
          type="text"
          name="prompt"
          ref={messageRef}
          placeholder="Type your message..."
          className="flex-1 border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
          required
        />
        <select
          name="model"
          ref={modelRef}
          className="border rounded-md px-3 py-2 text-sm bg-white focus:outline-none"
        >
          <option value="gemini-1.5-flesh-8b">Gemini 1.5 Flesh-8b</option>
          <option value="gemini-1.5-flesh">Gemini 1.5 Flesh</option>
          <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-5 py-2 rounded-md text-sm hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default Chat;
