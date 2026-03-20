import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(form);
    };

    return (
        <div
            className="h-[100vh] flex items-center justify-center bg-cover bg-center relative"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470')",
            }}
        >
            {/* Overlay */}
            <div className="h-[100vh] w-screen bg-[black]/70 flex justify-center items-center relative">

                {/* Home Button */}
                <Link
                    to="/"
                    className="absolute top-6 left-6 bg-[#FFF8F0] p-3 rounded-full shadow-md hover:scale-110 transition"
                >
                    <Home className="text-[#5E0006]" size={20} />
                </Link>

                {/* Login Card */}
                <div className="relative max-w-md w-full bg-[#FFF8F0] backdrop-blur-md rounded-2xl shadow-2xl p-10">

                    <h2 className="text-3xl font-bold text-[#5E0006] text-center">
                        Welcome Back
                    </h2>

                    <p className="text-center text-[#5E0006]/70 mt-2">
                        Login to your travelMates account
                    </p>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">

                        <div>
                            <label className="text-sm font-medium text-[#5E0006]">
                                Email
                            </label>

                            <input
                                type="email"
                                name="email"
                                required
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                className="w-full mt-2 px-4 py-3 rounded-lg border border-[#5E0006]/20 focus:ring-2 focus:ring-[#5E0006] outline-none"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium text-[#5E0006]">
                                Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                required
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full mt-2 px-4 py-3 rounded-lg border border-[#5E0006]/20 focus:ring-2 focus:ring-[#5E0006] outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#5E0006] text-[#FFF8F0] py-3 rounded-lg font-semibold hover:scale-105 transition"
                        >
                            Login
                        </button>
                    </form>

                    <p className="mt-6 text-center text-[#5E0006]/80">
                        Don't have an account?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold text-[#5E0006] hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>

                </div>
            </div>
        </div>
    );
};

export default Login;