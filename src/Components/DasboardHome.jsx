import { useState, useRef, useEffect } from "react";
import {
    MapPin, Search, Heart, MessageCircle, Share2, Bookmark,
    Clock, Users, X, ChevronRight, Compass, Wifi, Filter,
    TrendingUp, Globe,
} from "lucide-react";

// ── Mock Data ─────────────────────────────────────────────────────────────────
const BLOGS = [
    {
        id: 1, user: "Priya Sharma", handle: "@priyatravels", avatar: "PS",
        avatarBg: "from-rose-400 to-pink-600",
        location: "Santorini, Greece", time: "2 min ago",
        tag: "Island Hopping",
        title: "Woke up to the most surreal sunrise over the caldera 🌅",
        body: "The white-washed buildings glowing orange in the morning light — no photo does it justice. Met two other solo travelers from Mumbai at the cliffside cafe. If you're here, find Cafe Classico at 6 AM!",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
        likes: 142, comments: 38, saves: 67, isLiked: false, isSaved: false,
        companions: ["RK", "AM"],
    },
    {
        id: 2, user: "Rahul Kapoor", handle: "@rahul_onroad", avatar: "RK",
        avatarBg: "from-amber-400 to-orange-500",
        location: "Kyoto, Japan", time: "18 min ago",
        tag: "Culture Trail",
        title: "Arashiyama bamboo grove at 5:30 AM — completely empty 🎋",
        body: "Skip the crowds. Set an alarm, bring a thermos of matcha, and walk through in silence. It feels like another world. Currently solo but would love to explore Fushimi Inari with someone today!",
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80",
        likes: 89, comments: 21, saves: 44, isLiked: true, isSaved: false,
        companions: [],
    },
    {
        id: 3, user: "Ananya Mehta", handle: "@ananya.wanders", avatar: "AM",
        avatarBg: "from-teal-400 to-cyan-600",
        location: "Patagonia, Argentina", time: "1 hr ago",
        tag: "Trek Diary",
        title: "Day 4 of Torres del Paine — legs burning, soul thriving 🏔️",
        body: "The W-trek is no joke. My backpack weighs 14kg and the wind nearly knocked me off the ridge. But this view? Worth every blister. Looking for trekking partners for the Grey Glacier tomorrow.",
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
        likes: 203, comments: 55, saves: 91, isLiked: false, isSaved: true,
        companions: ["VN"],
    },
    {
        id: 4, user: "Vikram Nair", handle: "@vikram_nomad", avatar: "VN",
        avatarBg: "from-violet-400 to-purple-600",
        location: "Marrakech, Morocco", time: "3 hrs ago",
        tag: "Food Journey",
        title: "Got beautifully lost in the medina and found THIS tagine spot 🍲",
        body: "Down an alley off Jemaa el-Fna that has no name on Google Maps. A 70-year-old cook named Hassan makes lamb tagine that costs 40 dirhams. Sharing exact pin with anyone who DMs me!",
        image: "https://images.unsplash.com/photo-1597211684565-dca64d72bdfe?w=600&q=80",
        likes: 318, comments: 74, saves: 120, isLiked: false, isSaved: false,
        companions: [],
    },
];

const LIVE_LOCATIONS = [
    { id: 1, user: "Priya Sharma", handle: "@priyatravels", avatar: "PS", avatarBg: "from-rose-400 to-pink-600", location: "Santorini", country: "🇬🇷", active: true, time: "Now" },
    { id: 2, user: "Rahul Kapoor", handle: "@rahul_onroad", avatar: "RK", avatarBg: "from-amber-400 to-orange-500", location: "Kyoto", country: "🇯🇵", active: true, time: "Now" },
    { id: 3, user: "Ananya Mehta", handle: "@ananya.wanders", avatar: "AM", avatarBg: "from-teal-400 to-cyan-600", location: "Patagonia", country: "🇦🇷", active: true, time: "4 min ago" },
    { id: 4, user: "Vikram Nair", handle: "@vikram_nomad", avatar: "VN", avatarBg: "from-violet-400 to-purple-600", location: "Marrakech", country: "🇲🇦", active: false, time: "2 hrs ago" },
    { id: 5, user: "Sneha Iyer", handle: "@sneha.roams", avatar: "SI", avatarBg: "from-lime-400 to-green-500", location: "Lisbon", country: "🇵🇹", active: true, time: "Now" },
    { id: 6, user: "Dev Malhotra", handle: "@devexplores", avatar: "DM", avatarBg: "from-sky-400 to-blue-600", location: "Reykjavik", country: "🇮🇸", active: false, time: "30 min ago" },
    { id: 7, user: "Kavya Reddy", handle: "@kavya.globe", avatar: "KR", avatarBg: "from-fuchsia-400 to-pink-600", location: "Bali", country: "🇮🇩", active: true, time: "Now" },
];

