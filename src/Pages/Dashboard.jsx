import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Compass, LayoutDashboard, BookOpen, Users, MessageSquare,
    UserCircle, LogOut, Bell, Menu, X, Search, MessageCircle, WandSparkles,
    UserPlus, MapPin, Loader2,
} from "lucide-react";
import { searchUsers, sendConnectionRequest } from "../api/social.api.js";
import { normalizeImageSrc } from "../utils/imageUrl.js";
import DashboardHome from "../Components/DasboardHome";
import ShareBlog from "../Components/ShareBlog";
import FindCompanions from "../Components/FindCompanions";
import Chats from "../Components/Chats";
import CommunityReviews from "../Components/CommunityReviews";
import UserProfile from "../Components/UserProfile";
import TripioChat from "../Components/TripioChat";

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "blogs", label: "Share Blogs", icon: BookOpen },
    { id: "companions", label: "Find Companions", icon: Users },
    { id: "community", label: "Community & Reviews", icon: MessageSquare },
    { id: "chats", label: "Chats", icon: MessageCircle },
    { id: "profile", label: "User Profile", icon: UserCircle },
    { id: "tripio", label: "Tripio (AI Trip Planner)", icon: WandSparkles }
];

// ── Placeholder (remove once real components are plugged in) ─────────────────
const Placeholder = ({ label }) => (
    <div className="flex flex-col items-center justify-center min-h-96 gap-4 text-center px-8">
        <div className="w-16 h-16 rounded-full bg-[#f0e4db] flex items-center justify-center text-3xl">
            ✈️
        </div>
        <h2 className="text-2xl font-bold text-[#1e0a0a]">{label}</h2>
        <p className="text-[#9a7070] text-sm max-w-sm leading-relaxed">
            Drop your component in this slot.
        </p>
        <span className="px-4 py-1.5 rounded-full border border-dashed border-[#c0857a] text-[#a06060] text-xs font-mono tracking-wide">
            component slot
        </span>
    </div>
);

function readSessionUser() {
    try {
        return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
        return null;
    }
}

