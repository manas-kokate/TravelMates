import { useEffect, useRef, useState } from "react";
import { Bot, Compass, MapPin, Send, Sparkles, User, WandSparkles } from "lucide-react";

const STARTER_PROMPTS = [
    "Plan a 5-day Goa trip under 20k budget",
    "Romantic 3-day Udaipur itinerary",
    "Backpacking route for Himachal in June",
    "Best weekend plan from Bangalore",
];

const INITIAL_MESSAGES = [
    {
        id: 1,
        role: "bot",
        text: "Hey traveler! I am Tripio, your AI trip planner. Tell me destination, budget, and days, and I will build your itinerary.",
        time: "now",
    },
];

function MessageBubble({ message }) {
    const isBot = message.role === "bot";

    return (
        <div className={`flex items-end gap-2 ${isBot ? "justify-start" : "justify-end"}`}>
            {isBot && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e8a090] to-[#7a1a1a] flex items-center justify-center text-white shrink-0">
                    <Bot size={15} />
                </div>
            )}

            <div
                className={`max-w-[85%] sm:max-w-[72%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                    isBot
                        ? "bg-white text-[#1e0a0a] border border-[#f0e4db] rounded-bl-md"
                        : "bg-[#7a1a1a] text-white rounded-br-md"
                }`}
            >
                <p>{message.text}</p>
                <p className={`text-[10px] mt-1 ${isBot ? "text-[#b09090]" : "text-white/70"}`}>{message.time}</p>
            </div>

            {!isBot && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e8a090] to-[#c0392b] flex items-center justify-center text-white shrink-0">
                    <User size={15} />
                </div>
            )}
        </div>
    );
}

export default function TripioPlanner() {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, typing]);

    const now = () =>
        new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

    const buildAiReply = (query) => {
        const prompt = query.toLowerCase();

        if (prompt.includes("goa")) {
            return "Great pick! Goa for 5 days: Day 1 North beaches, Day 2 forts + watersports, Day 3 Old Goa churches + cafes, Day 4 South Goa relaxation, Day 5 local markets. Keep 4k/day for stay+food and 3k buffer for activities.";
        }
        if (prompt.includes("budget")) {
            return "Budget-first plan: spend 45% on stay, 30% on transport, 20% on food, 5% on tickets. Share city + number of days and I will break this into a day-wise budget.";
        }
        if (prompt.includes("romantic") || prompt.includes("honeymoon")) {
            return "Romantic itinerary idea: sunset viewpoint, slow cafe mornings, heritage walk, and one premium dinner night. I can tailor this with hotel area + activity style (chill/adventure/mix).";
        }

        return "Perfect. I can plan that. Please share: destination, number of days, total budget, and trip vibe (adventure/chill/mix). I will generate a day-by-day itinerary instantly.";
    };

    const sendMessage = (rawText) => {
        const text = rawText.trim();
        if (!text) return;

        const userMessage = { id: Date.now(), role: "user", text, time: now() };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setTyping(true);

        window.setTimeout(() => {
            const aiMessage = {
                id: Date.now() + 1,
                role: "bot",
                text: buildAiReply(text),
                time: now(),
            };
            setMessages((prev) => [...prev, aiMessage]);
            setTyping(false);
        }, 900);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <aside className="xl:col-span-1 space-y-4">
                    <div className="bg-white border border-[#f0e4db] rounded-2xl p-4 shadow-sm">
                        <h2 className="text-base font-bold text-[#1e0a0a] flex items-center gap-2">
                            <WandSparkles size={16} className="text-[#7a1a1a]" />
                            Tripio AI Planner
                        </h2>
                        <p className="text-xs text-[#9a7070] mt-1 leading-relaxed">
                            Chat with Tripio to get instant itineraries, budget split, and route ideas.
                        </p>
                    </div>

                    <div className="bg-white border border-[#f0e4db] rounded-2xl p-4 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#9a7070] mb-2">
                            Try prompts
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {STARTER_PROMPTS.map((p) => (
                                <button
                                    key={p}
                                    onClick={() => sendMessage(p)}
                                    className="text-xs text-left px-3 py-2 rounded-full bg-[#fdf8f4] border border-[#e8d5cc] text-[#5a3030] hover:border-[#c0857a] hover:text-[#7a1a1a] transition-colors"
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#fff8f3] to-[#fdf1e8] border border-[#f0e4db] rounded-2xl p-4">
                        <p className="text-sm font-semibold text-[#5a3030] flex items-center gap-2">
                            <Sparkles size={14} className="text-[#7a1a1a]" />
                            Pro tip
                        </p>
                        <p className="text-xs text-[#9a7070] mt-1 leading-relaxed">
                            Add month and traveler count in your prompt for better plans. Example: "4 days in Manali in May for 2 people under 25k".
                        </p>
                    </div>
                </aside>

                <section className="xl:col-span-2 bg-white border border-[#f0e4db] rounded-3xl shadow-sm overflow-hidden flex flex-col min-h-[68vh]">
                    <div className="px-5 py-4 border-b border-[#f0e4db] bg-[#fdf8f4]">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-base font-bold text-[#1e0a0a] flex items-center gap-2">
                                    <Compass size={17} className="text-[#7a1a1a]" />
                                    AI Trip Chat
                                </p>
                                <p className="text-xs text-[#9a7070] mt-0.5">Describe your trip and Tripio builds your route.</p>
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full bg-[#f5ede8] text-[#7a1a1a] font-semibold">
                                <MapPin size={11} />
                                Planner Online
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 bg-[#fdf8f4] space-y-3">
                        {messages.map((m) => (
                            <MessageBubble key={m.id} message={m} />
                        ))}

                        {typing && (
                            <div className="flex items-end gap-2">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e8a090] to-[#7a1a1a] flex items-center justify-center text-white shrink-0">
                                    <Bot size={15} />
                                </div>
                                <div className="bg-white border border-[#f0e4db] rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#c0857a] animate-pulse" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#c0857a] animate-pulse [animation-delay:150ms]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#c0857a] animate-pulse [animation-delay:300ms]" />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={scrollRef} />
                    </div>

                    <div className="p-4 border-t border-[#f0e4db] bg-white">
                        <div className="flex items-end gap-2">
                            <div className="flex-1 bg-[#fdf8f4] border border-[#e8d5cc] rounded-2xl px-3 py-2 focus-within:border-[#7a1a1a] focus-within:ring-2 focus-within:ring-[#7a1a1a]/10 transition-all">
                                <textarea
                                    rows={1}
                                    value={input}
                                    placeholder="Ask Tripio... e.g. 6-day Kerala trip under 30k"
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            sendMessage(input);
                                        }
                                    }}
                                    className="w-full bg-transparent outline-none resize-none text-sm text-[#1e0a0a] placeholder:text-[#b09090] max-h-28"
                                />
                            </div>
                            <button
                                onClick={() => sendMessage(input)}
                                className="p-2.5 rounded-xl bg-[#7a1a1a] text-white hover:bg-[#5a0e0e] transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled={!input.trim()}
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
