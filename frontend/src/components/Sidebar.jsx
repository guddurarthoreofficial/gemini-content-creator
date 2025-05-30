import { useContext } from "react";
import { ChatContext } from "../store/Chatcontex";
import formatTime from "../util/timeUtil";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const { chats } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleNewChat = () => {
    navigate("/");
  };

  return (
    <aside className="w-full sm:w-72 h-screen bg-white text-gray-900 p-4 flex flex-col border-r border-gray-300">
      <h2 className="text-xl font-bold mb-4 text-center">
        Gemini Content Generator
      </h2>

      <button
        onClick={handleNewChat}
        className="mb-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white transition"
      >
        + New Chat
      </button>

      <div className="flex-1 overflow-y-auto space-y-3">
        {chats.length === 0 ? (
          <p className="text-gray-500">No chats yet.</p>
        ) : (
          chats.map((chat) => (
            <Link
              to={`/conversation/${chat._id}`}
              key={chat._id}
              className="block p-3 rounded-md hover:bg-gray-100 transition border border-gray-200"
            >
              <div className="font-semibold truncate">{chat.title}</div>
              <div className="text-sm text-gray-600">{formatTime(chat.startTime)}</div>
            </Link>
          ))
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
