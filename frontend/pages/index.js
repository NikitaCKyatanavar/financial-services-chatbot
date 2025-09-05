import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages([
        ...newMessages,
        {
          role: "bot",
          text: data.answer || "No answer found",
        },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { role: "bot", text: "⚠️ Error: Could not fetch response. Try again." },
      ]);
    }
    setLoading(false);
  }

  // Function to detect URLs in bot text and render clickable links
  const renderBotText = (text) => {
    return text.split(/(https?:\/\/[^\s)]+)/g).map((part, idx) =>
      part.match(/https?:\/\/[^\s)]+/) ? (
        <a
          key={idx}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="source-link"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <style jsx>{`
        body {
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #dbeafe, #e0e7ff, #f3e8ff);
          background-attachment: fixed;
        }
        .chat-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
          max-width: 700px;
          margin: 50px auto;
          padding: 25px;
          display: flex;
          flex-direction: column;
          height: 80vh;
          transition: all 0.3s ease;
        }
        .chat-header {
          font-size: 30px;
          font-weight: bold;
          color: #4338ca;
          text-align: center;
          margin-bottom: 15px;
        }
        .messages {
          flex: 1;
          overflow-y: auto;
          padding: 15px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .user-msg {
          align-self: flex-end;
          background: linear-gradient(90deg, #3b82f6, #6366f1);
          color: white;
          padding: 12px 16px;
          border-radius: 18px 18px 0 18px;
          max-width: 70%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
          word-wrap: break-word;
        }
        .bot-msg {
          align-self: flex-start;
          background: #f3f4f6;
          color: #111827;
          padding: 12px 16px;
          border-radius: 18px 18px 18px 0;
          max-width: 70%;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
          word-wrap: break-word;
        }
        .source-link {
          color: #2563eb;
          text-decoration: underline;
          font-size: 13px;
          margin-left: 3px;
          transition: color 0.2s;
        }
        .source-link:hover {
          color: #1e40af;
        }
        .input-area {
          display: flex;
          margin-top: 15px;
          gap: 12px;
        }
        .input-box {
          flex: 1;
          padding: 14px;
          border: 1px solid #d1d5db;
          border-radius: 30px;
          font-size: 15px;
          outline: none;
          transition: all 0.2s;
        }
        .input-box:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 8px rgba(59, 130, 246, 0.3);
        }
        .send-btn {
          background: linear-gradient(90deg, #3b82f6, #6366f1);
          color: white;
          padding: 14px 22px;
          border-radius: 30px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .send-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        .typing {
          font-style: italic;
          color: #6b7280;
        }
      `}</style>

      <div className="chat-container">
        <div className="chat-header">💸 Financial Services Chatbot</div>

        <div className="messages">
          {messages.length === 0 && (
            <p className="typing" style={{ textAlign: "center" }}>
              Try asking <b>"What is credit card?"</b> or <b>"What is IMPS?"</b>
            </p>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={msg.role === "user" ? "user-msg" : "bot-msg"}>
              {msg.role === "bot" ? renderBotText(msg.text) : msg.text}
            </div>
          ))}
          {loading && <div className="bot-msg typing">⏳ Bot is typing...</div>}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-area">
          <input
            className="input-box"
            type="text"
            placeholder="Ask a financial question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button className="send-btn" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
