import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AtSign, Mail, Lock, Globe } from "lucide-react";
import { registerUser } from "../api/auth.api.js";
import { toast } from "react-toastify";

const Signup = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        interests: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 🔥 Validation
        if (!form.username || !form.email || !form.password || !form.location) {
            toast.warning("Please fill all required fields");
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.warning("Passwords do not match");
            return;
        }

        try {
            setLoading(true);

            const payload = {
                username: form.username,
                email: form.email,
                password: form.password,
                location: form.location,
                interests: form.interests
                    ? form.interests.split(",").map((i) => i.trim())
                    : []
            };

            const res = await registerUser(payload);
            if (res.data.status !== 201) {
                console.log(res);
                toast.error(res.data.message);
                return;
            }

            toast.success(res.data.message);
            navigate("/login");

        } catch (err) {
            console.error(err);

            toast.error(
                err?.response?.data?.message ||
                err?.message ||
                "Registration failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF3E6] px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-center text-[#5E0006]">
                    Create Account
                </h2>

                <Input
                    icon={<AtSign size={18} />}
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />

                <Input
                    icon={<Mail size={18} />}
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                />

                <Input
                    icon={<Lock size={18} />}
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                />

                <Input
                    icon={<Lock size={18} />}
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                />

                <Input
                    icon={<Globe size={18} />}
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                />

                <Input
                    name="interests"
                    placeholder="Interests (e.g. coding, music, sports)"
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#5E0006] text-white py-2.5 rounded-lg hover:bg-[#7a0008] transition disabled:opacity-50"
                >
                    {loading ? "Registering..." : "Sign Up"}
                </button>

                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#5E0006] font-semibold">
                        Login
                    </Link>
                </p>
            </form>
        </div>
    );
};

/* 🔥 Reusable Input Component */
const Input = ({ icon, ...props }) => (
    <div className="relative">
        {icon && (
            <div className="absolute top-3 left-3 text-[#5E0006]/60">
                {icon}
            </div>
        )}
        <input
            {...props}
            required
            className="w-full pl-10 pr-4 py-2.5 border border-[#5E0006]/20 rounded-lg outline-none focus:ring-2 focus:ring-[#5E0006] bg-[#FFF8F0]"
        />
    </div>
);

export default Signup;