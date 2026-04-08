import { useState, useRef, useEffect } from "react";
import {
    MapPin, Search, Heart, MessageCircle, Share2, Bookmark,
    Clock, Users, X, Compass, Filter, TrendingUp, Globe
} from "lucide-react";

// ── Blog Card ────────────────────────────────────────────────────────────────
function BlogCard({ blog, idx }) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [likes, setLikes] = useState(blog.likes || 0);

    const toggleLike = () => {
        setLiked((l) => !l);
        setLikes((n) => liked ? n - 1 : n + 1);
    };

    return (
        <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#f0e4db] hover:shadow-md transition">
            {/* Header */}
            <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold text-white">
                    {blog.user?.name?.slice(0, 2)?.toUpperCase()}
                </div>
                <div className="flex-1">
                    <p className="text-sm font-semibold">{blog.user?.name}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MapPin size={11} />
                        {blog.location}
                        <Clock size={10} />
                        {blog.createdAt}
                    </div>
                </div>
                <span className="text-[10px] px-2 py-1 bg-gray-100 rounded-full">
                    {blog.tag}
                </span>
            </div>

            {/* Image */}
            {blog.image && (
                <img src={blog.image} className="w-full h-52 object-cover px-4 rounded-xl" />
            )}

            {/* Body */}
            <div className="px-4 py-2">
                <p className="font-semibold text-sm">{blog.title}</p>
                <p className="text-xs text-gray-600 line-clamp-3">{blog.body}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 px-4 pb-4">
                <button onClick={toggleLike} className="text-xs flex items-center gap-1">
                    <Heart size={14} />
                    {likes}
                </button>
                <button className="text-xs flex items-center gap-1">
                    <MessageCircle size={14} />
                    {blog.comments?.length || 0}
                </button>
                <button className="text-xs">
                    <Share2 size={14} />
                </button>
                <button onClick={() => setSaved(s => !s)} className="ml-auto">
                    <Bookmark size={14} />
                </button>
            </div>
        </article>
    );
}

// ── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function DashboardHome() {
    const [blogs, setBlogs] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");


    const searchRef = useRef(null);

    const filters = ["All", "Trek Diary", "Food Journey", "Culture Trail", "Island Hopping"];

    // ── FETCH BLOGS ─────────────────────────────────────────────────────────
    const fetchBlogs = ({ page, activeFilter, searchQuery }) => {
        let params = {
            page,
            limit: 6,
        };

        if (activeFilter !== "All") {
            params.tag = activeFilter;
        }

        if (searchQuery.trim()) {
            params.search = searchQuery;
        }

        return API.get("/blogs", { params });
    };

    // ── EFFECTS ─────────────────────────────────────────────────────────────
    useEffect(() => {
        fetchBlogs();
    }, [page, activeFilter]);

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchBlogs();
        }, 500);
        return () => clearTimeout(delay);
    }, [searchQuery]);

    // ── UI ──────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-full">

            {/* Header */}
            <div className="flex justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Globe size={20} /> Traveler Feed
                    </h1>
                    <p className="text-sm text-gray-500">
                        Discover travelers around the world
                    </p>
                </div>

                {/* Search */}
                <div ref={searchRef} className="w-80">
                    <div className="flex items-center border px-3 py-2 rounded-xl">
                        <Search size={14} />
                        <input
                            className="flex-1 outline-none ml-2 text-sm"
                            placeholder="Search blogs..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                            <X size={14} onClick={() => setSearchQuery("")} />
                        )}
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-5">
                <Filter size={14} />
                {filters.map((f) => (
                    <button
                        key={f}
                        onClick={() => {
                            setActiveFilter(f);
                            setPage(1);
                        }}
                        className={`px-3 py-1 rounded-full text-xs ${activeFilter === f
                            ? "bg-black text-white"
                            : "border"
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Blog List */}
            {loading ? (
                <div className="text-center py-10">Loading...</div>
            ) : blogs.length === 0 ? (
                <div className="text-center py-10">
                    <Compass size={30} className="mx-auto mb-2" />
                    No blogs found
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {blogs.map((blog, idx) => (
                        <BlogCard key={blog._id} blog={blog} idx={idx} />
                    ))}
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center gap-3 mt-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage(p => p - 1)}
                    className="px-3 py-1 border rounded"
                >
                    Prev
                </button>

                <span className="text-sm">
                    Page {page} / {totalPages}
                </span>

                <button
                    disabled={page === totalPages}
                    onClick={() => setPage(p => p + 1)}
                    className="px-3 py-1 border rounded"
                >
                    Next
                </button>
            </div>

        </div>
    );
}