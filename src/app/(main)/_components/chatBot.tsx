"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Minus, Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useGetMessage } from "@/app/hooks/useChatbotQueries";
import { cn } from "@/lib/utils";

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { role: string; text: string }[]
  >([]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const { mutateAsync, isPending } = useGetMessage();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isPending) return; // 🔒 Prevent empty + multiple submit

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");

    try {
      const data = await mutateAsync(trimmed);

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text:
            data?.reply ||
            "I don't have information about that in our available courses.",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Something went wrong." },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 animate-bounce"
        >
          <MessageCircle size={26} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="w-96 h-[520px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-in fade-in zoom-in-95 duration-300">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white flex justify-between items-center px-5 py-3">
            <span className="font-semibold tracking-wide">
              SkillSeed Assistant 💬
            </span>
            <button
              onClick={() => setOpen(false)}
              className="hover:rotate-90 transition-transform duration-300"
            >
              <Minus size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-sm bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-400 mt-20 space-y-2">
                <p className="text-lg">👋 Hi there!</p>
                <p>Ask about a course...</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "px-4 py-2 rounded-2xl max-w-[80%] text-sm shadow-sm transition-all duration-200",
                  msg.role === "user"
                    ? "ml-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md"
                    : "mr-auto bg-white text-gray-800 border rounded-bl-md"
                )}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}

            {/* Thinking Loader */}
            {isPending && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2 rounded-2xl shadow-sm border text-gray-400 text-xs animate-pulse">
                  SkillSeed is typing...
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t bg-white p-3 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type your message..."
              className="flex-1 text-sm border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <button
              onClick={handleSend}
              disabled={!input.trim() || isPending}
              className={cn(
                "p-2 rounded-full transition-all duration-300",
                input.trim() && !isPending
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:scale-110 shadow-md"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              )}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}