import { useState, useRef } from "react";
import {
    Camera, Edit3, MapPin, Globe, Calendar, Star, BookOpen,
    Users, Heart, Award, Shield, Check, X, Plus, Trash2,
    Instagram, Twitter, Link2, ChevronRight, ThumbsUp,
    MessageCircle, Bookmark, Settings, LogOut, Bell,
    Lock, Eye, EyeOff, Save, Upload, Plane, Flag,
} from "lucide-react";

// ── Initial user data ─────────────────────────────────────────────────────────
const INITIAL_USER = {
    name: "Arjun Kulkarni",
    handle: "@arjun.travels",
    email: "arjun.kulkarni@gmail.com",
    phone: "+91 98765 43210",
    bio: "Solo traveler & photographer 📸 | 12 countries down, every other one to go. Chasing sunsets, street food and stories worth telling.",
    location: "Mumbai, India 🇮🇳",
    website: "arjuntravels.com",
    instagram: "@arjun.travels",
    twitter: "@arjunwanders",
    joined: "March 2024",
    coverGradient: "from-[#5a0e0e] via-[#7a1a1a] to-[#c0392b]",
    interests: ["Trekking", "Photography", "Street Food", "Culture", "Wildlife", "Budget Travel"],
    languages: ["English", "Hindi", "Marathi"],
    travelStyle: "Solo Backpacker",
};

const STATS = [
    { label: "Trips", value: 12 },
    { label: "Countries", value: 9 },
    { label: "Blogs", value: 7 },
    { label: "Reviews", value: 14 },
    { label: "Connections", value: 38 },
    { label: "Helpful votes", value: 203 },
];

const MY_BLOGS = [
    {
        id: 1, title: "Dawn at Arashiyama — Why You Must Wake Up at 4 AM",
        location: "Kyoto, Japan 🇯🇵", date: "2 weeks ago",
        image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80",
        likes: 142, comments: 38, category: "Culture Trail",
    },
    {
        id: 2, title: "Backpacking Patagonia on $50/day — Full Itinerary",
        location: "Patagonia, Argentina 🇦🇷", date: "1 month ago",
        image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
        likes: 203, comments: 55, category: "Trek Diary",
    },
    {
        id: 3, title: "48 Hours in Marrakech: The Honest Guide",
        location: "Marrakech, Morocco 🇲🇦", date: "2 months ago",
        image: "https://images.unsplash.com/photo-1597211684565-dca64d72bdfe?w=400&q=80",
        likes: 89, comments: 21, category: "Food Journey",
    },
];

const MY_REVIEWS = [
    {
        id: 1, destination: "Santorini, Greece 🇬🇷", rating: 5,
        title: "Most breathtaking place I've ever been",
        date: "3 days ago", helpful: 67, category: "Island Hopping",
    },
    {
        id: 2, destination: "Kyoto, Japan 🇯🇵", rating: 5,
        title: "A masterclass in serenity and culture",
        date: "3 weeks ago", helpful: 89, category: "Culture Trail",
    },
    {
        id: 3, destination: "Patagonia, Argentina 🇦🇷", rating: 4,
        title: "Brutal, beautiful, unforgettable",
        date: "1 month ago", helpful: 47, category: "Trek Diary",
    },
];

const CONNECTIONS = [
    { name: "Priya Sharma", handle: "@priyatravels", avatar: "PS", avatarBg: "from-rose-400 to-pink-600", location: "Santorini 🇬🇷", active: true },
    { name: "Rahul Kapoor", handle: "@rahul_onroad", avatar: "RK", avatarBg: "from-amber-400 to-orange-500", location: "Kyoto 🇯🇵", active: true },
    { name: "Ananya Mehta", handle: "@ananya.wanders", avatar: "AM", avatarBg: "from-teal-400 to-cyan-600", location: "Patagonia 🇦🇷", active: false },
    { name: "Vikram Nair", handle: "@vikram_nomad", avatar: "VN", avatarBg: "from-violet-400 to-purple-600", location: "Marrakech 🇲🇦", active: false },
    { name: "Sneha Iyer", handle: "@sneha.roams", avatar: "SI", avatarBg: "from-lime-400 to-green-600", location: "Lisbon 🇵🇹", active: true },
    { name: "Dev Malhotra", handle: "@devexplores", avatar: "DM", avatarBg: "from-sky-400 to-blue-600", location: "Reykjavik 🇮🇸", active: false },
];

