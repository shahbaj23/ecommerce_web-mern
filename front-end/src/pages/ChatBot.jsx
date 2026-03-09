import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import chatbot from "../assets/chatbot.png";

export default function ChatBot() {
  const [showChat, setShowChat] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showChat && (
        <div className="w-80 h-96 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden mb-4 transition-all duration-300">
          <div className="bg-[#d68e80] text-white p-3 flex justify-between items-center">
            <h3 className="font-semibold">Support Chat</h3>
            <AiOutlineClose
              className="cursor-pointer"
              onClick={() => setShowChat(false)}
            />
          </div>

          <div className="flex-1 p-3 overflow-y-auto text-sm">
            <div className="bg-gray-100 p-2 rounded-lg mb-2 w-fit">
              Hello 👋 How can I help you?
            </div>
          </div>

          <div className="p-2 border-t flex">
            <input
              type="text"
              placeholder="Type message..."
              className="flex-1 border rounded-l-lg px-2 outline-none"
            />
            <button className="bg-[#d68e80] text-white px-4 rounded-r-lg">
              Send
            </button>
          </div>
        </div>
      )}

      {!showChat && (
        <button
          onClick={() => setShowChat(!showChat)}
          className="w-[60px] h-[60px] bg-[#d68e80] p-3 flex items-center justify-center rounded-full shadow-lg hover:scale-110 transition cursor-pointer"
        >
          <img src={chatbot} alt="chatbot" />
        </button>
      )}
    </div>
  );
}
