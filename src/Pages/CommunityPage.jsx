import { useState } from "react";

const postsData = [
    {
        id: 1,
        title: "3 Days in Goa Under ₹15,000",
        author: "Rahul",
        content: "Amazing beaches, budget stays, and crazy nightlife!",
        image: "https://images.unsplash.com/photo-1587922546307-776227941871",
    },
    {
        id: 2,
        title: "Solo Trip to Manali 🏔️",
        author: "Priya",
        content: "Peaceful mountains, cafes, and snow adventures!",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    {
        id: 3,
        title: "Exploring Jaipur in 2 Days",
        author: "Amit",
        content: "Forts, culture, and amazing street food!",
        image: "https://images.unsplash.com/photo-1599661046289-e31897846e41",
    },
    {
        id: 4,
        title: "Budget Bali Trip Guide ✈️",
        author: "Sneha",
        content: "Flights, villas, and beaches within budget!",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
        id: 4,
        title: "Budget Bali Trip Guide ✈️",
        author: "Sneha",
        content: "Flights, villas, and beaches within budget!",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    }
];

const CommunityPage = () => {
    const [search, setSearch] = useState("");

    const filteredPosts = postsData.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#FFF8F0] text-[#5E0006] px-6 py-10">

            {/* HEADER */}
            <div className="max-w-6xl mx-auto text-center mb-10">
                <h1 className="text-4xl font-bold mb-3">
                    🌍 Travel Community
                </h1>
                <p className="text-[#5E0006]/70">
                    Share your travel stories, reviews, and experiences with the world ✨
                </p>
            </div>

            {/* SEARCH + CTA */}
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 justify-between items-center mb-10">

                <input
                    type="text"
                    placeholder="Search travel stories..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-4 py-2 border border-[#5E0006]/30 rounded-lg w-full md:w-1/2 outline-none"
                />
            </div>

            {/* BLOG GRID */}
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                {filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
                    >
                        <img
                            src={post.image}
                            alt={post.title}
                            className="h-48 w-full object-cover"
                        />

                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-2">
                                {post.title}
                            </h3>

                            <p className="text-sm text-gray-600 mb-3">
                                {post.content}
                            </p>

                            <div className="flex justify-between items-center text-sm">
                                <span className="font-semibold">✍️ {post.author}</span>

                                <button className="text-[#5E0006] font-semibold hover:underline">
                                    Read More →
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default CommunityPage;