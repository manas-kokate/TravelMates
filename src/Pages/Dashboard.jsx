import { useState } from "react";
import {
    Compass, LayoutDashboard, BookOpen, Users, MessageSquare,
    UserCircle, LogOut, Bell, Menu, X, Search,
} from "lucide-react";
import DashboardHome from "../Components/DasboardHome";
import ShareBlog from "../Components/ShareBlog";

// ── Nav items ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "blogs", label: "Share Blogs", icon: BookOpen },
    { id: "companions", label: "Find Companions", icon: Users },
    { id: "community", label: "Community & Reviews", icon: MessageSquare },
    { id: "profile", label: "User Profile", icon: UserCircle },
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

// ── Dashboard Shell ───────────────────────────────────────────────────────────
export default function Dashboard() {
    const [active, setActive] = useState("dashboard");
    const [sidebarOpen, setSidebar] = useState(false);

    const currentLabel = NAV_ITEMS.find((n) => n.id === active)?.label ?? "Dashboard";

    const navigate = (id) => { setActive(id); setSidebar(false); };

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
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e8a090] to-[#c0392b] flex items-center justify-center text-sm font-bold text-white shrink-0 border-2 border-white/15">
                            AK
                        </div>
                        <div className="min-w-0">
                            <p className="text-white text-sm font-semibold truncate">Arjun Kulkarni</p>
                            <p className="text-white/40 text-[10.5px] truncate">Solo Traveler · 12 trips</p>
                        </div>
                    </button>

                    <button className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-white/40 hover:text-[#e8a090] hover:bg-[#e8a090]/8 transition-colors text-sm font-medium w-full">
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
                        {/* Search */}
                        <div className="hidden sm:flex items-center gap-2 bg-[#f0e4db] rounded-full px-3.5 py-2 border border-transparent focus-within:border-[#e8d5cc] transition-colors">
                            <Search size={13} className="text-[#9a7070] shrink-0" />
                            <input
                                className="bg-transparent outline-none text-sm text-[#1e0a0a] placeholder:text-[#9a7070] w-44"
                                placeholder="Search destinations…"
                            />
                        </div>

                        {/* Bell */}
                        <button className="relative p-2 rounded-xl text-[#5a3030] hover:bg-[#f0e4db] hover:text-[#7a1a1a] transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#c0392b] border-2 border-[#fdf8f4]" />
                        </button>

                        {/* Avatar */}
                        <button
                            onClick={() => navigate("profile")}
                            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#e8a090] to-[#c0392b] flex items-center justify-center text-sm font-bold text-white border-2 border-[#e8d5cc] hover:border-[#a33030] hover:scale-105 transition-all"
                        >
                            AK
                        </button>
                    </div>
                </header>

                {/* ══════════════════════════════════════════════════
            PAGE CONTENT — plug your JSX components here
        ══════════════════════════════════════════════════ */}
                <main key={active} className="flex-1 overflow-y-auto p-8">

                    {active === "dashboard" && (
                        // ✅ Replace <Placeholder /> with your <DashboardPage /> component
                        <DashboardHome />
                    )}

                    {active === "blogs" && (
                        // ✅ Replace <Placeholder /> with your <ShareBlogs /> component
                        <ShareBlog />
                    )}

                    {active === "companions" && (
                        // ✅ Replace <Placeholder /> with your <FindCompanions /> component
                        <Placeholder label="Find Companions" />
                    )}

                    {active === "community" && (
                        // ✅ Replace <Placeholder /> with your <CommunityReviews /> component
                        <Placeholder label="Community & Reviews" />
                    )}

                    {active === "profile" && (
                        // ✅ Replace <Placeholder /> with your <UserProfile /> component
                        <Placeholder label="User Profile" />
                    )}

                </main>
            </div>
        </div>
    );
}