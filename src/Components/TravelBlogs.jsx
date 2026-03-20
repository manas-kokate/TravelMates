import React from 'react'
import { MapPin, ArrowRight } from "lucide-react";

const TravelBlogs = () => {
    const blogs = [
        {
            place: "Goa",
            desc: "Explore beaches, nightlife, and budget-friendly stays for a perfect 3-day getaway.",
        },
        {
            place: "Manali",
            desc: "Snowy mountains, adventure sports, and peaceful valleys await your escape.",
        },
        {
            place: "Jaipur",
            desc: "Dive into royal heritage, forts, and vibrant markets in the Pink City.",
        },
        {
            place: "Kerala",
            desc: "Relax with backwaters, greenery, and serene houseboat experiences.",
        },
        {
            place: "Ladakh",
            desc: "High-altitude adventures, breathtaking landscapes, and unforgettable road trips.",
        },
    ];

    return (
        <div>
            {/* BLOGS */}
            <section className="w-full bg-[#FFF8F0] text-[#5E0006] py-20 px-6 md:px-16">
                <div className="max-w-7xl mx-auto">

                    {/* HEADING */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-semibold">
                            Explore Travel Ideas
                        </h2>
                        <p className="mt-3 opacity-70">
                            Get inspired with destinations curated by Tripio
                        </p>
                    </div>

                    {/* CARDS GRID */}
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {blogs.map((blog, i) => (
                            <div
                                key={i}
                                className="bg-white border border-[#5E0006]/10 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:-translate-y-2 transition duration-300 group"
                            >
                                {/* ICON + PLACE */}
                                <div className="flex items-center gap-2 mb-3">
                                    <MapPin className="w-5 h-5 text-[#5E0006]" />
                                    <h3 className="text-xl font-semibold">{blog.place}</h3>
                                </div>

                                {/* DESCRIPTION */}
                                <p className="text-sm opacity-70 mb-5">
                                    {blog.desc}
                                </p>

                                {/* BUTTON */}
                                <button className="flex items-center gap-2 text-sm font-medium group-hover:gap-3 transition-all">
                                    Explore {blog.place}
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* SHOW MORE BUTTON */}
                    <div className="flex justify-center mt-12">
                        <button className="bg-[#5E0006] text-[#FFF8F0] px-6 py-3 rounded-xl font-medium hover:scale-105 transition flex items-center gap-2">
                            Show More
                            <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default TravelBlogs
