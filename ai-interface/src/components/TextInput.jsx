import { useState } from "react";
import Chatbox from "./ChatBox";
// Import your Chatbox component

const TextInput = () => {
  const [messages, setMessages] = useState([]); // Store messages
  const [input, setInput] = useState(""); // Store textarea input

  const sendMessage = () => {
    if (input.trim() === "") return; // Prevent empty messages

    const newMessage = { text: input, type: "user" }; // Create message object
    setMessages([...messages, newMessage]); // Add to messages
    setInput(""); // Clear input field
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-200">
      {/* Chatbox Component */}
      <Chatbox messages={messages || []} /> 

      {/* Input Box */}
      <div className="p-2 bg-gray-800 flex items-center gap-3 rounded-full absolute bottom-4 w-[90%] mx-auto left-1/2 transform -translate-x-1/2">
        {/* Text Input */}
        <textarea
          className="flex-grow p-2 bg-gray-900 rounded-full text-white border border-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="2"
          placeholder="Type here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      
        {/* Send Button */}
        <button
          className="px-4 py-2 bg-blue-500 rounded-full text-white font-medium hover:bg-blue-600 transition disabled:opacity-50"
          onClick={sendMessage}
          disabled={!input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default TextInput;
