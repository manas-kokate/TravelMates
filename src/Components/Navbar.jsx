import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Compass, Map, Users, MessageCircle, BookOpen, User } from "lucide-react";
import { Link } from 'react-router-dom'

const Navbar = ({ user }) => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/", icon: Compass },
        { name: "Discover", href: "/discover", icon: Map },
        { name: "Travel Blogs", href: "/blogs", icon: BookOpen },
        { name: "Find Companions", href: "/companions", icon: Users },
        { name: "Messages", href: "/chat", icon: MessageCircle },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-[#FFF8F0]/90 backdrop-blur-lg shadow-md"
                : "bg-[#FFF8F0]"
                }`}
            aria-label="Main Navigation"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className="flex items-center justify-between h-16">

                    {/* Logo */}
                    <motion.a
                        href="/"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                    >
                        <Compass className="text-[#5E0006] w-7 h-7" />
                        <span className="text-xl font-semibold text-[#5E0006] tracking-wide">
                            TravelMates
                        </span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link, i) => {
                            const Icon = link.icon;
                            return (
                                <motion.a
                                    key={i}
                                    href={link.href}
                                    whileHover={{ y: -2 }}
                                    className="flex items-center gap-1 text-[#5E0006] font-medium hover:opacity-80 transition"
                                >
                                    <Icon size={16} />
                                    {link.name}
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* Auth Section */}
                    <div className="hidden lg:flex items-center gap-4">
                        {user ? (
                            <motion.a
                                href="/profile"
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 bg-[#5E0006]/10 px-3 py-1.5 rounded-full border border-[#5E0006]/20"
                            >
                                <img
                                    src={user?.avatar || "https://i.pravatar.cc/40"}
                                    alt="profile"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <span className="text-sm text-[#5E0006]">
                                    {user?.name || "Profile"}
                                </span>
                            </motion.a>
                        ) : (
                            <>
                                <a
                                    href="/login"
                                    className="text-[#5E0006] font-medium hover:opacity-80 transition"
                                >
                                    Login
                                </a>
                                <a
                                    href="/register"
                                    className="bg-[#5E0006] text-[#FFF8F0] px-4 py-1.5 rounded-full font-medium shadow hover:scale-105 transition-all duration-300"
                                >
                                    Sign Up
                                </a>
                            </>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        aria-label="Toggle menu"
                        onClick={() => setOpen(!open)}
                        className="lg:hidden text-[#5E0006]"
                    >
                        {open ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:hidden bg-[#FFF8F0] border-t border-[#5E0006]/10"
                >
                    <div className="flex flex-col px-6 py-6 gap-5">

                        {navLinks.map((link, i) => {
                            const Icon = link.icon;
                            return (
                                <a
                                    key={i}
                                    href={link.href}
                                    className="flex items-center gap-2 text-[#5E0006] font-medium"
                                >
                                    <Icon size={18} />
                                    {link.name}
                                </a>
                            );
                        })}

                        {!user && (
                            <div className="flex flex-col gap-3 pt-4 border-t border-[#5E0006]/10">
                                <a
                                    href="/login"
                                    className="text-[#5E0006] font-medium"
                                >
                                    Login
                                </a>
                                <a
                                    href="/register"
                                    className="bg-[#5E0006] text-[#FFF8F0] px-4 py-2 rounded-full text-center font-medium"
                                >
                                    Sign Up
                                </a>
                            </div>
                        )}

                        {user && (
                            <a
                                href="/profile"
                                className="flex items-center gap-2 pt-4 border-t border-[#5E0006]/10 text-[#5E0006]"
                            >
                                <User size={18} />
                                My Profile
                            </a>
                        )}
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;