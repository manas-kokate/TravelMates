import { useState, useRef, useEffect } from "react";
import {
    Send, Search, Phone, Video, MoreVertical, Smile,
    ImagePlus, MapPin, Mic, X, Check, CheckCheck,
    ArrowLeft, Shield, Star, Globe, Users, Plus,
    Compass, ChevronDown,
} from "lucide-react";

// ── Mock Data ──────────────────────────────────────────────────────────────────
const CONVERSATIONS = [
    {
        id: 1, name: "Priya Sharma", handle: "@priyatravels",
        avatar: "PS", avatarBg: "from-rose-400 to-pink-600",
        active: true, verified: true,
        location: "Santorini, Greece 🇬🇷",
        lastMsg: "Are you heading to Oia tomorrow? Let's meet at the viewpoint!",
        lastTime: "2m", unread: 2,
        messages: [
            { id: 1, from: "them", text: "Hey! I saw your post about Santorini 😍", time: "10:12 AM", status: "read" },
            { id: 2, from: "me", text: "Yes! Just arrived yesterday. The caldera view is unreal 🌅", time: "10:14 AM", status: "read" },
            { id: 3, from: "them", text: "Same here! Which part of the island are you staying?", time: "10:15 AM", status: "read" },
            { id: 4, from: "me", text: "Fira, near the cable car. You?", time: "10:18 AM", status: "read" },
            { id: 5, from: "them", text: "Oia! The sunsets here are absolutely insane. You HAVE to come.", time: "10:20 AM", status: "read" },
            { id: 6, from: "them", text: "Are you heading to Oia tomorrow? Let's meet at the viewpoint!", time: "10:21 AM", status: "read" },
        ],
    },
    {
        id: 2, name: "Rahul Kapoor", handle: "@rahul_onroad",
        avatar: "RK", avatarBg: "from-amber-400 to-orange-500",
        active: true, verified: true,
        location: "Kyoto, Japan 🇯🇵",
        lastMsg: "The bamboo grove at dawn, totally worth it 🎋",
        lastTime: "1h", unread: 0,
        messages: [
            { id: 1, from: "them", text: "Bro are you also in Kyoto?!", time: "Yesterday", status: "read" },
            { id: 2, from: "me", text: "No way! I was there last week 😭 missed you", time: "Yesterday", status: "read" },
            { id: 3, from: "them", text: "Next stop is Tokyo. You headed there?", time: "Yesterday", status: "read" },
            { id: 4, from: "me", text: "Actually yes! I'm flying in next Friday", time: "Yesterday", status: "read" },
            { id: 5, from: "them", text: "Let's link up. I know the best ramen spots 🍜", time: "Yesterday", status: "read" },
            { id: 6, from: "them", text: "The bamboo grove at dawn, totally worth it 🎋", time: "1h ago", status: "read" },
        ],
    },
    {
        id: 3, name: "Ananya Mehta", handle: "@ananya.wanders",
        avatar: "AM", avatarBg: "from-teal-400 to-cyan-600",
        active: true, verified: false,
        location: "Patagonia, Argentina 🇦🇷",
        lastMsg: "Day 5 completed! My legs are dead 💀",
        lastTime: "3h", unread: 1,
        messages: [
            { id: 1, from: "me", text: "How's the W-trek going?", time: "9:00 AM", status: "read" },
            { id: 2, from: "them", text: "Absolutely brutal but beautiful", time: "9:05 AM", status: "read" },
            { id: 3, from: "them", text: "Day 5 completed! My legs are dead 💀", time: "9:06 AM", status: "read" },
        ],
    },
    {
        id: 4, name: "Trekkers Group", handle: "5 members",
        avatar: "TG", avatarBg: "from-violet-500 to-purple-700",
        active: false, verified: false, isGroup: true,
        location: "Various locations",
        lastMsg: "Vikram: Anyone in Morocco next month?",
        lastTime: "5h", unread: 4,
        messages: [
            { id: 1, from: "Vikram", text: "Hey everyone! Planning Morocco next month", time: "6h ago", status: "read", isGroup: true },
            { id: 2, from: "Sneha", text: "Oh I've been! Marrakech medina is a must 🕌", time: "6h ago", status: "read", isGroup: true },
            { id: 3, from: "me", text: "Interested! What dates are you thinking?", time: "5:30 PM", status: "read" },
            { id: 4, from: "Vikram", text: "Anyone in Morocco next month?", time: "5h ago", status: "read", isGroup: true },
        ],
    },
    {
        id: 5, name: "Sneha Iyer", handle: "@sneha.roams",
        avatar: "SI", avatarBg: "from-lime-400 to-green-600",
        active: false, verified: true,
        location: "Lisbon, Portugal 🇵🇹",
        lastMsg: "Sent you the café location 📍",
        lastTime: "2d", unread: 0,
        messages: [
            { id: 1, from: "them", text: "Lisbon is so underrated honestly", time: "2d ago", status: "read" },
            { id: 2, from: "me", text: "I know! Alfama district is magical", time: "2d ago", status: "read" },
            { id: 3, from: "them", text: "Sent you the café location 📍", time: "2d ago", status: "read" },
        ],
    },
];

