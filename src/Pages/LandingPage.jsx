import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import TripioSection from "../Components/TripioSection";
import { MapPin, ArrowRight } from "lucide-react";

const LandingPage = () => {
    const [search, setSearch] = useState("");

    const prompts = [
        "Plan a 3-day Goa trip under ₹10,000",
        "Suggest a solo backpacking trip in Himachal",
        "Romantic weekend getaway near Pune",
    ];

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

            {/* TRIPIO */}
            <TripioSection />

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