const VISITED = [
    { name: "Japan", flag: "🇯🇵", year: 2025 },
    { name: "Greece", flag: "🇬🇷", year: 2025 },
    { name: "Morocco", flag: "🇲🇦", year: 2024 },
    { name: "Argentina", flag: "🇦🇷", year: 2024 },
    { name: "Indonesia", flag: "🇮🇩", year: 2024 },
    { name: "Portugal", flag: "🇵🇹", year: 2023 },
    { name: "Thailand", flag: "🇹🇭", year: 2023 },
    { name: "Sri Lanka", flag: "🇱🇰", year: 2022 },
    { name: "Nepal", flag: "🇳🇵", year: 2022 },
];

const INTERESTS_ALL = [
    "Trekking", "Photography", "Street Food", "Culture", "Wildlife",
    "Budget Travel", "Backpacking", "Road Trip", "Island Hopping",
    "Scuba Diving", "Camping", "City Break", "Nightlife", "Architecture",
];

const TRAVEL_STYLES = ["Solo Backpacker", "Budget Traveler", "Luxury Traveler", "Digital Nomad", "Adventure Seeker", "Cultural Explorer", "Family Traveler"];

const PRIVACY_SETTINGS = [
    { key: "shareLocation", label: "Show my location to companions", defaultOn: true },
    { key: "findByEmail", label: "Allow others to find me by email", defaultOn: false },
    { key: "showHistory", label: "Show travel history on profile", defaultOn: true },
    { key: "allowRequests", label: "Receive connection requests", defaultOn: true },
];

