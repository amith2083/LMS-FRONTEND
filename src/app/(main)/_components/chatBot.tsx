"use client";

import { useState } from "react";
import { MessageCircle, Minus, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text }),
      });

      const data = await res.json();
      const botMsg = { role: "bot", text: data.answer || "Sorry, I couldn’t find that." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: "⚠️ Something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="w-80 h-96 bg-white border border-gray-200 rounded-2xl shadow-xl flex flex-col overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="bg-blue-600 text-white flex items-center justify-between px-4 py-2">
            <span className="font-semibold text-sm">SkillSeed Assistant</span>
            <button
              onClick={() => setOpen(false)}
              className="hover:bg-white/20 p-1 rounded"
              aria-label="Minimize"
            >
              <Minus size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.length === 0 && (
              <p className="text-center text-gray-400 mt-10">Ask about a course...</p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-primary text-white self-end ml-auto max-w-[75%]"
                    : "bg-gray-100 text-gray-800 mr-auto max-w-[85%]"
                }`}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}

            {loading && (
              <p className="text-xs text-gray-400 text-center">Thinking...</p>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-2 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 text-sm border border-gray-200 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-primary/90 transition"
              aria-label="Send message"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