// ── Dashboard Shell ───────────────────────────────────────────────────────────
export default function Dashboard() {
    const [active, setActive] = useState("dashboard");
    const [sidebarOpen, setSidebar] = useState(false);
    const [sessionUser, setSessionUser] = useState(readSessionUser);
    const routerNavigate = useNavigate();

    const [userSearch, setUserSearch] = useState("");
    const [userResults, setUserResults] = useState([]);
    const [userSearchOpen, setUserSearchOpen] = useState(false);
    const [userSearchLoading, setUserSearchLoading] = useState(false);
    const [connectBusyId, setConnectBusyId] = useState(null);
    const userSearchRef = useRef(null);

    const currentLabel = NAV_ITEMS.find((n) => n.id === active)?.label ?? "Dashboard";

    const navigate = (id) => { setActive(id); setSidebar(false); };

    useEffect(() => {
        const syncUser = () => setSessionUser(readSessionUser());
        window.addEventListener("travelmates:user-updated", syncUser);
        return () => window.removeEventListener("travelmates:user-updated", syncUser);
    }, []);

    useEffect(() => {
        setSessionUser(readSessionUser());
    }, [active]);

    useEffect(() => {
        const q = userSearch.trim();
        if (!q) {
            setUserResults([]);
            setUserSearchOpen(false);
            return;
        }
        const timer = setTimeout(async () => {
            setUserSearchOpen(true);
            setUserSearchLoading(true);
            setUserResults([]);
            try {
                const { data } = await searchUsers({ name: q, limit: 12, page: 1 });
                if (data.status === 200) {
                    setUserResults(data.users || []);
                } else {
                    toast.error(data.message || "Search failed");
                }
            } catch {
                toast.error("Search failed");
            } finally {
                setUserSearchLoading(false);
            }
        }, 360);
        return () => clearTimeout(timer);
    }, [userSearch]);

    useEffect(() => {
        const onDoc = (e) => {
            if (userSearchRef.current && !userSearchRef.current.contains(e.target)) {
                setUserSearchOpen(false);
            }
        };
        document.addEventListener("mousedown", onDoc);
        return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    const handleSendConnectFromSearch = async (receiverId) => {
        setConnectBusyId(String(receiverId));
        try {
            const { data } = await sendConnectionRequest(receiverId);
            if (data.status === 200) {
                toast.success(data.message || "Connection request sent");
            } else {
                toast.error(data.message || "Could not send request");
            }
        } catch (e) {
            toast.error(e?.response?.data?.message || e?.message || "Could not send request");
        } finally {
            setConnectBusyId(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out");
        routerNavigate("/login");
    };

    const displayName = sessionUser?.username || "Traveler";
    const initials = displayName
        .split(/\s+/)
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "TM";

    return (
        <div className="flex h-screen bg-[#fdf8f4] overflow-hidden">

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebar(false)}
                />
            )}

            {/* ══════════════════════ SIDEBAR ══════════════════════ */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-50 w-[248px] flex flex-col
          bg-[#5a0e0e] shadow-2xl
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:z-auto
        `}
            >
                {/* Logo */}
                <div className="flex items-center gap-2.5 px-6 py-6 border-b border-white/10">
                    <Compass size={24} strokeWidth={1.8} className="text-[#e8a090] shrink-0" />
                    <span className="text-xl font-bold text-white tracking-tight">
                        travel<span className="text-[#e8a090]">Mates</span>
                    </span>
                </div>

                {/* Nav links */}
                <nav className="flex-1 px-3 py-5 flex flex-col gap-1 overflow-y-auto">
                    <p className="text-[10px] font-semibold tracking-widest uppercase text-white/30 px-3 mb-2">
                        Main Menu
                    </p>

                    {NAV_ITEMS.map(({ id, label, icon: NavIcon }) => {
                        const isActive = active === id;
                        return (
                            <button
                                key={id}
                                onClick={() => navigate(id)}
                                className={`
                  relative flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl
                  text-sm font-medium text-left transition-all duration-200
                  ${isActive
                                        ? "bg-white/15 text-white"
                                        : "text-white/60 hover:bg-white/8 hover:text-white/90"}
                `}
                            >
                                {isActive && (
                                    <span className="absolute left-0 top-[22%] bottom-[22%] w-[3px] rounded-r-full bg-[#e8a090]" />
                                )}
                                <NavIcon size={18} className={isActive ? "opacity-100" : "opacity-70"} />
                                {label}
                            </button>
                        );
                    })}
                </nav>

                {/* User + Logout */}
                <div className="px-3 py-4 border-t border-white/10 flex flex-col gap-1">
                    <button
                        onClick={() => navigate("profile")}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/6 hover:bg-white/10 transition-colors w-full text-left"
                    >
                        {sessionUser?.profilePic ? (
                            <img
                                src={normalizeImageSrc(sessionUser.profilePic)}
                                alt=""
                                className="w-9 h-9 rounded-full object-cover shrink-0 border-2 border-white/15"
                                referrerPolicy="no-referrer"
                            />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e8a090] to-[#c0392b] flex items-center justify-center text-sm font-bold text-white shrink-0 border-2 border-white/15">
                                {initials}
                            </div>
                        )}
                        <div className="min-w-0">
                            <p className="text-white text-sm font-semibold truncate">{displayName}</p>
                            <p className="text-white/40 text-[10.5px] truncate">
                                {sessionUser?.location || "travelMates"}
                            </p>
                        </div>
                    </button>

                    <button
                        type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-white/40 hover:text-[#e8a090] hover:bg-[#e8a090]/8 transition-colors text-sm font-medium w-full"
                    >
                        <LogOut size={16} />
                        Log out
                    </button>
                </div>
            </aside>

            {/* ══════════════════════ MAIN ══════════════════════ */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

                {/* Top bar */}
                <header className="h-16 shrink-0 flex items-center gap-4 px-6 bg-[#fdf8f4]/95 backdrop-blur border-b border-[#e8d5cc] sticky top-0 z-30 shadow-sm">
                    {/* Hamburger */}
                    <button
                        className="lg:hidden p-1.5 rounded-lg text-[#7a1a1a] hover:bg-[#f0e4db] transition-colors"
                        onClick={() => setSidebar((o) => !o)}
                    >
                        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>

                    {/* Breadcrumb */}
                    <div className="flex-1 min-w-0">
                        <p className="text-[11px] text-[#9a7070] font-medium">
                            travelMates / <span className="text-[#a33030] font-semibold">{currentLabel}</span>
                        </p>
                        <p className="text-lg font-bold text-[#1e0a0a] leading-tight truncate">
                            {currentLabel}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {/* Traveler search — searchUser API + connection request */}
                        <div className="relative min-w-0" ref={userSearchRef}>
                            <div className="flex items-center gap-2 bg-[#f0e4db] rounded-full px-3 py-2 sm:px-3.5 border border-transparent focus-within:border-[#c0857a] focus-within:ring-1 focus-within:ring-[#c0857a]/30 transition-colors w-[140px] sm:w-52 lg:w-64">
                                {userSearchLoading ? (
                                    <Loader2 size={14} className="text-[#9a7070] shrink-0 animate-spin" />
                                ) : (
                                    <Search size={13} className="text-[#9a7070] shrink-0" />
                                )}
                                <input
                                    type="search"
                                    autoComplete="off"
                                    className="bg-transparent outline-none text-sm text-[#1e0a0a] placeholder:text-[#9a7070] min-w-0 flex-1"
                                    placeholder="Find travelers…"
                                    value={userSearch}
                                    onChange={(e) => setUserSearch(e.target.value)}
                                    onFocus={() => {
                                        if (userSearch.trim()) setUserSearchOpen(true);
                                    }}
                                />
                                {userSearch && (
                                    <button
                                        type="button"
                                        aria-label="Clear search"
                                        className="p-0.5 rounded-full hover:bg-[#e8d5cc] text-[#9a7070]"
                                        onClick={() => {
                                            setUserSearch("");
                                            setUserResults([]);
                                            setUserSearchOpen(false);
                                        }}
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>

                            {userSearchOpen && userSearch.trim() && (
                                <div className="absolute right-0 top-full mt-1.5 w-[min(100vw-2rem,20rem)] sm:w-80 max-h-[min(70vh,20rem)] overflow-y-auto rounded-2xl border border-[#e8d5cc] bg-white shadow-xl z-50 py-1">
                                    {userSearchLoading ? (
                                        <p className="px-4 py-6 text-sm text-[#9a7070] text-center flex items-center justify-center gap-2">
                                            <Loader2 size={16} className="animate-spin" /> Searching…
                                        </p>
                                    ) : userResults.length === 0 ? (
                                        <p className="px-4 py-6 text-sm text-[#9a7070] text-center">
                                            No travelers match “{userSearch.trim()}”
                                        </p>
                                    ) : (
                                        <ul className="divide-y divide-[#f5ede8]">
                                            {userResults.map((u) => {
                                                const uid = u._id;
                                                const isSelf =
                                                    sessionUser?._id &&
                                                    String(uid) === String(sessionUser._id);
                                                return (
                                                    <li
                                                        key={String(uid)}
                                                        className="flex items-center gap-3 px-3 py-2.5 hover:bg-[#fdf8f4]"
                                                    >
                                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#e8a090] to-[#c0392b] text-white text-xs font-bold flex items-center justify-center shrink-0 overflow-hidden">
                                                            {u.profilePic ? (
                                                                <img
                                                                    src={normalizeImageSrc(u.profilePic)}
                                                                    alt=""
                                                                    className="w-full h-full object-cover"
                                                                    referrerPolicy="no-referrer"
                                                                />
                                                            ) : (
                                                                (u.username || "?")
                                                                    .slice(0, 2)
                                                                    .toUpperCase()
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-[#1e0a0a] truncate">
                                                                {u.username}
                                                            </p>
                                                            {u.location && (
                                                                <p className="text-[11px] text-[#9a7070] truncate flex items-center gap-1">
                                                                    <MapPin size={10} className="shrink-0" />
                                                                    {u.location}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            disabled={
                                                                isSelf ||
                                                                connectBusyId === String(uid)
                                                            }
                                                            onClick={() =>
                                                                handleSendConnectFromSearch(uid)
                                                            }
                                                            className="shrink-0 flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-[#7a1a1a] text-white hover:bg-[#5a0e0e] disabled:opacity-45 disabled:cursor-not-allowed"
                                                        >
                                                            {connectBusyId === String(uid) ? (
                                                                <Loader2 size={12} className="animate-spin" />
                                                            ) : (
                                                                <UserPlus size={12} />
                                                            )}
                                                            {isSelf ? "You" : "Connect"}
                                                        </button>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Bell */}
                        <button className="relative p-2 rounded-xl text-[#5a3030] hover:bg-[#f0e4db] hover:text-[#7a1a1a] transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#c0392b] border-2 border-[#fdf8f4]" />
                        </button>

                        {/* Avatar */}
                        <button
                            onClick={() => navigate("profile")}
                            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e8a090] to-[#c0392b] flex items-center justify-center text-sm font-bold text-white border-2 border-[#e8d5cc] hover:border-[#a33030] hover:scale-105 transition-all overflow-hidden"
                        >
                            {sessionUser?.profilePic ? (
                                <img src={normalizeImageSrc(sessionUser.profilePic)} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            ) : (
                                initials
                            )}
                        </button>
                    </div>
                </header>

                {/* ══════════════════════════════════════════════════
            PAGE CONTENT — plug your JSX components here
        ══════════════════════════════════════════════════ */}
                <main key={active} className="flex-1 overflow-y-auto p-8">

                    {active === "dashboard" && (
                        <DashboardHome />
                    )}

                    {active === "blogs" && (
                        <ShareBlog />
                    )}

                    {active === "companions" && (
                        <FindCompanions />
                    )}

                    {active === "chats" && (
                        <Chats />
                    )}

                    {active === "community" && (
                        <CommunityReviews />
                    )}

                    {active === "profile" && (
                        <UserProfile />
                    )}

                    {active === "tripio" && (
                        <TripioChat />
                    )}

                </main>
            </div>
        </div>
    );
}