const ALL_USERS = [
    ...LIVE_LOCATIONS,
    { id: 8, user: "Aryan Singh", handle: "@aryanwanders", avatar: "AS", avatarBg: "from-orange-400 to-red-500", location: "Prague", country: "🇨🇿", active: false, time: "1 day ago" },
    { id: 9, user: "Meera Joshi", handle: "@meera.miles", avatar: "MJ", avatarBg: "from-indigo-400 to-blue-600", location: "Cape Town", country: "🇿🇦", active: false, time: "3 hrs ago" },
];

const TAG_COLORS = {
    "Island Hopping": "bg-rose-100 text-rose-700",
    "Culture Trail": "bg-amber-100 text-amber-700",
    "Trek Diary": "bg-teal-100 text-teal-700",
    "Food Journey": "bg-orange-100 text-orange-700",
};

// ── Blog Card ─────────────────────────────────────────────────────────────────
function BlogCard({ blog, idx }) {
    const [liked, setLiked] = useState(blog.isLiked);
    const [saved, setSaved] = useState(blog.isSaved);
    const [likes, setLikes] = useState(blog.likes);

    const toggleLike = () => {
        setLiked((l) => !l);
        setLikes((n) => liked ? n - 1 : n + 1);
    };

    return (
        <article
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#f0e4db] hover:shadow-md transition-shadow duration-300"
            style={{ animationDelay: `${idx * 80}ms` }}
        >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${blog.avatarBg} flex items-center justify-center text-xs font-bold text-white shrink-0 ring-2 ring-white shadow`}>
                    {blog.avatar}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-[#1e0a0a] truncate">{blog.user}</p>
                    <div className="flex items-center gap-1.5 text-[#9a7070]">
                        <MapPin size={11} />
                        <span className="text-xs truncate">{blog.location}</span>
                        <span className="text-xs">·</span>
                        <Clock size={10} />
                        <span className="text-xs">{blog.time}</span>
                    </div>
                </div>
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${TAG_COLORS[blog.tag] ?? "bg-gray-100 text-gray-600"}`}>
                    {blog.tag}
                </span>
            </div>

            {/* Image */}
            {blog.image && (
                <div className="relative mx-4 rounded-xl overflow-hidden mb-3">
                    <img src={blog.image} alt={blog.location} className="w-full h-52 object-cover" />
                    {/* Location pill overlay */}
                    <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                        <MapPin size={10} />
                        {blog.location}
                    </div>
                    {/* Companions overlay */}
                    {blog.companions.length > 0 && (
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-black/55 backdrop-blur-sm text-white text-[10px] px-2 py-1 rounded-full">
                            <Users size={10} />
                            {blog.companions.length} here too
                        </div>
                    )}
                </div>
            )}

            {/* Body */}
            <div className="px-4 pb-3">
                <p className="text-sm font-semibold text-[#1e0a0a] mb-1 leading-snug">{blog.title}</p>
                <p className="text-xs text-[#5a3030] leading-relaxed line-clamp-3">{blog.body}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 px-4 pb-4 border-t border-[#f5ede8] pt-3">
                <button
                    onClick={toggleLike}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${liked ? "text-rose-500 bg-rose-50" : "text-[#9a7070] hover:bg-[#f5ede8]"}`}
                >
                    <Heart size={14} fill={liked ? "currentColor" : "none"} />
                    {likes}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#9a7070] hover:bg-[#f5ede8] transition-colors">
                    <MessageCircle size={14} />
                    {blog.comments}
                </button>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#9a7070] hover:bg-[#f5ede8] transition-colors">
                    <Share2 size={14} />
                    Share
                </button>
                <button
                    onClick={() => setSaved((s) => !s)}
                    className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${saved ? "text-[#7a1a1a] bg-[#f5ede8]" : "text-[#9a7070] hover:bg-[#f5ede8]"}`}
                >
                    <Bookmark size={14} fill={saved ? "currentColor" : "none"} />
                </button>
            </div>
        </article>
    );
}


