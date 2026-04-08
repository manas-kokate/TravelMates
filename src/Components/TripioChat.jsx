import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send, Mic, Sparkles, MapPin, Calendar, DollarSign,
  RefreshCw, Copy, ThumbsUp, ThumbsDown, Compass,
  X, ChevronRight, Plane, Hotel, UtensilsCrossed,
  Camera, Backpack, Zap, RotateCcw, ChevronDown,
} from "lucide-react";

// ── Tripio system prompt ───────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Tripio, the friendly AI travel companion for travelMates — a platform that connects solo travelers around the world.

Your personality:
- Warm, enthusiastic, and encouraging about travel
- Knowledgeable about destinations, budgets, culture, safety, and logistics
- Concise but rich — give practical, specific advice, not generic tips
- Use travel emojis naturally (✈️ 🌍 📍 🗺️ 🏔️ etc.)
- Address the user as a fellow traveler, not a customer

You help with:
- Building complete day-by-day itineraries
- Budget breakdowns and cost estimates
- Finding travel companions and connection tips
- Hidden gems and off-the-beaten-path suggestions
- Visa, safety, packing, and timing advice
- Restaurant, accommodation, and activity recommendations

Format your responses clearly:
- Use **bold** for destination names, key tips, and important facts
- Use bullet points for lists and itineraries
- For multi-day itineraries, use Day 1:, Day 2: etc. format
- Keep responses focused and actionable
- End with a follow-up question or offer to dive deeper

You are NOT a general-purpose assistant — stay focused on travel topics only. If asked about non-travel topics, gently redirect back to travel planning.`;

// ── Prompt suggestions ────────────────────────────────────────────────────────
const SUGGESTIONS = [
  { icon: MapPin, emoji: "🗺️", text: "Plan a 7-day Japan itinerary for ₹80,000", tag: "Itinerary", color: "bg-rose-50 border-rose-100 text-rose-600" },
  { icon: DollarSign, emoji: "💸", text: "What's a realistic budget for 2 weeks in Europe?", tag: "Budget", color: "bg-green-50 border-green-100 text-green-600" },
  { icon: Backpack, emoji: "🎒", text: "Best solo travel destinations in Southeast Asia", tag: "Discover", color: "bg-violet-50 border-violet-100 text-violet-600" },
  { icon: Calendar, emoji: "📅", text: "When is the best time to visit Patagonia?", tag: "Timing", color: "bg-sky-50 border-sky-100 text-sky-600" },
  { icon: UtensilsCrossed, emoji: "🍜", text: "Hidden food gems in Marrakech medina", tag: "Food", color: "bg-amber-50 border-amber-100 text-amber-600" },
  { icon: Plane, emoji: "✈️", text: "How to find cheap flights from India to Europe", tag: "Flights", color: "bg-teal-50 border-teal-100 text-teal-600" },
  { icon: Camera, emoji: "📸", text: "Top photography spots in Santorini and Mykonos", tag: "Photo", color: "bg-pink-50 border-pink-100 text-pink-600" },
  { icon: MapPin, emoji: "🏔️", text: "Easy treks in Nepal for a first-time solo trekker", tag: "Trek", color: "bg-lime-50 border-lime-100 text-lime-600" },
];

const QUICK_ACTIONS = [
  { label: "✈️ Build Itinerary", prompt: "Help me build a detailed travel itinerary. Ask me the destination, duration, budget and interests." },
  { label: "💸 Budget Planner", prompt: "Help me plan a travel budget. Ask me where I'm going and for how long." },
  { label: "🏨 Find Stay", prompt: "Help me find the best accommodation options for my trip. Ask me the details." },
  { label: "🧳 Packing List", prompt: "Create a smart packing list for my trip. Ask me the destination and duration." },
];

// ── Typing indicator ──────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex items-end gap-2">
      {/* Tripio avatar */}
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5E0006] to-[#9B1C1C] flex items-center justify-center shrink-0 shadow-md">
        <Sparkles size={14} className="text-white" />
      </div>
      <div className="bg-white border border-[#FFE0C8] rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#A0522D]"
              style={{ animation: `tripio-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Message bubble ────────────────────────────────────────────────────────────
