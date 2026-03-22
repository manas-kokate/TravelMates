import React from "react";

const Footer = () => {
    const links = [
        { name: "Home", href: "/" },
        { name: "Discover", href: "/discover" },
        { name: "Travel Blogs", href: "/blogs" },
        { name: "Find Companions", href: "/companions" },
    ];

    return (
        <footer className="bg-[#5E0006] text-[#FFF8F0] px-6 lg:px-12 py-16">
            <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">

                {/* Brand */}
                <div>
                    <h2 className="text-2xl font-bold">travelMates</h2>

                    <p className="mt-4 text-[#FFF8F0]/80 leading-relaxed">
                        travelMates is a community where solo travelers connect,
                        discover destinations, share travel stories, and find the
                        perfect companion for their next adventure.
                    </p>

                    {/* Social */}
                    <div className="flex gap-4 mt-6">

                        <a
                            href="#"
                            aria-label="Instagram"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FFF8F0]/10 hover:bg-[#FFF8F0]/20 transition"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                                alt="Instagram"
                                className="w-4 h-4"
                            />
                        </a>

                        <a
                            href="#"
                            aria-label="Twitter"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FFF8F0]/10 hover:bg-[#FFF8F0]/20 transition"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/733/733579.png"
                                alt="Twitter"
                                className="w-4 h-4"
                            />
                        </a>

                        <a
                            href="#"
                            aria-label="YouTube"
                            className="w-9 h-9 flex items-center justify-center rounded-full bg-[#FFF8F0]/10 hover:bg-[#FFF8F0]/20 transition"
                        >
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                                alt="YouTube"
                                className="w-4 h-4"
                            />
                        </a>

                    </div>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="font-semibold text-lg">Navigation</h3>

                    <ul className="mt-4 space-y-3">
                        {links.map((link, i) => (
                            <li key={i}>
                                <a
                                    href={link.href}
                                    className="text-[#FFF8F0]/80 hover:text-white transition"
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h3 className="font-semibold text-lg">Join the Community</h3>

                    <p className="mt-4 text-[#FFF8F0]/80">
                        Get travel inspiration, stories and updates from the
                        travelMates community.
                    </p>

                    <div className="flex mt-5">
                        <button className="bg-[#FFF8F0] text-[#5E0006] px-5 py-2 rounded-r-full font-semibold hover:opacity-90 transition">
                            Join
                        </button>
                    </div>
                </div>

            </div>

            {/* Bottom */}
            <div className="max-w-7xl mx-auto mt-12 border-t border-[#FFF8F0]/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

                <p className="text-[#FFF8F0]/70 text-sm">
                    © {new Date().getFullYear()} travelMates. All rights reserved.
                </p>

                <div className="flex gap-6 text-sm">
                    <a href="/privacy" className="hover:text-white transition">
                        Privacy
                    </a>
                    <a href="/terms" className="hover:text-white transition">
                        Terms
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;