// ── User Search Result ────────────────────────────────────────────────────────
function UserResult({ user, onClose }) {
    const [followed, setFollowed] = useState(false);
    return (
        <div className="flex items-center gap-3 px-4 py-3 hover:bg-[#fdf8f4] transition-colors">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${user.avatarBg} flex items-center justify-center text-xs font-bold text-white shrink-0 shadow`}>
                {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1e0a0a] truncate">{user.user}</p>
                <div className="flex items-center gap-1 text-[#9a7070]">
                    <span className="text-xs">{user.handle}</span>
                    <span className="text-xs">·</span>
                    <MapPin size={10} />
                    <span className="text-xs">{user.location} {user.country}</span>
                </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
                {user.active && (
                    <span className="flex items-center gap-1 text-[9px] font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                        Live
                    </span>
                )}
                <button
                    onClick={() => setFollowed(f => !f)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${followed ? "bg-[#f0e4db] text-[#7a1a1a]" : "bg-[#7a1a1a] text-white hover:bg-[#5a0e0e]"}`}
                >
                    {followed ? "Following" : "Follow"}
                </button>
            </div>
        </div>
    );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function DashboardHome() {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const searchRef = useRef(null);

    const filters = ["All", "Trek Diary", "Food Journey", "Culture Trail", "Island Hopping"];

    // Search logic
    useEffect(() => {
        if (searchQuery.trim().length < 1) {
            setSearchResults([]);
            setShowResults(false);
            return;
        }
        const q = searchQuery.toLowerCase();
        const results = ALL_USERS.filter(
            (u) =>
                u.user.toLowerCase().includes(q) ||
                u.handle.toLowerCase().includes(q) ||
                u.location.toLowerCase().includes(q)
        );
        setSearchResults(results);
        setShowResults(true);
    }, [searchQuery]);

    // Close search on outside click
    useEffect(() => {
        const handler = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowResults(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const filteredBlogs = activeFilter === "All"
        ? BLOGS
        : BLOGS.filter((b) => b.tag === activeFilter);

    const selectedUser = LIVE_LOCATIONS.find((u) => u.id === selectedLocation);

    return (
        <div className="min-h-full">

            {/* ── Header row ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#1e0a0a] flex items-center gap-2">
                        <Globe size={22} className="text-[#7a1a1a]" />
                        Traveler Feed
                    </h1>
                    <p className="text-sm text-[#9a7070] mt-0.5">Discover who's where — connect, explore, travel together.</p>
                </div>

                {/* Search bar */}
                <div ref={searchRef} className="relative w-full sm:w-80">
                    <div className="flex items-center gap-2 bg-white border border-[#e8d5cc] rounded-xl px-3.5 py-2.5 shadow-sm focus-within:border-[#7a1a1a] focus-within:ring-2 focus-within:ring-[#7a1a1a]/10 transition-all">
                        <Search size={15} className="text-[#9a7070] shrink-0" />
                        <input
                            className="flex-1 bg-transparent outline-none text-sm text-[#1e0a0a] placeholder:text-[#b09090]"
                            placeholder="Search travelers or destinations…"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => searchQuery && setShowResults(true)}
                        />
                        {searchQuery && (
                            <button onClick={() => { setSearchQuery(""); setShowResults(false); }}>
                                <X size={14} className="text-[#9a7070] hover:text-[#1e0a0a]" />
                            </button>
                        )}
                    </div>

                    {/* Search results dropdown */}
                    {showResults && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#e8d5cc] rounded-2xl shadow-xl z-50 overflow-hidden">
                            {searchResults.length === 0 ? (
                                <div className="px-4 py-6 text-center text-sm text-[#9a7070]">
                                    No travelers found for "<span className="font-medium text-[#5a3030]">{searchQuery}</span>"
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#f0e4db]">
                                        <span className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide">
                                            {searchResults.length} traveler{searchResults.length !== 1 ? "s" : ""} found
                                        </span>
                                        <button onClick={() => setShowResults(false)}>
                                            <X size={14} className="text-[#9a7070]" />
                                        </button>
                                    </div>
                                    <div className="max-h-72 overflow-y-auto divide-y divide-[#f5ede8]">
                                        {searchResults.map((u) => (
                                            <UserResult key={u.id} user={u} onClose={() => setShowResults(false)} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>


            {/* ── Blog Feed ── */}
            <section>
                {/* Filter tabs */}
                <div className="flex items-center gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
                    <Filter size={14} className="text-[#9a7070] shrink-0" />
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`shrink-0 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all duration-200 ${activeFilter === f
                                ? "bg-[#7a1a1a] text-white shadow-sm"
                                : "bg-white text-[#9a7070] border border-[#e8d5cc] hover:border-[#c0857a] hover:text-[#5a3030]"
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                    <div className="ml-auto flex items-center gap-1 text-xs text-[#9a7070] shrink-0">
                        <TrendingUp size={13} />
                        <span className="hidden sm:inline">Latest first</span>
                    </div>
                </div>

                {/* Cards grid */}
                {filteredBlogs.length === 0 ? (
                    <div className="text-center py-16 text-[#9a7070]">
                        <Compass size={32} className="mx-auto mb-3 opacity-40" />
                        <p className="text-sm">No posts in this category yet.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        {filteredBlogs.map((blog, idx) => (
                            <BlogCard key={blog.id} blog={blog} idx={idx} />
                        ))}
                    </div>
                )}
            </section>

        </div>
    );
}