const EMOJIS = ["😊", "😂", "❤️", "🔥", "👍", "🙏", "✈️", "🌍", "📍", "🏔️", "🌅", "🍜", "🎋", "🏝️", "👋", "😍", "🤩", "💪", "🎉", "🥹"];

// ── Avatar ─────────────────────────────────────────────────────────────────────
const Avatar = ({ conv, size = "md" }) => {
    const sz = size === "sm" ? "w-9 h-9 text-xs" : size === "lg" ? "w-12 h-12 text-sm" : "w-10 h-10 text-xs";
    return (
        <div className="relative shrink-0">
            <div className={`${sz} rounded-full bg-gradient-to-br ${conv.avatarBg} flex items-center justify-center font-bold text-white ring-2 ring-white shadow-sm`}>
                {conv.isGroup ? <Users size={size === "lg" ? 18 : 14} /> : conv.avatar}
            </div>
            {!conv.isGroup && (
                <span className={`absolute bottom-0 right-0 rounded-full border-2 border-white ${conv.active ? "bg-green-400" : "bg-gray-300"} ${size === "sm" ? "w-2.5 h-2.5" : "w-3 h-3"}`} />
            )}
        </div>
    );
};

// ── Message Bubble ────────────────────────────────────────────────────────────
const Bubble = ({ msg, isMe, showSender }) => (
    <div className={`flex items-end gap-2 ${isMe ? "flex-row-reverse" : "flex-row"} group`}>
        <div className={`flex flex-col gap-1 max-w-[72%] ${isMe ? "items-end" : "items-start"}`}>
            {showSender && !isMe && msg.isGroup && (
                <span className="text-[10px] font-semibold text-[#9a7070] px-1">{msg.from}</span>
            )}
            <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm
        ${isMe
                    ? "bg-[#7a1a1a] text-white rounded-br-md"
                    : "bg-white text-[#1e0a0a] border border-[#f0e4db] rounded-bl-md"
                }`}
            >
                {msg.text}
            </div>
            <div className={`flex items-center gap-1 text-[10px] text-[#b09090] px-1 opacity-0 group-hover:opacity-100 transition-opacity ${isMe ? "flex-row-reverse" : ""}`}>
                <span>{msg.time}</span>
                {isMe && (
                    msg.status === "read"
                        ? <CheckCheck size={12} className="text-[#7a1a1a]" />
                        : <Check size={12} />
                )}
            </div>
        </div>
    </div>
);

// ── Chat Window ────────────────────────────────────────────────────────────────
function ChatWindow({ conv, onBack, onSend }) {
    const [input, setInput] = useState("");
    const [showEmoji, setShowEmoji] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conv.messages]);

    // Simulate "typing" indicator on focus
    useEffect(() => {
        let t;
        if (input.length > 0) {
            setIsTyping(false);
            clearTimeout(t);
            t = setTimeout(() => setIsTyping(false), 2000);
        }
        return () => clearTimeout(t);
    }, [input]);

    const handleSend = () => {
        if (!input.trim()) return;
        onSend(conv.id, input.trim());
        setInput("");
        setShowEmoji(false);
        inputRef.current?.focus();

        // Simulate reply after delay
        setTimeout(() => setIsTyping(true), 600);
        setTimeout(() => {
            setIsTyping(false);
            const replies = [
                "That sounds amazing! 🌍",
                "Yes! Let's make it happen ✈️",
                "I was thinking the same thing!",
                "Send me the details 📍",
                "Can't wait! This is going to be epic 🔥",
            ];
            onSend(conv.id, replies[Math.floor(Math.random() * replies.length)], "them");
        }, 2200);
    };

    // Group messages by date
    const grouped = conv.messages.reduce((acc, msg) => {
        const date = msg.time.includes("AM") || msg.time.includes("PM") ? "Today" : msg.time.includes("Yesterday") ? "Yesterday" : msg.time.replace(" ago", "");
        if (!acc[date]) acc[date] = [];
        acc[date].push(msg);
        return acc;
    }, {});

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white border-b border-[#f0e4db] shrink-0">
                <button
                    onClick={onBack}
                    className="lg:hidden p-1.5 rounded-lg hover:bg-[#f0e4db] text-[#7a1a1a] transition-colors"
                >
                    <ArrowLeft size={18} />
                </button>

                <Avatar conv={conv} size="md" />

                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                        <p className="text-sm font-bold text-[#1e0a0a] truncate">{conv.name}</p>
                        {conv.verified && <Shield size={12} className="text-[#7a1a1a] shrink-0" />}
                    </div>
                    <p className="text-xs text-[#9a7070] truncate flex items-center gap-1">
                        {conv.isGroup
                            ? <><Users size={10} /> {conv.handle}</>
                            : conv.active
                                ? <><span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" /> Active now</>
                                : conv.handle
                        }
                    </p>
                </div>

                <div className="flex items-center gap-1">
                    <button className="p-2 rounded-xl hover:bg-[#f0e4db] text-[#9a7070] hover:text-[#7a1a1a] transition-colors">
                        <Phone size={17} />
                    </button>
                    <button className="p-2 rounded-xl hover:bg-[#f0e4db] text-[#9a7070] hover:text-[#7a1a1a] transition-colors">
                        <Video size={17} />
                    </button>
                    <button className="p-2 rounded-xl hover:bg-[#f0e4db] text-[#9a7070] hover:text-[#7a1a1a] transition-colors">
                        <MoreVertical size={17} />
                    </button>
                </div>
            </div>

            {/* Location banner */}
            {!conv.isGroup && (
                <div className="flex items-center justify-center gap-1.5 py-1.5 bg-[#fdf8f4] border-b border-[#f0e4db] text-xs text-[#9a7070]">
                    <MapPin size={11} className="text-[#c0857a]" />
                    <span>{conv.name.split(" ")[0]} is in <span className="font-semibold text-[#5a3030]">{conv.location}</span></span>
                </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 bg-[#fdf8f4]">
                {Object.entries(grouped).map(([date, msgs]) => (
                    <div key={date} className="space-y-3">
                        {/* Date separator */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-[#f0e4db]" />
                            <span className="text-[10px] font-semibold text-[#b09090] bg-[#f5ede8] px-2.5 py-1 rounded-full">{date}</span>
                            <div className="flex-1 h-px bg-[#f0e4db]" />
                        </div>
                        {msgs.map((msg, i) => (
                            <Bubble
                                key={msg.id}
                                msg={msg}
                                isMe={msg.from === "me"}
                                showSender={i === 0 || msgs[i - 1]?.from !== msg.from}
                            />
                        ))}
                    </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                    <div className="flex items-end gap-2">
                        <div className="bg-white border border-[#f0e4db] rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                            <div className="flex gap-1 items-center h-4">
                                {[0, 1, 2].map(i => (
                                    <span
                                        key={i}
                                        className="w-1.5 h-1.5 bg-[#c0857a] rounded-full"
                                        style={{ animation: `tm-bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
                <div ref={bottomRef} />
            </div>

            {/* Emoji picker */}
            {showEmoji && (
                <div className="px-4 py-2 bg-white border-t border-[#f0e4db]">
                    <div className="flex flex-wrap gap-2">
                        {EMOJIS.map(e => (
                            <button
                                key={e}
                                onClick={() => setInput(i => i + e)}
                                className="text-xl hover:scale-125 transition-transform active:scale-95"
                            >
                                {e}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input bar */}
            <div className="px-4 py-3 bg-white border-t border-[#f0e4db] flex items-end gap-2 shrink-0">
                <button className="p-2 rounded-xl hover:bg-[#f0e4db] text-[#9a7070] hover:text-[#7a1a1a] transition-colors shrink-0">
                    <ImagePlus size={19} />
                </button>
                <button className="p-2 rounded-xl hover:bg-[#f0e4db] text-[#9a7070] hover:text-[#7a1a1a] transition-colors shrink-0">
                    <MapPin size={19} />
                </button>

                <div className="flex-1 flex items-end bg-[#fdf8f4] border border-[#e8d5cc] rounded-2xl px-3.5 py-2 gap-2 focus-within:border-[#7a1a1a] focus-within:ring-2 focus-within:ring-[#7a1a1a]/10 transition-all">
                    <textarea
                        ref={inputRef}
                        rows={1}
                        value={input}
                        onChange={e => {
                            setInput(e.target.value);
                            e.target.style.height = "auto";
                            e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                        }}
                        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                        placeholder="Type a message…"
                        className="flex-1 bg-transparent outline-none text-sm text-[#1e0a0a] placeholder:text-[#b09090] resize-none max-h-28 leading-relaxed"
                        style={{ height: "24px" }}
                    />
                    <button
                        onClick={() => setShowEmoji(s => !s)}
                        className={`shrink-0 p-0.5 transition-colors ${showEmoji ? "text-[#7a1a1a]" : "text-[#9a7070] hover:text-[#7a1a1a]"}`}
                    >
                        <Smile size={18} />
                    </button>
                </div>

                {input.trim() ? (
                    <button
                        onClick={handleSend}
                        className="p-2.5 bg-[#7a1a1a] text-white rounded-xl hover:bg-[#5a0e0e] transition-all active:scale-95 shadow-md shrink-0"
                    >
                        <Send size={17} />
                    </button>
                ) : (
                    <button className="p-2.5 rounded-xl hover:bg-[#f0e4db] text-[#9a7070] hover:text-[#7a1a1a] transition-colors shrink-0">
                        <Mic size={17} />
                    </button>
                )}
            </div>
        </div>
    );
}

// ── Conversation List ──────────────────────────────────────────────────────────
function ConvList({ convs, activeId, onSelect }) {
    const [search, setSearch] = useState("");

    const filtered = convs.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.lastMsg.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="px-4 py-4 border-b border-[#f0e4db] bg-white shrink-0">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-[#1e0a0a]">Messages</h2>
                    <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-[#f0e4db] text-[#9a7070] hover:text-[#7a1a1a] transition-colors">
                            <Plus size={18} />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-[#f0e4db] text-[#9a7070] hover:text-[#7a1a1a] transition-colors">
                            <MoreVertical size={18} />
                        </button>
                    </div>
                </div>
                {/* Search */}
                <div className="flex items-center gap-2 bg-[#f5ede8] rounded-xl px-3 py-2 border border-transparent focus-within:border-[#e8d5cc] transition-colors">
                    <Search size={14} className="text-[#9a7070] shrink-0" />
                    <input
                        className="flex-1 bg-transparent outline-none text-sm text-[#1e0a0a] placeholder:text-[#b09090]"
                        placeholder="Search conversations…"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    {search && <button onClick={() => setSearch("")}><X size={13} className="text-[#9a7070]" /></button>}
                </div>
            </div>

            {/* Online travelers strip */}
            <div className="px-4 py-3 border-b border-[#f0e4db] bg-white shrink-0">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9a7070] mb-2.5">Online Now</p>
                <div className="flex gap-3 overflow-x-auto pb-0.5">
                    {convs.filter(c => c.active && !c.isGroup).map(c => (
                        <button
                            key={c.id}
                            onClick={() => onSelect(c.id)}
                            className="flex flex-col items-center gap-1 shrink-0 group"
                        >
                            <div className="relative">
                                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${c.avatarBg} flex items-center justify-center text-xs font-bold text-white ring-2 ${activeId === c.id ? "ring-[#7a1a1a]" : "ring-white"} shadow transition-all`}>
                                    {c.avatar}
                                </div>
                                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full" />
                            </div>
                            <span className="text-[10px] text-[#9a7070] group-hover:text-[#5a3030] transition-colors max-w-[44px] truncate">
                                {c.name.split(" ")[0]}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Conversations */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#f5ede8]">
                {filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-32 gap-2 text-[#9a7070]">
                        <Compass size={24} className="opacity-40" />
                        <p className="text-xs">No conversations found</p>
                    </div>
                ) : (
                    filtered.map(c => (
                        <button
                            key={c.id}
                            onClick={() => onSelect(c.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#fdf8f4] transition-colors text-left ${activeId === c.id ? "bg-[#fdf8f4] border-r-2 border-[#7a1a1a]" : ""}`}
                        >
                            <Avatar conv={c} size="md" />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5 min-w-0">
                                        <p className={`text-sm truncate ${c.unread > 0 ? "font-bold text-[#1e0a0a]" : "font-medium text-[#1e0a0a]"}`}>
                                            {c.name}
                                        </p>
                                        {c.verified && <Shield size={11} className="text-[#7a1a1a] shrink-0" />}
                                        {c.isGroup && <Users size={11} className="text-[#9a7070] shrink-0" />}
                                    </div>
                                    <span className={`text-[10px] shrink-0 ${c.unread > 0 ? "text-[#7a1a1a] font-bold" : "text-[#b09090]"}`}>
                                        {c.lastTime}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between gap-2 mt-0.5">
                                    <p className={`text-xs truncate ${c.unread > 0 ? "text-[#5a3030] font-medium" : "text-[#9a7070]"}`}>
                                        {c.lastMsg}
                                    </p>
                                    {c.unread > 0 && (
                                        <span className="w-5 h-5 bg-[#7a1a1a] text-white text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                                            {c.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </div>
    );
}

// ── Main Chats Component ──────────────────────────────────────────────────────
export default function Chats() {
    const [convs, setConvs] = useState(CONVERSATIONS);
    const [activeId, setActiveId] = useState(1);
    const [mobileView, setMobileView] = useState("list"); // "list" | "chat"

    const activeConv = convs.find(c => c.id === activeId);

    const handleSelect = (id) => {
        setActiveId(id);
        setMobileView("chat");
        // Clear unread
        setConvs(cs => cs.map(c => c.id === id ? { ...c, unread: 0 } : c));
    };

    const handleSend = (convId, text, from = "me") => {
        setConvs(cs => cs.map(c => {
            if (c.id !== convId) return c;
            const newMsg = {
                id: Date.now() + Math.random(),
                from,
                text,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                status: from === "me" ? "sent" : "read",
            };
            return {
                ...c,
                messages: [...c.messages, newMsg],
                lastMsg: from === "me" ? text : `${c.name.split(" ")[0]}: ${text}`,
                lastTime: "now",
            };
        }));
    };

    return (
        <>
            <style>{`
        @keyframes tm-bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30%            { transform: translateY(-6px); }
        }
      `}</style>

            {/* Full-bleed layout — cancel parent padding */}
            <div className="flex h-[calc(100vh-64px)] -m-8 overflow-hidden rounded-none bg-white">

                {/* ── Conversation list ── */}
                <div className={`w-full lg:w-80 xl:w-96 shrink-0 border-r border-[#f0e4db] bg-white flex flex-col
          ${mobileView === "chat" ? "hidden lg:flex" : "flex"}`}
                >
                    <ConvList convs={convs} activeId={activeId} onSelect={handleSelect} />
                </div>

                {/* ── Chat window or empty state ── */}
                <div className={`flex-1 flex flex-col min-w-0
          ${mobileView === "list" ? "hidden lg:flex" : "flex"}`}
                >
                    {activeConv ? (
                        <ChatWindow
                            conv={activeConv}
                            onBack={() => setMobileView("list")}
                            onSend={handleSend}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full gap-5 text-center px-8 bg-[#fdf8f4]">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#f0e4db] to-[#e8d5cc] flex items-center justify-center">
                                <Compass size={36} className="text-[#7a1a1a]" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#1e0a0a]">Your Messages</h3>
                                <p className="text-sm text-[#9a7070] mt-1 max-w-xs leading-relaxed">
                                    Connect with fellow travelers and plan adventures together.
                                </p>
                            </div>
                            <button
                                onClick={() => handleSelect(1)}
                                className="flex items-center gap-2 bg-[#7a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5a0e0e] transition-colors"
                            >
                                <MessageCircle size={16} /> Start a conversation
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}