import { useState, useRef, useEffect } from "react";
import {
    Send, Search, Phone, Video, MoreVertical, Smile,
    ImagePlus, MapPin, Mic, X, Check, CheckCheck,
    ArrowLeft, Shield, Users, Plus,
    Compass, MessageCircle,
} from "lucide-react";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import { getConnections, getMessages } from "../api/social.api.js";

function mapApiMessage(m, myId) {
    const sid = m.senderId?._id ?? m.senderId;
    return {
        id: m._id,
        from: String(sid) === String(myId) ? "me" : "them",
        text: m.content,
        time: m.createdAt
            ? new Date(m.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            : "",
        status: "read",
    };
}

function mapConnectionToConv(conn, myId) {
    const s = conn.senderId;
    const r = conn.receiverId;
    const sid = s?._id ?? s;
    const other = String(sid) === String(myId) ? r : s;
    const oid = other?._id ?? other;
    const username = other?.username || "Traveler";
    return {
        id: String(oid),
        name: username,
        handle: `@${username.replace(/\s+/g, "").toLowerCase()}`,
        avatar: username.slice(0, 2).toUpperCase(),
        avatarBg: "from-rose-400 to-pink-600",
        active: false,
        verified: false,
        location: other?.location || "",
        lastMsg: "No messages yet",
        lastTime: "",
        unread: 0,
        messages: [],
    };
}

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
    const bottomRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [conv.messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        onSend(conv.id, input.trim());
        setInput("");
        setShowEmoji(false);
        inputRef.current?.focus();
    };

    // Group messages by date
    const grouped = (conv.messages || []).reduce((acc, msg) => {
        const date =
            msg.time.includes("AM") || msg.time.includes("PM")
                ? "Today"
                : msg.time.includes("Yesterday")
                    ? "Yesterday"
                    : msg.time.replace(" ago", "");
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
                                <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${c.avatarBg} flex items-center justify-center text-xs font-bold text-white ring-2 ${String(activeId) === String(c.id) ? "ring-[#7a1a1a]" : "ring-white"} shadow transition-all`}>
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
                            className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-[#fdf8f4] transition-colors text-left ${String(activeId) === String(c.id) ? "bg-[#fdf8f4] border-r-2 border-[#7a1a1a]" : ""}`}
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

function getStoredUserId() {
    try {
        const u = JSON.parse(localStorage.getItem("user") || "null");
        return u?._id ? String(u._id) : null;
    } catch {
        return null;
    }
}

// ── Main Chats Component ──────────────────────────────────────────────────────
export default function Chats() {
    const [myId] = useState(() => getStoredUserId());
    const [convs, setConvs] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [mobileView, setMobileView] = useState("list");
    const socketRef = useRef(null);
    const activeIdRef = useRef(activeId);
    activeIdRef.current = activeId;

    const activeConv = convs.find(c => String(c.id) === String(activeId));

    useEffect(() => {
        if (!myId) {
            toast.warning("Log in again to load chats and connect in real time.");
            return;
        }
        let cancelled = false;
        (async () => {
            try {
                const { data } = await getConnections();
                if (cancelled || data.status !== 200) {
                    if (!cancelled && data.status !== 200) {
                        toast.error(data.message || "Could not load connections");
                    }
                    return;
                }
                const list = (data.connections || []).map((conn) =>
                    mapConnectionToConv(conn, myId)
                );
                setConvs(list);
                setActiveId((prev) => {
                    if (prev && list.some((c) => String(c.id) === String(prev))) return prev;
                    return list[0]?.id ?? null;
                });
            } catch {
                if (!cancelled) toast.error("Could not load connections");
            }
        })();
        return () => { cancelled = true; };
    }, [myId]);

    useEffect(() => {
        if (!myId) return;
        const socket = io("http://localhost:3000", { transports: ["websocket"] });
        socketRef.current = socket;
        socket.on("connect", () => socket.emit("join", myId));
        socket.on("receive_message", (payload) => {
            if (String(payload.senderId) === String(myId)) return;
            const time = new Date(payload.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
            });
            const open = String(activeIdRef.current) === String(payload.senderId);
            setConvs((cs) =>
                cs.map((c) => {
                    if (String(c.id) !== String(payload.senderId)) return c;
                    return {
                        ...c,
                        messages: [
                            ...c.messages,
                            {
                                id: payload._id,
                                from: "them",
                                text: payload.content,
                                time,
                                status: "read",
                            },
                        ],
                        lastMsg: payload.content,
                        lastTime: "now",
                        unread: open ? 0 : (c.unread || 0) + 1,
                    };
                })
            );
        });
        socket.on("message_sent", (payload) => {
            setConvs((cs) =>
                cs.map((c) => {
                    if (String(c.id) !== String(payload.receiverId)) return c;
                    const msgs = [...c.messages];
                    for (let i = msgs.length - 1; i >= 0; i--) {
                        if (msgs[i].from === "me" && msgs[i].text === payload.content) {
                            msgs[i] = { ...msgs[i], id: payload._id, status: "read" };
                            break;
                        }
                    }
                    return { ...c, messages: msgs };
                })
            );
        });
        socket.on("error", (err) => {
            const msg = typeof err === "string" ? err : err?.message;
            if (msg) toast.error(msg);
        });
        return () => {
            socket.disconnect();
            socketRef.current = null;
        };
    }, [myId]);

    const handleSelect = async (id) => {
        setActiveId(id);
        setMobileView("chat");
        setConvs((cs) => cs.map((c) => (String(c.id) === String(id) ? { ...c, unread: 0 } : c)));
        if (!myId) return;
        try {
            const { data } = await getMessages(id);
            if (data.status !== 200 || !data.messages) return;
            const msgs = data.messages.map((m) => mapApiMessage(m, myId));
            setConvs((cs) =>
                cs.map((c) =>
                    String(c.id) === String(id) ? { ...c, messages: msgs } : c
                )
            );
        } catch {
            toast.error("Could not load messages");
        }
    };

    const handleSend = (convId, text) => {
        const socket = socketRef.current;
        if (!socket?.connected) {
            toast.error("Not connected. Check that the server is running.");
            return;
        }
        const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        setConvs((cs) =>
            cs.map((c) => {
                if (String(c.id) !== String(convId)) return c;
                const newMsg = {
                    id: Date.now() + Math.random(),
                    from: "me",
                    text,
                    time,
                    status: "sent",
                };
                return {
                    ...c,
                    messages: [...c.messages, newMsg],
                    lastMsg: text,
                    lastTime: "now",
                };
            })
        );
        socket.emit("sendMessage", { receiverId: convId, content: text });
    };

    return (
        <div className="flex h-[calc(100vh-64px)] -m-8 overflow-hidden rounded-none bg-white">
            <div
                className={`w-full lg:w-80 xl:w-96 shrink-0 border-r border-[#f0e4db] bg-white flex flex-col
          ${mobileView === "chat" ? "hidden lg:flex" : "flex"}`}
            >
                <ConvList convs={convs} activeId={activeId} onSelect={handleSelect} />
            </div>

            <div
                className={`flex-1 flex flex-col min-w-0
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
                                {convs.length === 0
                                    ? "Accept a companion request to start chatting."
                                    : "Pick a conversation from the list."}
                            </p>
                        </div>
                        {convs.length > 0 && (
                            <button
                                type="button"
                                onClick={() => handleSelect(convs[0].id)}
                                className="flex items-center gap-2 bg-[#7a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5a0e0e] transition-colors"
                            >
                                <MessageCircle size={16} /> Open first conversation
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}