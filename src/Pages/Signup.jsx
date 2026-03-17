import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    User,
    AtSign,
    Mail,
    Phone,
    Globe,
    Lock,
    UserCircle,
    AlignLeft
} from "lucide-react";

const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        country: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-6 py-12 bg-cover bg-center relative overflow-hidden"
            style={{
                backgroundImage:
                    "url('https://plus.unsplash.com/premium_photo-1687653079484-12a596ddf7a9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            }}
        >
            <div className="absolute inset-0 bg-[rgba(0,0,0,0.5)]/80"></div>

            <div className="relative w-full max-w-5xl bg-[#FFF8F0]/85 backdrop-blur-md rounded-2xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

                {/* Left Panel */}
                {/* Left Panel */}
                <div className="text-[#5E0006] p-10 flex flex-col justify-center relative">

                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-[#5E0006]/10 rounded-full blur-2xl"></div>
                    <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-[#5E0006]/10 rounded-full blur-2xl"></div>

                    <h2 className="text-4xl font-extrabold mb-4 tracking-tight">
                        Join <span className="text-[#5E0006]">travelMates</span>
                    </h2>

                    <p className="text-[#5E0006]/80 leading-relaxed text-sm">
                        Discover the joy of solo travel while staying connected. Find companions,
                        plan unforgettable journeys, and share stories from around the world.
                    </p>

                    <div className="mt-8 space-y-4">

                        <div className="flex items-center gap-3 bg-[#FFF8F0] border border-[#5E0006]/15 px-4 py-3 rounded-xl hover:scale-[1.02] transition shadow-sm">
                            <Globe size={20} className="text-[#5E0006]" />
                            <span className="text-sm font-medium">Discover breathtaking destinations</span>
                        </div>

                        <div className="flex items-center gap-3 bg-[#FFF8F0] border border-[#5E0006]/15 px-4 py-3 rounded-xl hover:scale-[1.02] transition shadow-sm">
                            <UserCircle size={20} className="text-[#5E0006]" />
                            <span className="text-sm font-medium">Meet like-minded travel companions</span>
                        </div>

                        <div className="flex items-center gap-3 bg-[#FFF8F0] border border-[#5E0006]/15 px-4 py-3 rounded-xl hover:scale-[1.02] transition shadow-sm">
                            <AlignLeft size={20} className="text-[#5E0006]" />
                            <span className="text-sm font-medium">Share immersive travel blogs</span>
                        </div>

                        <div className="flex items-center gap-3 bg-[#FFF8F0] border border-[#5E0006]/15 px-4 py-3 rounded-xl hover:scale-[1.02] transition shadow-sm">
                            <User size={20} className="text-[#5E0006]" />
                            <span className="text-sm font-medium">Build your global traveler profile</span>
                        </div>

                    </div>
                </div>

                {/* Form */}
                <div className="p-10 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-[#5E0006] mb-6">
                        Create Your Account
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div className="relative">
                            <User className="absolute top-3.5 left-3 text-[#5E0006]/60" size={18} />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                required
                                value={form.name}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 border border-[#5E0006]/30 rounded-lg outline-none focus:ring-2 focus:ring-[#5E0006] bg-[#FFF8F0]"
                            />
                        </div>

                        <div className="relative">
                            <AtSign className="absolute top-3.5 left-3 text-[#5E0006]/60" size={18} />
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                required
                                value={form.username}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 border border-[#5E0006]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#5E0006] bg-[#FFF8F0]"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="absolute top-3.5 left-3 text-[#5E0006]/60" size={18} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                required
                                value={form.email}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 border border-[#5E0006]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#5E0006] bg-[#FFF8F0]"
                            />
                        </div>

                        <div className="relative">
                            <Phone className="absolute top-3.5 left-3 text-[#5E0006]/60" size={18} />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone Number"
                                value={form.phone}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 border border-[#5E0006]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#5E0006] bg-[#FFF8F0]"
                            />
                        </div>

                        <div className="relative">
                            <Globe className="absolute top-3.5 left-3 text-[#5E0006]/60" size={18} />
                            <input
                                type="text"
                                name="country"
                                placeholder="Country"
                                value={form.country}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 border border-[#5E0006]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#5E0006] bg-[#FFF8F0]"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute top-3.5 left-3 text-[#5E0006]/60" size={18} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 border border-[#5E0006]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#5E0006] bg-[#FFF8F0]"
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute top-3.5 left-3 text-[#5E0006]/60" size={18} />
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                required
                                value={form.confirmPassword}
                                onChange={handleChange}
                                className="w-full pl-10 pr-4 py-2.5 border border-[#5E0006]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#5E0006] bg-[#FFF8F0]"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#5E0006] text-[#FFF8F0] py-2.5 rounded-lg font-semibold hover:scale-105 transition"
                        >
                            Create Account
                        </button>
                    </form>

                    <p className="mt-5 text-center text-[#5E0006]/80">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;