// ── Privacy Toggle Row (standalone component — no hooks in loops) ─────────────
function PrivacyToggle({ label, on, onToggle }) {
    return (
        <div className="flex items-center justify-between bg-[#fdf8f4] border border-[#f0e4db] rounded-xl px-4 py-3">
            <span className="text-sm text-[#1e0a0a]">{label}</span>
            <button
                onClick={onToggle}
                className={`w-11 h-6 rounded-full transition-all relative ${on ? "bg-[#7a1a1a]" : "bg-[#e8d5cc]"}`}
            >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${on ? "left-5" : "left-0.5"}`} />
            </button>
        </div>
    );
}

const TABS = ["Overview", "Blogs", "Reviews", "Connections", "Visited"];

// ── Star Row ──────────────────────────────────────────────────────────────────
const StarRow = ({ rating, size = 13 }) => (
    <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map(n => (
            <Star key={n} size={size} className={n <= rating ? "text-amber-400" : "text-gray-200"} fill={n <= rating ? "currentColor" : "none"} />
        ))}
    </div>
);

// ── Edit Profile Modal ────────────────────────────────────────────────────────
function EditProfileModal({ user, onSave, onClose }) {
    const [form, setForm] = useState({ ...user });
    const [activeSection, setSection] = useState("basic");
    const [showPass, setShowPass] = useState(false);
    const [newPass, setNewPass] = useState("");
    const [privacy, setPrivacy] = useState(() =>
        Object.fromEntries(PRIVACY_SETTINGS.map(s => [s.key, s.defaultOn]))
    );
    const togglePrivacy = (key) => setPrivacy(p => ({ ...p, [key]: !p[key] }));
    const avatarRef = useRef();

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    const toggleInterest = (i) => {
        const arr = form.interests.includes(i)
            ? form.interests.filter(x => x !== i)
            : [...form.interests, i];
        set("interests", arr);
    };

    const sections = [
        { id: "basic", label: "Basic Info", icon: Edit3 },
        { id: "contact", label: "Contact", icon: Globe },
        { id: "travel", label: "Travel Style", icon: Plane },
        { id: "security", label: "Security", icon: Lock },
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl flex overflow-hidden max-h-[90vh]">

                {/* Sidebar nav */}
                <div className="w-44 bg-[#fdf8f4] border-r border-[#f0e4db] flex flex-col p-3 gap-1 shrink-0">
                    <p className="text-[10px] font-bold text-[#9a7070] uppercase tracking-widest px-2 pt-1 pb-2">Edit Profile</p>
                    {sections.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setSection(id)}
                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${activeSection === id ? "bg-[#7a1a1a] text-white" : "text-[#5a3030] hover:bg-[#f0e4db]"}`}
                        >
                            <Icon size={15} /> {label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0e4db]">
                        <h3 className="font-bold text-[#1e0a0a] text-base">
                            {sections.find(s => s.id === activeSection)?.label}
                        </h3>
                        <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#f5ede8] text-[#9a7070] transition-colors">
                            <X size={18} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

                        {activeSection === "basic" && (
                            <>
                                {/* Avatar upload */}
                                <div className="flex items-center gap-5">
                                    <div className="relative group">
                                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e8a090] to-[#c0392b] flex items-center justify-center text-2xl font-bold text-white ring-4 ring-[#f0e4db]">
                                            {form.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                                        </div>
                                        <button
                                            onClick={() => avatarRef.current?.click()}
                                            className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                                        >
                                            <Camera size={20} className="text-white" />
                                        </button>
                                        <input ref={avatarRef} type="file" accept="image/*" className="hidden" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-[#1e0a0a]">Profile Photo</p>
                                        <p className="text-xs text-[#9a7070] mt-0.5">Hover and click to change · JPG, PNG</p>
                                        <button
                                            onClick={() => avatarRef.current?.click()}
                                            className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-[#7a1a1a] border border-[#e8d5cc] px-3 py-1.5 rounded-lg hover:bg-[#fdf8f4] transition-colors"
                                        >
                                            <Upload size={12} /> Upload photo
                                        </button>
                                    </div>
                                </div>

                                {[
                                    { key: "name", label: "Full Name", placeholder: "Your full name" },
                                    { key: "handle", label: "Username", placeholder: "@yourusername" },
                                    { key: "location", label: "Home City", placeholder: "City, Country" },
                                ].map(({ key, label, placeholder }) => (
                                    <div key={key}>
                                        <label className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide mb-1.5 block">{label}</label>
                                        <input
                                            className="w-full bg-[#fdf8f4] border border-[#e8d5cc] rounded-xl px-4 py-2.5 text-sm text-[#1e0a0a] outline-none focus:border-[#7a1a1a] focus:ring-2 focus:ring-[#7a1a1a]/10 transition-all placeholder:text-[#b09090]"
                                            value={form[key]}
                                            onChange={e => set(key, e.target.value)}
                                            placeholder={placeholder}
                                        />
                                    </div>
                                ))}

                                <div>
                                    <label className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide mb-1.5 block">Bio</label>
                                    <textarea
                                        rows={4}
                                        maxLength={200}
                                        className="w-full bg-[#fdf8f4] border border-[#e8d5cc] rounded-xl px-4 py-2.5 text-sm text-[#1e0a0a] outline-none focus:border-[#7a1a1a] focus:ring-2 focus:ring-[#7a1a1a]/10 resize-none transition-all placeholder:text-[#b09090] leading-relaxed"
                                        value={form.bio}
                                        onChange={e => set("bio", e.target.value)}
                                        placeholder="Tell the travelMates community about yourself…"
                                    />
                                    <p className="text-right text-[10px] text-[#b09090] mt-1">{form.bio.length}/200</p>
                                </div>

                                {/* Languages */}
                                <div>
                                    <label className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide mb-1.5 block">Languages</label>
                                    <div className="flex flex-wrap gap-2">
                                        {form.languages.map(l => (
                                            <span key={l} className="flex items-center gap-1.5 text-xs bg-[#fdf8f4] border border-[#e8d5cc] text-[#5a3030] px-3 py-1.5 rounded-full font-medium">
                                                {l}
                                                <button onClick={() => set("languages", form.languages.filter(x => x !== l))}>
                                                    <X size={11} className="text-[#9a7070] hover:text-rose-500" />
                                                </button>
                                            </span>
                                        ))}
                                        <button className="flex items-center gap-1 text-xs text-[#7a1a1a] border border-dashed border-[#c0857a] px-3 py-1.5 rounded-full hover:bg-[#fdf8f4] transition-colors">
                                            <Plus size={11} /> Add
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeSection === "contact" && (
                            <>
                                {[
                                    { key: "email", label: "Email", icon: Globe, placeholder: "your@email.com" },
                                    { key: "phone", label: "Phone", icon: Globe, placeholder: "+91 00000 00000" },
                                    { key: "website", label: "Website", icon: Link2, placeholder: "yoursite.com" },
                                    { key: "instagram", label: "Instagram", icon: Instagram, placeholder: "@handle" },
                                    { key: "twitter", label: "Twitter / X", icon: Twitter, placeholder: "@handle" },
                                ].map(({ key, label, icon: Icon, placeholder }) => (
                                    <div key={key}>
                                        <label className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide mb-1.5 block">{label}</label>
                                        <div className="flex items-center gap-2 bg-[#fdf8f4] border border-[#e8d5cc] rounded-xl px-4 py-2.5 focus-within:border-[#7a1a1a] focus-within:ring-2 focus-within:ring-[#7a1a1a]/10 transition-all">
                                            <Icon size={14} className="text-[#c0857a] shrink-0" />
                                            <input
                                                className="flex-1 bg-transparent outline-none text-sm text-[#1e0a0a] placeholder:text-[#b09090]"
                                                value={form[key] || ""}
                                                onChange={e => set(key, e.target.value)}
                                                placeholder={placeholder}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </>
                        )}

                        {activeSection === "travel" && (
                            <>
                                <div>
                                    <label className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide mb-2 block">Travel Style</label>
                                    <div className="flex flex-wrap gap-2">
                                        {TRAVEL_STYLES.map(s => (
                                            <button
                                                key={s}
                                                onClick={() => set("travelStyle", s)}
                                                className={`text-xs px-3.5 py-2 rounded-xl border font-medium transition-all ${form.travelStyle === s ? "bg-[#7a1a1a] text-white border-[#7a1a1a]" : "bg-[#fdf8f4] text-[#5a3030] border-[#e8d5cc] hover:border-[#c0857a]"}`}
                                            >
                                                {s}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide mb-2 block">
                                        Interests <span className="font-normal normal-case text-[#b09090]">({form.interests.length} selected)</span>
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {INTERESTS_ALL.map(i => (
                                            <button
                                                key={i}
                                                onClick={() => toggleInterest(i)}
                                                className={`text-xs px-3.5 py-1.5 rounded-full border font-medium transition-all ${form.interests.includes(i) ? "bg-[#7a1a1a] text-white border-[#7a1a1a]" : "bg-[#fdf8f4] text-[#5a3030] border-[#e8d5cc] hover:border-[#c0857a]"}`}
                                            >
                                                {form.interests.includes(i) && <Check size={10} className="inline mr-1" />}
                                                {i}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {activeSection === "security" && (
                            <>
                                <div>
                                    <label className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide mb-1.5 block">New Password</label>
                                    <div className="flex items-center gap-2 bg-[#fdf8f4] border border-[#e8d5cc] rounded-xl px-4 py-2.5 focus-within:border-[#7a1a1a] focus-within:ring-2 focus-within:ring-[#7a1a1a]/10 transition-all">
                                        <Lock size={14} className="text-[#c0857a] shrink-0" />
                                        <input
                                            type={showPass ? "text" : "password"}
                                            className="flex-1 bg-transparent outline-none text-sm text-[#1e0a0a] placeholder:text-[#b09090]"
                                            placeholder="Enter new password"
                                            value={newPass}
                                            onChange={e => setNewPass(e.target.value)}
                                        />
                                        <button onClick={() => setShowPass(s => !s)} className="text-[#9a7070]">
                                            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide">Privacy Settings</p>
                                    {PRIVACY_SETTINGS.map(({ key, label }) => (
                                        <PrivacyToggle
                                            key={key}
                                            label={label}
                                            on={privacy[key]}
                                            onToggle={() => togglePrivacy(key)}
                                        />
                                    ))}
                                </div>

                                <div className="bg-rose-50 border border-rose-100 rounded-xl p-4">
                                    <p className="text-xs font-bold text-rose-600 mb-1">Danger Zone</p>
                                    <p className="text-xs text-rose-500 mb-3">These actions are irreversible. Please proceed carefully.</p>
                                    <button className="text-xs font-semibold text-rose-600 border border-rose-200 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors">
                                        Delete Account
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[#f0e4db] bg-white">
                        <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-[#9a7070] hover:text-[#5a3030] transition-colors">
                            Cancel
                        </button>
                        <button
                            onClick={() => { onSave(form); onClose(); }}
                            className="flex items-center gap-2 bg-[#7a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5a0e0e] transition-all shadow-md active:scale-95"
                        >
                            <Save size={15} /> Save Changes
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Main UserProfile Component ────────────────────────────────────────────────
export default function UserProfile() {
    const [user, setUser] = useState(INITIAL_USER);
    const [activeTab, setTab] = useState("Overview");
    const [showEdit, setEdit] = useState(false);
    const [toast, setToast] = useState(false);

    const handleSave = (updated) => {
        setUser(updated);
        setToast(true);
        setTimeout(() => setToast(false), 3000);
    };

    return (
        <div className="max-w-4xl mx-auto">

            {/* ── Save toast ── */}
            {toast && (
                <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-[#1e0a0a] text-white px-5 py-3 rounded-2xl shadow-2xl text-sm font-medium animate-slide-in">
                    <Check size={16} className="text-green-400" /> Profile updated successfully!
                </div>
            )}

            {/* ── Cover + Avatar ── */}
            <div className="relative mb-16">
                {/* Cover */}
                <div className={`h-44 rounded-2xl bg-gradient-to-r ${user.coverGradient} relative overflow-hidden`}>
                    {/* decorative texture */}
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 50%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
                    />
                    <button className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/25 hover:bg-black/40 text-white text-xs font-medium px-3 py-1.5 rounded-lg backdrop-blur-sm transition-colors">
                        <Camera size={12} /> Change cover
                    </button>
                </div>

                {/* Avatar */}
                <div className="absolute -bottom-12 left-6 group">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#e8a090] to-[#c0392b] flex items-center justify-center text-2xl font-bold text-white ring-4 ring-white shadow-xl">
                        {user.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                    </div>
                    <button
                        onClick={() => setEdit(true)}
                        className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                    >
                        <Camera size={20} className="text-white" />
                    </button>
                </div>

                {/* Top-right actions */}
                <div className="absolute -bottom-10 right-0 flex items-center gap-2">
                    <button
                        onClick={() => setEdit(true)}
                        className="flex items-center gap-2 bg-white border border-[#e8d5cc] text-[#5a3030] px-4 py-2 rounded-xl text-sm font-semibold hover:bg-[#fdf8f4] hover:border-[#c0857a] transition-all shadow-sm"
                    >
                        <Edit3 size={14} /> Edit Profile
                    </button>
                    <button className="p-2 bg-white border border-[#e8d5cc] rounded-xl hover:bg-[#fdf8f4] text-[#9a7070] transition-all shadow-sm">
                        <Settings size={16} />
                    </button>
                </div>
            </div>

            {/* ── Name + bio ── */}
            <div className="px-1 mb-5">
                <div className="flex items-start gap-2 flex-wrap">
                    <h1 className="text-2xl font-bold text-[#1e0a0a]">{user.name}</h1>
                    <Shield size={18} className="text-[#7a1a1a] mt-1.5 shrink-0" />
                    <span className="ml-1 mt-1 text-xs font-bold bg-gradient-to-r from-[#7a1a1a] to-[#c0392b] text-white px-2.5 py-1 rounded-full">
                        {user.travelStyle}
                    </span>
                </div>
                <p className="text-sm text-[#9a7070] mb-1.5">{user.handle}</p>
                <p className="text-sm text-[#5a3030] leading-relaxed max-w-xl">{user.bio}</p>

                <div className="flex items-center gap-4 mt-3 flex-wrap text-xs text-[#9a7070]">
                    <span className="flex items-center gap-1.5"><MapPin size={12} className="text-[#c0857a]" /> {user.location}</span>
                    <span className="flex items-center gap-1.5"><Globe size={12} className="text-[#c0857a]" /> {user.website}</span>
                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-[#c0857a]" /> Joined {user.joined}</span>
                </div>

                <div className="flex gap-2 mt-3 flex-wrap">
                    {user.interests.map(i => (
                        <span key={i} className="text-[11px] font-medium bg-[#fdf8f4] border border-[#e8d5cc] text-[#7a1a1a] px-2.5 py-1 rounded-full">{i}</span>
                    ))}
                </div>
            </div>

            {/* ── Stats strip ── */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
                {STATS.map(({ label, value }) => (
                    <div key={label} className="bg-white rounded-2xl border border-[#f0e4db] p-3 text-center shadow-sm hover:shadow-md transition-shadow">
                        <p className="text-xl font-black text-[#7a1a1a]">{value}</p>
                        <p className="text-[10px] text-[#9a7070] font-medium mt-0.5">{label}</p>
                    </div>
                ))}
            </div>

            {/* ── Tabs ── */}
            <div className="flex items-center gap-1 bg-[#f5ede8] rounded-2xl p-1 mb-6 overflow-x-auto">
                {TABS.map(tab => (
                    <button
                        key={tab}
                        onClick={() => setTab(tab)}
                        className={`flex-1 shrink-0 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${activeTab === tab ? "bg-white text-[#7a1a1a] shadow-sm" : "text-[#9a7070] hover:text-[#5a3030]"}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* ══════════ OVERVIEW ══════════ */}
            {activeTab === "Overview" && (
                <div className="space-y-6">
                    {/* Countries visited */}
                    <div className="bg-white rounded-2xl border border-[#f0e4db] p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-[#1e0a0a] flex items-center gap-2"><Flag size={16} className="text-[#7a1a1a]" /> Countries Visited</h3>
                            <span className="text-xs font-semibold text-[#9a7070] bg-[#f5ede8] px-2.5 py-1 rounded-full">{VISITED.length} countries</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {VISITED.map(c => (
                                <div key={c.name} className="flex items-center gap-1.5 bg-[#fdf8f4] border border-[#f0e4db] px-3 py-1.5 rounded-xl">
                                    <span className="text-base">{c.flag}</span>
                                    <span className="text-xs font-semibold text-[#1e0a0a]">{c.name}</span>
                                    <span className="text-[10px] text-[#b09090]">{c.year}</span>
                                </div>
                            ))}
                            <button
                                className="flex items-center gap-1.5 border-2 border-dashed border-[#e8d5cc] text-[#9a7070] hover:border-[#c0857a] hover:text-[#7a1a1a] px-3 py-1.5 rounded-xl text-xs font-medium transition-colors"
                                onClick={() => setEdit(true)}
                            >
                                <Plus size={13} /> Add country
                            </button>
                        </div>
                    </div>

                    {/* Recent activity: latest blog + review */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-white rounded-2xl border border-[#f0e4db] p-4 shadow-sm">
                            <p className="text-xs font-bold text-[#9a7070] uppercase tracking-wide mb-3 flex items-center gap-1.5"><BookOpen size={13} /> Latest Blog</p>
                            <div className="relative rounded-xl overflow-hidden">
                                <img src={MY_BLOGS[0].image} alt="" className="w-full h-28 object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <p className="absolute bottom-2 left-3 right-3 text-white text-xs font-semibold leading-snug">{MY_BLOGS[0].title}</p>
                            </div>
                            <div className="flex items-center gap-3 mt-2.5 text-xs text-[#9a7070]">
                                <span className="flex items-center gap-1"><Heart size={11} /> {MY_BLOGS[0].likes}</span>
                                <span className="flex items-center gap-1"><MessageCircle size={11} /> {MY_BLOGS[0].comments}</span>
                                <span className="ml-auto text-[#b09090]">{MY_BLOGS[0].date}</span>
                            </div>
                        </div>
                        <div className="bg-white rounded-2xl border border-[#f0e4db] p-4 shadow-sm">
                            <p className="text-xs font-bold text-[#9a7070] uppercase tracking-wide mb-3 flex items-center gap-1.5"><Star size={13} /> Latest Review</p>
                            <div className="space-y-2">
                                <p className="text-sm font-bold text-[#1e0a0a] leading-snug">{MY_REVIEWS[0].title}</p>
                                <StarRow rating={MY_REVIEWS[0].rating} />
                                <p className="text-xs text-[#9a7070] flex items-center gap-1"><MapPin size={10} className="text-[#c0857a]" />{MY_REVIEWS[0].destination}</p>
                                <div className="flex items-center gap-2 text-xs text-[#9a7070]">
                                    <ThumbsUp size={11} /> {MY_REVIEWS[0].helpful} helpful
                                    <span className="ml-auto text-[#b09090]">{MY_REVIEWS[0].date}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="bg-white rounded-2xl border border-[#f0e4db] p-5 shadow-sm">
                        <h3 className="font-bold text-[#1e0a0a] mb-4 flex items-center gap-2"><Award size={16} className="text-amber-500" /> Travel Badges</h3>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                            {[
                                { emoji: "✈️", label: "First Flight", earned: true },
                                { emoji: "🌍", label: "Globe Trotter", earned: true },
                                { emoji: "📸", label: "Photographer", earned: true },
                                { emoji: "🏔️", label: "Summit Seeker", earned: true },
                                { emoji: "🍜", label: "Food Explorer", earned: true },
                                { emoji: "🤝", label: "Connector", earned: false },
                                { emoji: "⭐", label: "Top Reviewer", earned: false },
                                { emoji: "🔥", label: "Trendsetter", earned: false },
                                { emoji: "🛡️", label: "Verified Pro", earned: false },
                            ].map(({ emoji, label, earned }) => (
                                <div key={label} className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-center transition-all ${earned ? "border-[#f0e4db] bg-[#fdf8f4]" : "border-dashed border-[#e8d5cc] opacity-40"}`}>
                                    <span className="text-2xl">{emoji}</span>
                                    <span className="text-[9px] font-semibold text-[#5a3030] leading-tight">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ══════════ BLOGS ══════════ */}
            {activeTab === "Blogs" && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-[#9a7070] font-medium">{MY_BLOGS.length} posts published</p>
                        <button className="flex items-center gap-1.5 bg-[#7a1a1a] text-white text-xs font-semibold px-4 py-2 rounded-xl hover:bg-[#5a0e0e] transition-colors shadow-sm">
                            <Plus size={14} /> New Blog
                        </button>
                    </div>
                    {MY_BLOGS.map(blog => (
                        <div key={blog.id} className="bg-white rounded-2xl border border-[#f0e4db] overflow-hidden shadow-sm hover:shadow-md transition-shadow flex">
                            <img src={blog.image} alt="" className="w-32 sm:w-48 object-cover shrink-0" />
                            <div className="flex-1 p-4 flex flex-col justify-between min-w-0">
                                <div>
                                    <span className="text-[10px] font-semibold bg-[#fdf8f4] border border-[#e8d5cc] text-[#7a1a1a] px-2 py-0.5 rounded-full">{blog.category}</span>
                                    <p className="text-sm font-bold text-[#1e0a0a] mt-2 leading-snug">{blog.title}</p>
                                    <p className="text-xs text-[#9a7070] mt-1 flex items-center gap-1"><MapPin size={10} className="text-[#c0857a]" />{blog.location}</p>
                                </div>
                                <div className="flex items-center gap-3 mt-3">
                                    <span className="flex items-center gap-1 text-xs text-[#9a7070]"><Heart size={11} /> {blog.likes}</span>
                                    <span className="flex items-center gap-1 text-xs text-[#9a7070]"><MessageCircle size={11} /> {blog.comments}</span>
                                    <span className="text-xs text-[#b09090] ml-auto">{blog.date}</span>
                                    <button className="p-1.5 rounded-lg hover:bg-[#f5ede8] text-[#9a7070] transition-colors"><Edit3 size={13} /></button>
                                    <button className="p-1.5 rounded-lg hover:bg-rose-50 text-[#9a7070] hover:text-rose-500 transition-colors"><Trash2 size={13} /></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ══════════ REVIEWS ══════════ */}
            {activeTab === "Reviews" && (
                <div className="space-y-4">
                    <p className="text-sm text-[#9a7070] font-medium">{MY_REVIEWS.length} reviews written</p>
                    {MY_REVIEWS.map(review => (
                        <div key={review.id} className="bg-white rounded-2xl border border-[#f0e4db] p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                                        <StarRow rating={review.rating} />
                                        <span className="text-[10px] font-semibold bg-[#fdf8f4] border border-[#e8d5cc] text-[#7a1a1a] px-2 py-0.5 rounded-full">{review.category}</span>
                                    </div>
                                    <p className="text-sm font-bold text-[#1e0a0a]">{review.title}</p>
                                    <p className="text-xs text-[#9a7070] mt-1 flex items-center gap-1"><MapPin size={10} className="text-[#c0857a]" />{review.destination}</p>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <button className="p-1.5 rounded-lg hover:bg-[#f5ede8] text-[#9a7070] transition-colors"><Edit3 size={14} /></button>
                                    <button className="p-1.5 rounded-lg hover:bg-rose-50 text-[#9a7070] hover:text-rose-500 transition-colors"><Trash2 size={14} /></button>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mt-3 pt-3 border-t border-[#f5ede8] text-xs text-[#9a7070]">
                                <span className="flex items-center gap-1"><ThumbsUp size={11} /> {review.helpful} helpful</span>
                                <span className="ml-auto">{review.date}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* ══════════ CONNECTIONS ══════════ */}
            {activeTab === "Connections" && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-[#9a7070] font-medium">{CONNECTIONS.length} connections</p>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-3">
                        {CONNECTIONS.map(c => (
                            <div key={c.handle} className="bg-white rounded-2xl border border-[#f0e4db] p-4 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow">
                                <div className="relative shrink-0">
                                    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${c.avatarBg} flex items-center justify-center text-sm font-bold text-white ring-2 ring-white shadow`}>
                                        {c.avatar}
                                    </div>
                                    {c.active && <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-[#1e0a0a] truncate">{c.name}</p>
                                    <p className="text-xs text-[#9a7070] truncate">{c.handle}</p>
                                    <p className="text-xs text-[#c0857a] flex items-center gap-1 mt-0.5"><MapPin size={9} />{c.location}</p>
                                </div>
                                <div className="flex items-center gap-1.5 shrink-0">
                                    <button className="p-2 rounded-xl border border-[#e8d5cc] hover:bg-[#fdf8f4] text-[#9a7070] transition-colors">
                                        <MessageCircle size={15} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ══════════ VISITED ══════════ */}
            {activeTab === "Visited" && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-[#9a7070] font-medium">{VISITED.length} countries visited</p>
                        <button onClick={() => setEdit(true)} className="flex items-center gap-1.5 text-xs font-semibold text-[#7a1a1a] border border-[#e8d5cc] px-3 py-1.5 rounded-xl hover:bg-[#fdf8f4] transition-colors">
                            <Plus size={13} /> Add country
                        </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {VISITED.map(c => (
                            <div key={c.name} className="bg-white rounded-2xl border border-[#f0e4db] p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow group">
                                <span className="text-3xl">{c.flag}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-[#1e0a0a]">{c.name}</p>
                                    <p className="text-xs text-[#9a7070]">Visited {c.year}</p>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-rose-50 text-rose-400 transition-all">
                                    <Trash2 size={13} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Edit modal */}
            {showEdit && (
                <EditProfileModal user={user} onSave={handleSave} onClose={() => setEdit(false)} />
            )}

            <style>{`
        @keyframes slide-in {
          from { opacity:0; transform:translateY(-12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .animate-slide-in { animation: slide-in 0.3s ease; }
      `}</style>
        </div>
    );
}