function MessageBubble({ msg, onCopy, onRate }) {
  const [copied, setCopied] = useState(false);
  const [rated, setRated] = useState(null);
  const isTripio = msg.role === "assistant";

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content).catch(() => { });
    setCopied(true);
    onCopy?.();
    setTimeout(() => setCopied(false), 2000);
  };

  // Render markdown-lite: bold, bullets
  const renderContent = (text) => {
    const lines = text.split("\n");
    return lines.map((line, i) => {
      // Bold
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const rendered = parts.map((p, j) =>
        j % 2 === 1 ? <strong key={j} className="font-semibold text-[#1A0500]">{p}</strong> : p
      );

      // Bullet
      if (line.trim().startsWith("- ") || line.trim().startsWith("• ")) {
        return (
          <div key={i} className="flex gap-2 my-0.5">
            <span className="text-[#A0522D] mt-0.5 shrink-0">·</span>
            <span>{rendered}</span>
          </div>
        );
      }
      // Day header
      if (/^Day \d+:/i.test(line.trim())) {
        return <p key={i} className="font-bold text-[#5E0006] mt-2 mb-0.5">{rendered}</p>;
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="leading-relaxed">{rendered}</p>;
    });
  };

  return (
    <div className={`flex items-end gap-2.5 group ${isTripio ? "flex-row" : "flex-row-reverse"}`}>
      {/* Avatar */}
      {isTripio ? (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5E0006] to-[#9B1C1C] flex items-center justify-center shrink-0 shadow-md self-end">
          <Sparkles size={14} className="text-white" />
        </div>
      ) : (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e8a090] to-[#9B1C1C] flex items-center justify-center shrink-0 text-xs font-bold text-white shadow-md self-end">
          AK
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[80%] ${isTripio ? "items-start" : "items-end"}`}>
        {isTripio && (
          <span className="text-[10px] font-bold text-[#8B6355] px-1 flex items-center gap-1">
            <Sparkles size={9} className="text-[#5E0006]" /> Tripio
          </span>
        )}

        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
          ${isTripio
            ? "bg-white border border-[#FFE0C8] text-[#1A0500] rounded-bl-md"
            : "bg-[#5E0006] text-white rounded-br-md"
          }`}
        >
          {isTripio ? renderContent(msg.content) : msg.content}
        </div>

        {/* Tripio message actions */}
        {isTripio && (
          <div className="flex items-center gap-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-[10px] text-[#8B6355] hover:text-[#3D1A0A] px-2 py-1 rounded-lg hover:bg-[#FFE8D6] transition-colors"
            >
              <Copy size={11} /> {copied ? "Copied!" : "Copy"}
            </button>
            <button
              onClick={() => { setRated("up"); onRate?.("up"); }}
              className={`p-1 rounded-lg transition-colors ${rated === "up" ? "text-green-500 bg-green-50" : "text-[#8B6355] hover:text-green-500 hover:bg-green-50"}`}
            >
              <ThumbsUp size={11} />
            </button>
            <button
              onClick={() => { setRated("down"); onRate?.("down"); }}
              className={`p-1 rounded-lg transition-colors ${rated === "down" ? "text-rose-500 bg-rose-50" : "text-[#8B6355] hover:text-rose-500 hover:bg-rose-50"}`}
            >
              <ThumbsDown size={11} />
            </button>
          </div>
        )}

        <span className="text-[9px] text-[#C0A090] px-1">
          {new Date(msg.ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}

// ── Welcome screen ────────────────────────────────────────────────────────────
function WelcomeScreen({ onSuggest, onQuickAction }) {
  return (
    <div className="flex flex-col items-center px-5 py-8 gap-7 max-w-2xl mx-auto w-full">

      {/* Tripio avatar + intro */}
      <div className="text-center space-y-3">
        <div className="relative mx-auto w-20 h-20">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#5E0006] to-[#9B1C1C] flex items-center justify-center shadow-xl">
            <Sparkles size={32} className="text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-400 border-2 border-white rounded-full" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#1A0500]">Hi! I'm Tripio 👋</h2>
          <p className="text-sm text-[#8B6355] mt-1.5 max-w-sm mx-auto leading-relaxed">
            Your personal AI travel companion. Tell me your idea — I'll turn it into a complete travel plan, instantly.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-1.5">
          {["Smart itineraries", "Budget planning", "AI-powered tips", "Hidden gems"].map(tag => (
            <span key={tag} className="text-[11px] font-medium bg-[#FFF8F0] border border-[#FFD4B8] text-[#5E0006] px-2.5 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      {/* Quick start row */}
      <div className="w-full">
        <p className="text-[10px] font-bold text-[#8B6355] uppercase tracking-widest mb-2.5 text-center">Quick Start</p>
        <div className="grid grid-cols-2 gap-2">
          {QUICK_ACTIONS.map(({ label, prompt }) => (
            <button
              key={label}
              onClick={() => onQuickAction(prompt)}
              className="flex items-center gap-2.5 bg-white border border-[#FFE0C8] rounded-2xl px-4 py-3 text-sm font-semibold text-[#1A0500] hover:border-[#A0522D] hover:bg-[#FFF8F0] hover:shadow-md transition-all text-left group"
            >
              <span className="text-lg leading-none">{label.split(" ")[0]}</span>
              <span className="text-xs text-[#3D1A0A] group-hover:text-[#1A0500] transition-colors leading-tight">
                {label.split(" ").slice(1).join(" ")}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* All suggestion prompts */}
      <div className="w-full">
        <p className="text-[10px] font-bold text-[#8B6355] uppercase tracking-widest mb-2.5 text-center">Suggested Prompts</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {SUGGESTIONS.map(({ icon: Icon, emoji, text, tag, color }) => (
            <button
              key={text}
              onClick={() => onSuggest(text)}
              className="flex items-center gap-3 bg-white border border-[#FFE0C8] rounded-xl px-3.5 py-3 text-left hover:border-[#A0522D] hover:bg-[#FFF8F0] hover:shadow-sm transition-all group"
            >
              {/* Tag pill */}
              <span className={`shrink-0 text-[9px] font-bold px-2 py-1 rounded-full border ${color}`}>
                {emoji} {tag}
              </span>
              <span className="flex-1 text-xs text-[#3D1A0A] font-medium leading-snug line-clamp-2 group-hover:text-[#1A0500] transition-colors">
                {text}
              </span>
              <ChevronRight size={13} className="text-[#8B6355] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Tripio Component ─────────────────────────────────────────────────────
export default function TripioChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const bottomRef = useRef();
  const inputRef = useRef();
  const abortRef = useRef();

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // ── Call Claude API ─────────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text) => {
    const userText = (text || input).trim();
    if (!userText || loading) return;

    setInput("");
    setError(null);
    setShowSuggestions(false);

    const userMsg = { role: "user", content: userText, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: [...history, { role: "user", content: userText }],
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error ${res.status}`);
      }

      const data = await res.json();
      const reply = data.content?.find(b => b.type === "text")?.text || "Sorry, I couldn't generate a response. Please try again!";

      setMessages(prev => [...prev, { role: "assistant", content: reply, ts: Date.now() }]);
    } catch (err) {
      if (err.name === "AbortError") return;
      setError(err.message || "Something went wrong. Please try again.");
      // Remove the user message if API failed
      setMessages(prev => prev.filter(m => m.ts !== userMsg.ts));
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    if (loading) abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setLoading(false);
  };

  const isEmpty = messages.length === 0;

  return (
    <>
      <style>{`
        @keyframes tripio-bounce {
          0%, 60%, 100% { transform: translateY(0);   }
          30%            { transform: translateY(-6px); }
        }
        @keyframes tripio-fadein {
          from { opacity:0; transform:translateY(10px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .tripio-msg { animation: tripio-fadein 0.25s ease; }
      `}</style>

      <div className="flex flex-col h-[calc(100vh-64px)] -m-8 bg-[#FFF8F0]">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-5 py-3.5 bg-white border-b border-[#FFE0C8] shrink-0 shadow-sm">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5E0006] to-[#9B1C1C] flex items-center justify-center shadow-md">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="font-bold text-[#1A0500] text-sm">Tripio</p>
              <span className="text-[10px] font-bold bg-gradient-to-r from-[#5E0006] to-[#9B1C1C] text-white px-2 py-0.5 rounded-full">AI</span>
            </div>
            <p className="text-xs text-[#8B6355] flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              Your personal travel companion · Always on
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Suggestion pill toggle */}
            <button
              onClick={() => setShowSuggestions(s => !s)}
              className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${showSuggestions ? "bg-[#5E0006] text-white border-[#5E0006]" : "border-[#FFD4B8] text-[#8B6355] hover:border-[#A0522D] hover:text-[#3D1A0A]"}`}
            >
              <Zap size={12} /> Ideas
            </button>

            {!isEmpty && (
              <button
                onClick={clearChat}
                title="Clear chat"
                className="p-2 rounded-xl hover:bg-[#FFE8D6] text-[#8B6355] hover:text-[#5E0006] transition-colors"
              >
                <RotateCcw size={16} />
              </button>
            )}
          </div>
        </div>

        {/* ── Suggestion dropdown ── */}
        {showSuggestions && (
          <div className="bg-white border-b border-[#FFE0C8] px-4 py-3 shrink-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-3xl mx-auto">
              {SUGGESTIONS.map(({ emoji, text, tag, color }) => (
                <button
                  key={text}
                  onClick={() => { sendMessage(text); setShowSuggestions(false); }}
                  className="flex items-center gap-2.5 bg-[#FFF8F0] border border-[#FFE0C8] rounded-xl px-3 py-2.5 text-left hover:border-[#A0522D] hover:bg-white hover:shadow-sm transition-all group"
                >
                  <span className={`shrink-0 text-[9px] font-bold px-2 py-1 rounded-full border ${color}`}>
                    {emoji} {tag}
                  </span>
                  <span className="flex-1 text-xs text-[#3D1A0A] font-medium leading-snug line-clamp-1 group-hover:text-[#1A0500] transition-colors">
                    {text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Messages ── */}
        <div className="flex-1 overflow-y-auto">
          {isEmpty ? (
            <WelcomeScreen
              onSuggest={(text) => sendMessage(text)}
              onQuickAction={(text) => sendMessage(text)}
            />
          ) : (
            <div className="px-5 py-5 space-y-5 max-w-3xl mx-auto">
              {messages.map((msg, i) => (
                <div key={i} className="tripio-msg">
                  <MessageBubble msg={msg} />
                </div>
              ))}
              {loading && (
                <div className="tripio-msg">
                  <TypingDots />
                </div>
              )}
              {error && (
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                    <X size={14} className="text-rose-500" />
                  </div>
                  <div className="bg-rose-50 border border-rose-100 rounded-2xl rounded-bl-md px-4 py-3 text-sm text-rose-600">
                    {error}
                    <button
                      onClick={() => { setError(null); sendMessage(messages[messages.length - 1]?.content); }}
                      className="flex items-center gap-1 text-xs font-semibold text-rose-500 mt-1.5 hover:underline"
                    >
                      <RefreshCw size={11} /> Try again
                    </button>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>

        {/* ── Input area ── */}
        <div className="shrink-0 px-5 py-4 bg-white border-t border-[#FFE0C8]">
          <div className="max-w-3xl mx-auto">
            {/* Quick action chips (shown when chat is empty) */}
            {isEmpty && (
              <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
                {SUGGESTIONS.map(({ emoji, tag, text, color, prompt }) => (
                  <button
                    key={tag + text}
                    onClick={() => sendMessage(text)}
                    className={`shrink-0 flex items-center gap-1.5 text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all hover:shadow-sm hover:scale-105 ${color}`}
                  >
                    {emoji} {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Text input */}
            <div className="flex items-end gap-3">
              <div className="flex-1 flex items-end bg-[#FFF8F0] border border-[#FFD4B8] rounded-2xl px-4 py-3 gap-3 focus-within:border-[#5E0006] focus-within:ring-2 focus-within:ring-[#5E0006]/10 transition-all">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#5E0006] to-[#9B1C1C] flex items-center justify-center shrink-0 mb-0.5">
                  <Compass size={12} className="text-white" />
                </div>
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onChange={e => {
                    setInput(e.target.value);
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 130) + "px";
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask Tripio to plan your next adventure…"
                  className="flex-1 bg-transparent outline-none text-sm text-[#1A0500] placeholder:text-[#B07060] resize-none max-h-32 leading-relaxed"
                  style={{ height: "22px" }}
                  disabled={loading}
                />
                <button
                  onClick={() => { }} // 🔌 Wire to Web Speech API for voice input
                  className="p-1 text-[#8B6355] hover:text-[#5E0006] transition-colors shrink-0 mb-0.5"
                  title="Voice input (coming soon)"
                >
                  <Mic size={16} />
                </button>
              </div>

              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className={`p-3.5 rounded-2xl transition-all shadow-md shrink-0 ${input.trim() && !loading
                    ? "bg-[#5E0006] text-white hover:bg-[#3D0004] active:scale-95 hover:shadow-lg"
                    : "bg-[#FFE0C8] text-[#C0A090] cursor-not-allowed"
                  }`}
              >
                {loading
                  ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  : <Send size={17} />
                }
              </button>
            </div>

            <p className="text-[10px] text-[#B07060] text-center mt-2.5">
              Tripio can make mistakes. Always verify travel details before booking.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}