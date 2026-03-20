import React, { useState } from "react";
import {
    MapPin,
    Calendar,
    Search,
    ArrowRight,
    Filter
} from "lucide-react";

const blogsData = [
    {
        id: 1,
        title: "Hidden Trails of Coorg: A Monsoon Trek",
        location: "Coorg",
        date: "2025-03-12",
        readTime: "6 min read",
        category: "Nature",
        author: "Ananya Sharma",
        quote: "The monsoon made this journey unforgettable.",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
        desc: "The rain doesn't stop the adventure — it amplifies it. Discover misty forest paths of Coorg."
    },
    {
        id: 2,
        title: "Sunsets in Santorini",
        location: "Santorini",
        date: "2025-02-10",
        readTime: "5 min read",
        category: "Romantic",
        author: "Rahul Mehta",
        quote: "I’ve never seen colors like this before.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        desc: "Experience breathtaking sunsets over white-washed houses and blue domes."
    },
    {
        id: 3,
        title: "Into the Heart of Manali",
        location: "Manali",
        date: "2025-01-18",
        readTime: "7 min read",
        category: "Adventure",
        author: "Priya Verma",
        quote: "Snow, silence, and pure peace.",
        image: "https://images.unsplash.com/photo-1605540436563-5bca919ae766",
        desc: "A snowy escape into the Himalayas filled with adventure and calmness."
    },
    {
        id: 4,
        title: "Exploring the Streets of Tokyo",
        location: "Tokyo",
        date: "2025-03-01",
        readTime: "4 min read",
        category: "City Life",
        author: "Karan Gupta",
        quote: "Every street felt like a different world.",
        image: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
        desc: "From neon lights to quiet temples, Tokyo offers a unique contrast."
    },
    {
        id: 5,
        title: "Desert Safari in Dubai",
        location: "Dubai",
        date: "2025-02-22",
        readTime: "5 min read",
        category: "Adventure",
        author: "Sneha Kapoor",
        quote: "The desert has its own kind of magic.",
        image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        desc: "Experience thrilling dune bashing and serene desert sunsets."
    },
    {
        id: 6,
        title: "Backwaters of Kerala",
        location: "Kerala",
        date: "2025-01-28",
        readTime: "6 min read",
        category: "Nature",
        author: "Arjun Nair",
        quote: "Life slows down beautifully here.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        desc: "Cruise through serene backwaters and lush greenery."
    },
    {
        id: 7,
        title: "Paris: The City of Lights",
        location: "Paris",
        date: "2025-02-05",
        readTime: "5 min read",
        category: "Romantic",
        author: "Meera Joshi",
        quote: "Every corner felt like a movie scene.",
        image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a",
        desc: "Explore iconic landmarks, cafes, and romantic vibes in Paris."
    }
];

export default function Blogs() {
    const [search, setSearch] = useState("");
    const [place, setPlace] = useState("");
    const [category, setCategory] = useState("");
    const [sort, setSort] = useState("latest");

    const filteredBlogs = blogsData
        .filter((b) =>
            b.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((b) => (place ? b.location === place : true))
        .filter((b) => (category ? b.category === category : true))
        .sort((a, b) =>
            sort === "latest"
                ? new Date(b.date) - new Date(a.date)
                : new Date(a.date) - new Date(b.date)
        );

    return (
        <section className="min-h-screen bg-[#FFF8F0] text-[#5E0006] px-6 md:px-16 py-16">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto mb-10">
                <h1 className="text-4xl font-bold">Explore Travel Blogs</h1>
                <p className="opacity-70 mt-2">Discover stories from travelers 🌍</p>
            </div>

            {/* SEARCH + FILTERS */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 mb-10">

                {/* SEARCH */}
                <div className="relative flex-1">
                    <Search className="absolute top-3 left-3 text-[#5E0006]/60" size={18} />
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 border border-[#5E0006]/20 rounded-lg bg-white outline-none focus:ring-2 focus:ring-[#5E0006]"
                    />
                </div>

                {/* FILTERS */}
                <div className="flex flex-wrap gap-3">

                    {/* PLACE */}
                    <select
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
                        className="px-3 py-2 border border-[#5E0006]/20 rounded-lg bg-white text-sm"
                    >
                        <option value="">All Places</option>
                        <option value="Coorg">Coorg</option>
                        <option value="Santorini">Santorini</option>
                    </select>

                    {/* CATEGORY */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="px-3 py-2 border border-[#5E0006]/20 rounded-lg bg-white text-sm"
                    >
                        <option value="">All Features</option>
                        <option value="Nature">Nature</option>
                        <option value="Romantic">Romantic</option>
                    </select>

                    {/* SORT */}
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="px-3 py-2 border border-[#5E0006]/20 rounded-lg bg-white text-sm"
                    >
                        <option value="latest">Latest First</option>
                        <option value="oldest">Oldest First</option>
                    </select>

                </div>
            </div>

            {/* BLOG LIST */}
            <div className="max-w-7xl mx-auto space-y-8">
                {filteredBlogs.map((blog) => (
                    <div
                        key={blog.id}
                        className="flex flex-col md:flex-row bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 h-65"
                    >

                        {/* IMAGE */}
                        <div className="md:w-[35%] h-full">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        {/* CONTENT */}
                        <div className="md:w-[65%] p-6 flex flex-col justify-between">

                            {/* TOP CONTENT */}
                            <div>
                                {/* META */}
                                <div className="flex items-center gap-3 text-xs opacity-70">
                                    <span className="bg-[#5E0006]/10 px-2 py-1 rounded-full">
                                        {blog.category}
                                    </span>
                                    <span>{blog.date}</span>
                                    <span>•</span>
                                    <span>{blog.readTime}</span>
                                </div>

                                {/* TITLE */}
                                <h2 className="text-xl md:text-2xl font-semibold mt-2">
                                    {blog.title}
                                </h2>

                                {/* DESC */}
                                <p className="mt-2 text-sm opacity-80 line-clamp-2">
                                    {blog.desc}
                                </p>

                                {/* LOCATION */}
                                <div className="flex items-center gap-1 mt-3 text-sm opacity-70">
                                    <MapPin size={14} /> {blog.location}
                                </div>
                            </div>

                            {/* BOTTOM ROW */}
                            <div className="flex items-center justify-between mt-4">

                                {/* AUTHOR SECTION */}
                                <div className="flex items-center gap-3 max-w-[70%]">

                                    <img
                                        src={`https://ui-avatars.com/api/?name=${blog.title}`}
                                        alt="author"
                                        className="w-10 h-10 rounded-full object-cover border border-[#5E0006]/20"
                                    />

                                    <div className="text-sm">
                                        <p className="font-medium">{blog.author}</p>
                                        <p className="text-xs opacity-70 italic line-clamp-1">
                                            “{blog.quote || "This place changed my perspective completely."}”
                                        </p>
                                    </div>
                                </div>

                                {/* BUTTON */}
                                <button className="group flex items-center gap-2 border border-[#5E0006] text-[#5E0006] px-5 py-2 rounded-lg hover:bg-[#5E0006] hover:text-[#FFF8F0] transition">
                                    Read More
                                    <ArrowRight
                                        size={16}
                                        className="transition-transform group-hover:translate-x-2"
                                    />
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}