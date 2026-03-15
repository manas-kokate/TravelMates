import React, { useState } from "react";

const LandingPage = () => {
    const [search, setSearch] = useState("");

    const features = [
        {
            title: "Find Travel Companions",
            desc: "Meet verified solo travelers heading to the same destination and plan adventures together.",
            icon: "👣",
        },
        {
            title: "Share Travel Blogs",
            desc: "Document your journeys with immersive travel stories, photos and experiences.",
            icon: "📝",
        },
        {
            title: "Discover Itineraries",
            desc: "Explore curated itineraries created by real travelers across the world.",
            icon: "🧭",
        },
    ];

    const blogs = [
        {
            title: "Backpacking Through Himachal",
            location: "Himachal Pradesh",
            img: "https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "Solo Escape to Bali",
            location: "Indonesia",
            img: "https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "Night Walks in Tokyo",
            location: "Japan",
            img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1194&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    return (
        <div className="bg-[#FFF8F0] text-[#5E0006] min-h-screen">

            {/* HERO */}
            <section className="pt-28 pb-20 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                    <div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                            Travel Better, <br />
                            <span>Travel Together</span>
                        </h1>

                        <p className="mt-6 text-lg text-[#5E0006]/80 max-w-lg">
                            <span className="font-semibold">travelMates</span> connects solo
                            travelers around the world. Discover destinations, find trusted
                            travel companions, and share unforgettable travel stories.
                        </p>

                        <div className="mt-8 flex flex-col sm:flex-row gap-4">
                            <input
                                type="text"
                                aria-label="Search destinations"
                                placeholder="Search destinations..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="px-5 py-3 rounded-full border border-[#5E0006]/20 outline-none focus:ring-2 focus:ring-[#5E0006] w-full"
                            />
                            <button className="bg-[#5E0006] text-[#FFF8F0] px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
                                Explore
                            </button>
                        </div>
                    </div>

                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                            alt="travel"
                            className="rounded-2xl shadow-xl"
                        />
                    </div>

                </div>
            </section>


            {/* BLOG PREVIEW */}
            <section className="py-20 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">

                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <h2 className="text-3xl lg:text-4xl font-bold">
                            Stories From Travelers
                        </h2>

                        <button className="border border-[#5E0006] px-5 py-2 rounded-full hover:bg-[#5E0006] hover:text-[#FFF8F0] transition">
                            View All Blogs
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

            {/* COMMUNITY SECTION (REPLACED CTA) */}
            <section className="py-20 px-6 lg:px-12 bg-[#5E0006] text-[#FFF8F0]">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">

                    <div>
                        <h2 className="text-3xl lg:text-4xl font-bold">
                            A Community Built For Solo Travelers
                        </h2>

                        <p className="mt-6 text-[#FFF8F0]/80 text-lg">
                            travelMates isn't just another travel website. It’s a growing
                            community of explorers who believe journeys are better when
                            shared. Find companions, exchange experiences, and create
                            friendships across borders.
                        </p>

                        <div className="flex gap-6 mt-8 flex-wrap">
                            <div>
                                <p className="text-3xl font-bold">5K+</p>
                                <p className="text-[#FFF8F0]/70">Travelers</p>
                            </div>

                            <div>
                                <p className="text-3xl font-bold">120+</p>
                                <p className="text-[#FFF8F0]/70">Destinations</p>
                            </div>

                            <div>
                                <p className="text-3xl font-bold">800+</p>
                                <p className="text-[#FFF8F0]/70">Travel Stories</p>
                            </div>
                        </div>

                    </div>

                    <div>
                        <img
                            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1121&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="travel community"
                            className="rounded-2xl shadow-lg"
                        />
                    </div>

                </div>
            </section>

            {/* FEATURES */}
            <section className="py-20 px-6 lg:px-12 bg-[#5E0006]/5">
                <div className="max-w-7xl mx-auto text-center">

                    <h2 className="text-3xl lg:text-4xl font-bold">
                        Why Travelers Love travelMates
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
        </div>
    );
};

export default LandingPage;