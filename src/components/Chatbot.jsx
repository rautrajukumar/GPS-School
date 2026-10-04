// src/components/Chatbot.jsx
import React, { useEffect, useRef, useState } from "react";

const SCHOOL_SYSTEM_INSTRUCTION = `You are the official AI Assistant for Gaushala Public School (GPS), a trusted elementary school established in 2010.
School Information:
- Grades offered: Nursery, KG, and Primary Classes 1 through 5.
- Vision: To nurture young minds for lifelong learning, responsibility, and joy.
- Mission: Inspire and empower children to achieve their highest potential in a loving, secure, and inclusive environment.
- History: Founded in 2010 with Nursery & KG; expanded to Class 5 in 2015; recognized in 2022 for excellence in primary education.
- Curriculum:
  * Nursery: Play-based learning, letters, numbers, rhymes, storytelling.
  * KG: Language development, numbers, art, music, sensory activities.
  * Class 1: Mathematics, English, Environmental Studies (EVS), interactive activities.
  * Class 2: Mathematics, languages, basic social science, creative expressions.
  * Class 3: Science, general knowledge, computers, art.
  * Class 4: Core subjects, group projects, reading development.
  * Class 5: Leadership skills, advanced projects, preparation for middle school.
- Extracurricular Activities: Art & Craft, Music & Dance, Sports & Yoga, Storytelling, Digital Smart Classrooms.
- Admission Process:
  1. Fill online or offline application form (downloadable on the website).
  2. Submit required documents (birth certificate, previous marksheet, passport photos).
  3. Interactive assessment / child interaction session.
  4. Final admission confirmation and fee submission.
- Eligibility: Nursery (3+ years as of March 31st), KG (4+ years), Class 1 (5+ years).
- Annual Fee Structure:
  * Nursery & KG: ₹15,000 per year
  * Class 1 to Class 5: ₹18,000 per year
- School Timings:
  * Monday to Friday: 8:30 AM – 2:00 PM
  * Saturday: 8:30 AM – 12:30 PM
  * Sunday: Closed
- Contact Information:
  * Address: Gaushala Public School, Main Road, City
  * Email: contact@gpschool.edu
  * Phone: +91-90000-90000
Guidelines:
- Keep answers warm, welcoming, clear, and concise.
- Use bullet points when listing features, steps, or fees.
- If asked about something outside the school's scope, politely direct the user to contact the school office.`;

// Quick suggestion buttons
const QUICK_PROMPTS = [
  "Admission Process 📋",
  "Fee Structure 💰",
  "School Timings ⏰",
  "Contact Info 📞",
];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "Hello! Welcome to Gaushala Public School. I'm your AI assistant. How can I help you today? 😊",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const boxRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = boxRef.current.scrollHeight;
    }
  }, [messages, open, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [open]);

  async function sendMessage(textToSend) {
    const text = (textToSend || input).trim();
    if (!text || isTyping) return;

    const newMessages = [...messages, { from: "user", text }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const apiKey =
        import.meta.env.VITE_GEMINI_API_KEY ||
        "AIzaSyCkw_cPT9QG-nYh1PupsYwCkIsma64Qa5k";

      // Prepare conversation history for Gemini (last 10 turns max)
      const historyContents = [];
      const historySlice = newMessages.slice(-10);

      for (const msg of historySlice) {
        historyContents.push({
          role: msg.from === "user" ? "user" : "model",
          parts: [{ text: msg.text }],
        });
      }

      const payload = {
        systemInstruction: {
          parts: [{ text: SCHOOL_SYSTEM_INSTRUCTION }],
        },
        contents: historyContents,
      };

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(
          apiKey
        )}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errBody = await response.text();
        console.error("Gemini API error:", response.status, errBody);
        throw new Error(`API returned status ${response.status}`);
      }

      const data = await response.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't generate a reply. Please contact the school office directly.";

      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (err) {
      console.error("Chatbot request failed:", err);
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "⚠️ Sorry, I had trouble connecting. Please check your internet connection or try again in a moment.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendMessage();
  }

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed right-4 bottom-24 z-50 transition-all duration-300 transform ${
          open
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
        style={{ width: "min(380px, calc(100vw - 32px))" }}
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 text-white px-4 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-lg border border-white/30 shadow-inner">
                🏫
              </div>
              <div>
                <div className="font-semibold text-sm tracking-wide">
                  GPS School Assistant
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>Online • Gemini 2.5 Flash</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1.5 rounded-full hover:bg-white/20 text-white/90 hover:text-white transition"
              title="Close"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Container */}
          <div
            ref={boxRef}
            className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-sm"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.from === "bot" && (
                  <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-semibold mr-2 flex-shrink-0 mt-0.5">
                    🤖
                  </div>
                )}
                <div
                  className={`rounded-2xl px-3.5 py-2.5 max-w-[85%] whitespace-pre-wrap leading-relaxed shadow-sm ${
                    m.from === "user"
                      ? "bg-blue-600 text-white rounded-br-xs"
                      : "bg-white text-gray-800 border border-gray-100 rounded-bl-xs"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick Suggestion Chips (shown after welcome message) */}
            {messages.length === 1 && (
              <div className="pt-2">
                <p className="text-xs text-gray-400 font-medium mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-xs bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 hover:border-blue-300 rounded-full px-3 py-1.5 font-medium transition shadow-2xs"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs mr-1">
                  🤖
                </div>
                <div className="bg-white border border-gray-100 rounded-2xl px-4 py-2.5 shadow-sm flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about admissions, fees, timings..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:hover:bg-blue-600 text-white rounded-full p-2.5 transition shadow-sm flex items-center justify-center cursor-pointer"
                aria-label="Send message"
              >
                <svg className="w-4 h-4 transform rotate-90" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
            <div className="flex justify-between items-center px-2 mt-1.5 text-[11px] text-gray-400">
              <span>Gaushala Public School Helper</span>
              {messages.length > 2 && (
                <button
                  type="button"
                  onClick={() =>
                    setMessages([
                      {
                        from: "bot",
                        text: "Hello! Welcome to Gaushala Public School. I'm your AI assistant. How can I help you today? 😊",
                      },
                    ])
                  }
                  className="hover:text-red-500 hover:underline cursor-pointer"
                >
                  Clear chat
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Floating Toggle Button */}
      <div className="fixed z-50 right-4 bottom-4">
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="w-14 h-14 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 flex items-center justify-center text-white transform hover:scale-105 active:scale-95 transition duration-200 cursor-pointer"
          title={open ? "Close chat" : "Chat with School Assistant"}
          aria-label={open ? "Close chat" : "Open chat"}
        >
          {open ? (
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <div className="relative">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></span>
            </div>
          )}
        </button>
      </div>
    </>
  );
}
