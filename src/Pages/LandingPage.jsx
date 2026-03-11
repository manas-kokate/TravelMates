import React, { useState } from "react";

const LandingPage = () => {
    const [search, setSearch] = useState("");

    const features = [
        {
            title: "Find Travel Companions",
            desc: "Connect with solo travelers heading to the same destination and explore together.",
            icon: "👣",
        },
        {
            title: "Share Travel Blogs",
            desc: "Post immersive travel stories, photos, and experiences from your adventures.",
            icon: "📝",
        },
        {
            title: "Discover Destinations",
            desc: "Explore new destinations through curated itineraries shared by travelers.",
            icon: "🧭",
        },
    ];

    const blogs = [
        {
            title: "Backpacking Through Himachal",
            location: "Himachal Pradesh",
            img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        },
        {
            title: "Solo Trip to Bali",
            location: "Indonesia",
            img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        },
        {
            title: "Exploring the Streets of Tokyo",
            location: "Japan",
            img: "https://images.unsplash.com/photo-1549692520-acc6669e2f0c",
        },
    ];

    return (
        <div className="bg-[#FFF8F0] text-[#5E0006] min-h-screen">

            {/* Hero Section */}
            <section className="relative pt-28 pb-20 px-6 lg:px-12 overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                    <div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            Explore the World <br />
                            <span className="text-[#5E0006]">Together</span>
                        </h1>

                        <p className="mt-6 text-lg text-[#5E0006]/80 max-w-lg">
                            SoloWander connects solo travelers around the world.
                            Discover destinations, share travel blogs, and find the perfect
                            companion for your next adventure.
                        </p>

                        {/* Search */}
                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                aria-label="Search destination"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search destinations..."
                                className="px-5 py-3 rounded-full border border-[#5E0006]/20 outline-none focus:ring-2 focus:ring-[#5E0006] w-full"
                            />
                            <button className="bg-[#5E0006] text-[#FFF8F0] px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
                                Explore
                            </button>
                        </div>
                    </div>

                    <div className="relative">
                        <img
                            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                            alt="travel"
                            className="rounded-2xl shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6 lg:px-12 bg-[#5E0006]/5">
                <div className="max-w-7xl mx-auto text-center">

                    <h2 className="text-3xl lg:text-4xl font-bold">
                        Why Use SoloWander?
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        {features.map((f, i) => (
                            <div
                                key={i}
                                className="bg-[#FFF8F0] p-8 rounded-xl shadow-md hover:shadow-xl transition"
                            >
                                <div className="text-4xl mb-4">{f.icon}</div>
                                <h3 className="text-xl font-semibold">{f.title}</h3>
                                <p className="mt-3 text-[#5E0006]/70">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Preview */}
            <section className="py-20 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">

                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <h2 className="text-3xl lg:text-4xl font-bold">
                            Latest Travel Blogs
                        </h2>
                        <button className="border border-[#5E0006] px-5 py-2 rounded-full hover:bg-[#5E0006] hover:text-[#FFF8F0] transition">
                            View All
                        </button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mt-12">
                        {blogs.map((blog, i) => (
                            <div
                                key={i}
                                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition hover:scale-[1.02]"
                            >
                                <img
                                    src={blog.img}
                                    alt={blog.title}
                                    className="h-56 w-full object-cover"
                                />

                                <div className="p-5">
                                    <h3 className="text-xl font-semibold">{blog.title}</h3>
                                    <p className="text-[#5E0006]/70 mt-1">{blog.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call To Action */}
            <section className="py-20 px-6 lg:px-12 bg-[#5E0006] text-[#FFF8F0] text-center">

                <h2 className="text-3xl lg:text-4xl font-bold">
                    Ready for Your Next Adventure?
                </h2>

                <p className="mt-4 max-w-2xl mx-auto text-[#FFF8F0]/80">
                    Join thousands of solo travelers discovering new destinations and
                    making meaningful connections.
                </p>

                <button className="mt-8 bg-[#FFF8F0] text-[#5E0006] px-8 py-3 rounded-full font-semibold hover:scale-105 transition">
                    Start Exploring
                </button>

            </section>

        </div>
    );
};

export default LandingPage;