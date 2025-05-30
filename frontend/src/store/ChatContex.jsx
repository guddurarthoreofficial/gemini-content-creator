import { createContext, useEffect, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);

        fetch("http://localhost:3000/api/conversation/", { method: "GET" })
            .then((res) => res.json())
            .then((chats) => {
                setChats(chats);
                console.log(chats)
            })
            .catch((err) => {
                setError(err.message || "Something went wrong.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    const addChat = (chat) => {
        setChats((prevChats) => [...prevChats, chat]);
    };

    const deleteChat = (id) => {
        setChats((prevChats) => prevChats.filter((chat) => chat._id !== id));
    };

    const updateChat = (updatedChat) => {
        setChats((prevChats) =>
            prevChats.map((chat) =>
                chat._id === updatedChat._id ? updatedChat : chat
            )
        );
    };

    return (
        <ChatContext.Provider
            value={{ chats, loading, error, addChat, deleteChat, updateChat }}
        >
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-red-600 text-lg font-semibold">
                        Error: {error}
                    </p>
                </div>
            ) : (
                children
            )}
        </ChatContext.Provider>
    );
};
