import { useState } from "react";
import { motion } from "framer-motion";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });
    const data = await res.json();

    setMessages((prev) => [...prev, { sender: "bot", text: data.answer }]);
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg p-6 rounded-2xl shadow-xl flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-indigo-600">
          💸 Financial Services Chatbot
        </h1>
        <div className="flex flex-col gap-2 h-80 overflow-y-auto">
          {messages.map((m, i) => (
            <motion.div
              key={i}
              className={`p-3 rounded-xl max-w-xs ${
                m.sender === "user"
                  ? "bg-indigo-100 self-end"
                  : "bg-green-100 self-start"
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {m.text}
            </motion.div>
          ))}
          {loading && <p className="text-gray-500">⏳ Thinking...</p>}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border p-2 rounded-xl"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about loans, fraud, etc."
          />
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded-xl hover:bg-indigo-600"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}