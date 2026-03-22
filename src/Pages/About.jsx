import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const About = () => {
    return (
        <div className="min-h-screen bg-[#FFF8F0] text-[#5E0006]">

            {/* HERO SECTION - MINIMAL */}
            <div className="bg-[#5E0006] text-[#FFF8F0] px-6 py-20">

                <div className="max-w-5xl mx-auto text-center">

                    <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-snug">
                        Travel Smarter. Travel Together.
                    </h1>

                    <p className="text-[#FFF8F0]/80 max-w-2xl mx-auto mb-8">
                        TravelMates is a social travel platform that helps you discover destinations,
                        share real experiences, and connect with like-minded travelers — all in one place.
                    </p>

                    <div className="flex justify-center gap-4">
                        <button className="bg-[#FFF8F0] text-[#5E0006] px-6 py-3 rounded-lg font-semibold hover:scale-105 transition">
                            <Link to="/">Explore Now</Link>
                        </button>

                        <button className="border border-[#FFF8F0]/40 px-6 py-3 rounded-lg hover:bg-[#FFF8F0]/10 transition">
                            Learn More
                        </button>
                    </div>

                    {/* SUBTLE VISUAL LINE */}
                    <div className="mt-12 flex items-center justify-center gap-3 text-[#FFF8F0]/60 text-sm">
                        <span>📍 Plan</span>
                        <span className="w-10 h-[1px] bg-[#FFF8F0]/40"></span>
                        <span>Connect</span>
                        <span className="w-10 h-[1px] bg-[#FFF8F0]/40"></span>
                        <span>Explore ✈️</span>
                    </div>

                </div>
            </div>

            {/* HEADER */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                className="max-w-5xl mx-auto text-center px-6 py-12"
            >
                <h1 className="text-4xl font-bold mb-4">
                    About TravelMates ✨
                </h1>
                <p className="text-[#5E0006]/70">
                    A Social Travel Companion Platform built to make travel smarter,
                    more connected, and community-driven.
                </p>
            </motion.div>

            {/* SECTIONS */}
            {[
                {
                    title: "🌍 Our Vision",
                    content:
                        "TravelMates bridges travel planning with social interaction. Unlike traditional platforms, it enables users to share experiences, discover destinations, and connect with like-minded travelers."
                },
                {
                    title: "⚠️ The Problem",
                    list: [
                        "Lack of reliable travel information",
                        "No platform to find travel companions",
                        "Unstructured travel content",
                        "Limited community-driven tools"
                    ]
                },
                {
                    title: "💡 Our Solution",
                    content:
                        "TravelMates integrates blogs, reviews, companion matching, and real-time chat into a single platform."
                }
            ].map((section, i) => (
                <motion.div
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    className="max-w-5xl mx-auto px-6 mb-12"
                >
                    <h2 className="text-2xl font-semibold mb-4">
                        {section.title}
                    </h2>

                    {section.content && (
                        <p className="text-[#5E0006]/80 leading-relaxed">
                            {section.content}
                        </p>
                    )}

                    {section.list && (
                        <ul className="list-disc pl-6 text-[#5E0006]/80 space-y-2">
                            {section.list.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    )}
                </motion.div>
            ))}

            {/* FEATURES */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="max-w-5xl mx-auto px-6 mb-12"
            >
                <h2 className="text-2xl font-semibold mb-6">🚀 Key Features</h2>

                <div className="grid md:grid-cols-2 gap-6">
                    {[
                        "✍️ Share travel blogs & experiences",
                        "🤝 Find travel companions",
                        "💬 Real-time chat",
                        "🗺️ Interactive maps",
                        "⭐ Ratings & recommendations",
                        "🔐 Secure authentication"
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="bg-white p-5 rounded-xl shadow transition transform hover:-translate-y-2 hover:shadow-xl"
                        >
                            {feature}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* TECH STACK */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="max-w-5xl mx-auto px-6 mb-12"
            >
                <h2 className="text-2xl font-semibold mb-4">⚙️ Technology Stack</h2>
                <p className="text-[#5E0006]/80">
                    Built using MERN stack (MongoDB, Express, React, Node.js),
                    with JWT authentication, Socket.io for real-time chat,
                    and Google Maps API integration.
                </p>
            </motion.div>

            {/* CTA */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="max-w-5xl mx-auto px-6 pb-16 text-center"
            >
                <div className="bg-[#5E0006] text-[#FFF8F0] p-8 rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold mb-3">
                        Start Your Journey with TravelMates 🚀
                    </h3>

                    <p className="mb-4 text-[#FFF8F0]/80">
                        Explore, connect, and travel smarter with our community.
                    </p>

                    <button className="bg-[#FFF8F0] text-[#5E0006] px-6 py-2 rounded-lg font-semibold transition transform hover:scale-110 hover:shadow-lg">
                        <Link to="/signup">Join Now</Link>
                    </button>
                </div>
            </motion.div>

        </div>
    );
};

export default About;