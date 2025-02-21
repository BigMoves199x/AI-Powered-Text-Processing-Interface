import { useState, useEffect } from "react";
import axios from "axios";

const Chatbox = ({ messages = [] }) => {
  const [detectedLanguages, setDetectedLanguages] = useState({});
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; // ✅ Fetch from .env
  const GOOGLE_TRANSLATE_URL =
    "https://translation.googleapis.com/language/translate/v2/detect";

  useEffect(() => {
    const detectLanguages = async () => {
      const newDetectedLanguages = {};

      for (const msg of messages) {
        if (!msg.text) continue;

        try {
          const response = await axios.post(
            `${GOOGLE_TRANSLATE_URL}?key=${GOOGLE_API_KEY}`,
            { q: msg.text }
          );

          // Extract the detected language
          const detectedLang = response.data.data.detections[0][0].language;
          newDetectedLanguages[msg.text] = detectedLang;
        } catch (error) {
          console.error("Error detecting language:", error);
          newDetectedLanguages[msg.text] = "Error";
        }
      }

      setDetectedLanguages(newDetectedLanguages);
    };

    if (messages.length > 0) detectLanguages();
  }, [messages]);

  return (
    <div className="flex flex-col w-full max-w-auto">
      <div className="flex flex-col gap-3 overflow-y-auto flex-grow bg-gray-100 p-4 rounded-lg scrollbar-hide">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl shadow-md text-sm max-w-[75%] break-words ${
              msg.type === "user"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-gray-800 self-start"
            }`}
          >
            <p>{msg.text}</p>
            <small className="text-gray-500 block mt-1">
              Language: {detectedLanguages[msg.text] || "Detecting..."}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chatbox;
