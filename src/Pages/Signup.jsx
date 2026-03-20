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
            className="h-screen flex items-center justify-center px-4 bg-cover bg-center relative overflow-hidden"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')"
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70"></div>

            {/* Card */}
            <div className="relative w-full max-w-5xl h-[90vh] bg-[#FFF8F0]/90 backdrop-blur-md rounded-2xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

                {/* LEFT PANEL */}
                <div className="text-[#5E0006] p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Join <span className="text-[#5E0006]">travelMates</span>
                    </h2>

                    <p className="text-sm opacity-80">
                        Discover travel, meet people, and share stories across the globe.
                    </p>

                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 bg-[#FFF8F0] border border-[#5E0006]/20 px-4 py-2 rounded-lg">
                            <Globe size={18} />
                            <span className="text-sm">Explore destinations</span>
                        </div>

                        <div className="flex items-center gap-3 bg-[#FFF8F0] border border-[#5E0006]/20 px-4 py-2 rounded-lg">
                            <UserCircle size={18} />
                            <span className="text-sm">Find travel buddies</span>
                        </div>

                        <div className="flex items-center gap-3 bg-[#FFF8F0] border border-[#5E0006]/20 px-4 py-2 rounded-lg">
                            <AlignLeft size={18} />
                            <span className="text-sm">Share blogs</span>
                        </div>
                    </div>
                </div>

                {/* FORM (SCROLL INSIDE ONLY IF NEEDED) */}
                <div className="p-8 overflow-y-auto">
                    <h3 className="text-xl font-bold text-[#5E0006] mb-4">
                        Create Account
                    </h3>

                    <form onSubmit={handleSubmit} className="space-y-3">

                        <Input icon={<User size={18} />} name="name" placeholder="Full Name" value={form.name} onChange={handleChange} />

                        <Input icon={<AtSign size={18} />} name="username" placeholder="Username" value={form.username} onChange={handleChange} />

                        <Input icon={<Mail size={18} />} name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} />

                        <Input icon={<Phone size={18} />} name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />

                        <Input icon={<Globe size={18} />} name="country" placeholder="Country" value={form.country} onChange={handleChange} />

                        <Input icon={<Lock size={18} />} name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />

                        <Input icon={<Lock size={18} />} name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} />

                        <button className="w-full bg-[#5E0006] text-[#FFF8F0] py-2.5 rounded-lg font-semibold hover:scale-105 transition">
                            Create Account
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-[#5E0006]/80">
                        Already have an account?{" "}
                        <Link to="/login" className="font-semibold hover:underline">
                            Login
                        </Link>
                    </p>

                    <p className="mt-4 text-center text-sm text-[#5E0006]/80">
                        Finding Home section? {" "}
                        <Link to="/" className="font-semibold hover:underline">
                            Back?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

/* 🔥 Reusable Input Component */
const Input = ({ icon, ...props }) => (
    <div className="relative">
        <div className="absolute top-3 left-3 text-[#5E0006]/60">
            {icon}
        </div>
        <input
            {...props}
            className="w-full pl-10 pr-4 py-2.5 border border-[#5E0006]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#5E0006] bg-[#FFF8F0]"
        />
    </div>
);

export default Signup;