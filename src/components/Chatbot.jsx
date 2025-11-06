// src/components/Chatbot.jsx
import React, { useEffect, useRef, useState } from "react";

/**
 * Chatbot connected to Firebase Gemini function.
 * - Works locally with emulator or online after deploy.
 * - Shows "Bot is typing..." while waiting.
 * - Uses inline SVGs (no external icons).
 */

function BotMessage({ text }) {
  return (
    <div className="bg-gray-100 text-gray-900 rounded-lg px-3 py-2 max-w-xs shadow-sm">
      {text}
    </div>
  );
}

function UserMessage({ text }) {
  return (
    <div className="bg-blue-600 text-white rounded-lg px-3 py-2 max-w-xs self-end shadow-sm">
      {text}
    </div>
  );
}

// Simple icons (no imports)
function ChatIconSVG({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
function XIconSVG({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(() => [
    {
      from: "bot",
      text: "Hi! I'm the school helper. Ask me about admissions, timings or facilities 😊",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const boxRef = useRef();

  useEffect(() => {
    if (boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages, open, isTyping]);

  // 🧠 Send message to Firebase Function (Gemini)
  async function handleSend(e) {
    e?.preventDefault?.();
    const text = input.trim();
    if (!text) return;

    // Show user message instantly
    setMessages((m) => [...m, { from: "user", text }]);
    setInput("");
    setIsTyping(true);

    try {
      // Pick correct URL (local emulator vs cloud)
      const FUNCTION_URL =
        window.location.hostname === "localhost"
          ? "http://localhost:5001/gps-school-d322b/us-central1/geminiChat"
          : "https://us-central1-gps-school-d322b.cloudfunctions.net/geminiChat";

      const res = await fetch(FUNCTION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) {
        const errText = await res.text();
        console.error("Server error:", res.status, errText);
        setMessages((m) => [
          ...m,
          { from: "bot", text: "Sorry 😅, the assistant couldn't respond." },
        ]);
        setIsTyping(false);
        return;
      }

      const data = await res.json();
      const reply = data?.reply || "Hmm... no reply from Gemini.";

      setMessages((m) => [...m, { from: "bot", text: reply }]);
    } catch (err) {
      console.error("Network error:", err);
      setMessages((m) => [
        ...m,
        { from: "bot", text: "⚠️ Network error. Please try again later." },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  return (
    <>
      {/* Chat Panel */}
      <div
        className={`fixed right-4 bottom-20 z-50 transition-all ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{ width: 360 }}
      >
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-96">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                S
              </div>
              <div>
                <div className="font-semibold">School Assistant</div>
                <div className="text-xs text-gray-500">
                  Smart replies powered by Gemini
                </div>
              </div>
            </div>
            <button
              aria-label="Close chat"
              className="p-2 rounded-md hover:bg-gray-100"
              onClick={() => setOpen(false)}
              title="Close"
            >
              <XIconSVG className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={boxRef}
            className="flex-1 p-4 overflow-y-auto space-y-3 bg-gradient-to-b from-white to-gray-50"
          >
            <div className="flex flex-col gap-3">
              {messages.map((m, i) =>
                m.from === "bot" ? (
                  <div key={i} className="flex">
                    <BotMessage text={m.text} />
                  </div>
                ) : (
                  <div key={i} className="flex justify-end">
                    <UserMessage text={m.text} />
                  </div>
                )
              )}
              {isTyping && (
                <div className="flex">
                  <BotMessage text="🤖 Bot is typing..." />
                </div>
              )}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="border-t px-3 py-3">
            <div className="flex gap-2 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:opacity-95"
                aria-label="Send message"
              >
                Send
              </button>
            </div>
            <div className="text-xs text-gray-400 mt-1 px-2">
              Tip: Ask about admissions, timings, or fees.
            </div>
          </form>
        </div>
      </div>

      {/* Floating Button */}
      <div className="fixed z-50 right-4 bottom-4">
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-14 h-14 rounded-full shadow-2xl bg-blue-600 flex items-center justify-center text-white transform hover:scale-105 transition"
          title="Chat with us"
          aria-label="Open chat"
        >
          {!open ? (
            <ChatIconSVG className="w-7 h-7" />
          ) : (
            <XIconSVG className="w-6 h-6" />
          )}
        </button>
      </div>
    </>
  );
}


