import { useState, useRef, useCallback } from "react";
import {
    ImagePlus, MapPin, Tag, Type, AlignLeft, X, ChevronDown,
    Eye, Send, Save, Plus, GripVertical, Smile, Bold, Italic,
    List, Link2, Quote, Search, CheckCircle2, Globe, Lock,
    Users, Compass, UploadCloud, Trash2, Star,
} from "lucide-react";

// ── Constants ─────────────────────────────────────────────────────────────────
const CATEGORIES = [
    { label: "Trek Diary", emoji: "🏔️" },
    { label: "Food Journey", emoji: "🍜" },
    { label: "Culture Trail", emoji: "🏛️" },
    { label: "Island Hopping", emoji: "🏝️" },
    { label: "Road Trip", emoji: "🚗" },
    { label: "City Break", emoji: "🌆" },
    { label: "Wildlife", emoji: "🦁" },
    { label: "Budget Travel", emoji: "💸" },
];

const VISIBILITY_OPTIONS = [
    { id: "public", icon: Globe, label: "Public", desc: "Anyone on travelMates" },
    { id: "companions", icon: Users, label: "Companions", desc: "Only your companions" },
    { id: "private", icon: Lock, label: "Private", desc: "Only you" },
];

const MOODS = ["🌟 Thrilled", "😌 Peaceful", "😤 Challenging", "🥹 Emotional", "🤩 Awestruck", "😂 Hilarious"];

const SUGGESTED_LOCATIONS = [
    "Santorini, Greece 🇬🇷",
    "Kyoto, Japan 🇯🇵",
    "Patagonia, Argentina 🇦🇷",
    "Marrakech, Morocco 🇲🇦",
    "Bali, Indonesia 🇮🇩",
    "Reykjavik, Iceland 🇮🇸",
    "Lisbon, Portugal 🇵🇹",
    "Cape Town, South Africa 🇿🇦",
];

// ── Image Upload Zone ─────────────────────────────────────────────────────────
function ImageUploadZone({ images, onAdd, onRemove, onSetCover, coverIdx }) {
    const inputRef = useRef();
    const [dragging, setDragging] = useState(false);

    const handleFiles = (files) => {
        Array.from(files).forEach((file) => {
            if (!file.type.startsWith("image/")) return;
            const url = URL.createObjectURL(file);
            onAdd({ url, name: file.name, size: file.size });
        });
    };

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setDragging(false);
        handleFiles(e.dataTransfer.files);
    }, []);

    return (
        <div className="space-y-3">
            {/* Upload zone */}
            <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={onDrop}
                onClick={() => inputRef.current?.click()}
                className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-200 py-10
          ${dragging
                        ? "border-[#7a1a1a] bg-[#fdf8f4] scale-[1.01]"
                        : "border-[#e8d5cc] bg-[#fdf8f4] hover:border-[#c0857a] hover:bg-white"}`}
            >
                <div className="w-12 h-12 rounded-2xl bg-[#f0e4db] flex items-center justify-center">
                    <UploadCloud size={22} className="text-[#7a1a1a]" />
                </div>
                <div className="text-center">
                    <p className="text-sm font-semibold text-[#1e0a0a]">
                        {dragging ? "Drop images here" : "Upload travel photos"}
                    </p>
                    <p className="text-xs text-[#9a7070] mt-0.5">Drag & drop or click · PNG, JPG, WEBP</p>
                </div>
                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />
            </div>

            {/* Image thumbnails */}
            {images.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                    {images.map((img, i) => (
                        <div
                            key={i}
                            className="relative group rounded-xl overflow-hidden aspect-square bg-[#f0e4db] cursor-pointer"
                            onClick={() => onSetCover(i)}
                        >
                            <img src={img.url} alt={img.name} className="w-full h-full object-cover" />
                            {/* Cover badge */}
                            {coverIdx === i && (
                                <div className="absolute top-1.5 left-1.5 flex items-center gap-1 bg-[#7a1a1a] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                    <Star size={8} fill="currentColor" /> Cover
                                </div>
                            )}
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                {coverIdx !== i && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); onSetCover(i); }}
                                        className="bg-white/90 text-[#7a1a1a] text-[9px] font-bold px-2 py-1 rounded-full"
                                    >
                                        Set Cover
                                    </button>
                                )}
                                <button
                                    onClick={(e) => { e.stopPropagation(); onRemove(i); }}
                                    className="bg-red-500 text-white p-1 rounded-full"
                                >
                                    <Trash2 size={11} />
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* Add more */}
                    <button
                        onClick={() => inputRef.current?.click()}
                        className="aspect-square rounded-xl border-2 border-dashed border-[#e8d5cc] hover:border-[#c0857a] flex items-center justify-center transition-colors"
                    >
                        <Plus size={20} className="text-[#9a7070]" />
                    </button>
                </div>
            )}
        </div>
    );
}

// ── Location Picker ───────────────────────────────────────────────────────────
function LocationPicker({ value, onChange }) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState(value || "");
    const [suggestions, setSugg] = useState([]);
    const ref = useRef();

    const handleQuery = (q) => {
        setQuery(q);
        onChange(q);
        setSugg(q.length > 1 ? SUGGESTED_LOCATIONS.filter(l => l.toLowerCase().includes(q.toLowerCase())) : SUGGESTED_LOCATIONS);
        setOpen(true);
    };

    const pick = (loc) => {
        setQuery(loc);
        onChange(loc);
        setOpen(false);
    };

    return (
        <div className="relative" ref={ref}>
            <div className={`flex items-center gap-2.5 bg-[#fdf8f4] border rounded-xl px-4 py-3 transition-all ${open ? "border-[#7a1a1a] ring-2 ring-[#7a1a1a]/10" : "border-[#e8d5cc] hover:border-[#c0857a]"}`}>
                <MapPin size={16} className="text-[#7a1a1a] shrink-0" />
                <input
                    className="flex-1 bg-transparent outline-none text-sm text-[#1e0a0a] placeholder:text-[#b09090]"
                    placeholder="Add location (city, landmark, country)…"
                    value={query}
                    onChange={(e) => handleQuery(e.target.value)}
                    onFocus={() => { setSugg(SUGGESTED_LOCATIONS); setOpen(true); }}
                />
                {query && (
                    <button onClick={() => { setQuery(""); onChange(""); setOpen(false); }}>
                        <X size={14} className="text-[#9a7070]" />
                    </button>
                )}
            </div>

            {open && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#e8d5cc] rounded-xl shadow-xl z-50 overflow-hidden">
                    <div className="px-3 py-2 border-b border-[#f0e4db] flex items-center gap-2 text-xs text-[#9a7070]">
                        <Search size={11} /> Suggested destinations
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                        {suggestions.length === 0
                            ? <p className="px-4 py-3 text-xs text-[#9a7070]">No suggestions — type your location</p>
                            : suggestions.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => pick(s)}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#fdf8f4] text-left text-sm text-[#1e0a0a] transition-colors"
                                >
                                    <MapPin size={12} className="text-[#c0857a] shrink-0" />
                                    {s}
                                </button>
                            ))}
                    </div>
                    {/* Google Maps placeholder note */}
                    <div className="px-4 py-2.5 border-t border-[#f0e4db] bg-[#fdf8f4] flex items-center gap-2">
                        <Compass size={12} className="text-[#7a1a1a]" />
                        <span className="text-[10px] text-[#9a7070]">
                            {/* 🔌 Connect Google Maps Places API here for live autocomplete */}
                            Connect Google Maps API for live place search
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

// ── Minimal Toolbar ───────────────────────────────────────────────────────────
function EditorToolbar() {
    const [active, setActive] = useState([]);
    const toggle = (t) => setActive(a => a.includes(t) ? a.filter(x => x !== t) : [...a, t]);
    const btn = (id, Icon, title) => (
        <button
            title={title}
            onClick={() => toggle(id)}
            className={`p-1.5 rounded-lg transition-colors ${active.includes(id) ? "bg-[#7a1a1a] text-white" : "text-[#9a7070] hover:bg-[#f0e4db] hover:text-[#1e0a0a]"}`}
        >
            <Icon size={15} />
        </button>
    );
    return (
        <div className="flex items-center gap-0.5 flex-wrap">
            {btn("bold", Bold, "Bold")}
            {btn("italic", Italic, "Italic")}
            <div className="w-px h-4 bg-[#e8d5cc] mx-1" />
            {btn("list", List, "List")}
            {btn("quote", Quote, "Quote")}
            {btn("link", Link2, "Link")}
            <div className="w-px h-4 bg-[#e8d5cc] mx-1" />
            {btn("emoji", Smile, "Emoji")}
        </div>
    );
}

// ── Live Preview Card ─────────────────────────────────────────────────────────
function PreviewCard({ form, images, coverIdx }) {
    const cover = images[coverIdx] || images[0];
    return (
        <div className="bg-white rounded-2xl overflow-hidden border border-[#f0e4db] shadow-md max-w-sm mx-auto">
            {cover && (
                <div className="relative">
                    <img src={cover.url} alt="cover" className="w-full h-44 object-cover" />
                    {form.location && (
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/55 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                            <MapPin size={10} /> {form.location.split(",")[0]}
                        </div>
                    )}
                </div>
            )}
            <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#e8a090] to-[#c0392b] flex items-center justify-center text-xs font-bold text-white">AK</div>
                    <div>
                        <p className="text-xs font-semibold text-[#1e0a0a]">Arjun Kulkarni</p>
                        <p className="text-[10px] text-[#9a7070]">Just now</p>
                    </div>
                    {form.category && (
                        <span className="ml-auto text-[10px] font-semibold bg-[#f0e4db] text-[#7a1a1a] px-2 py-0.5 rounded-full">
                            {CATEGORIES.find(c => c.label === form.category)?.emoji} {form.category}
                        </span>
                    )}
                </div>
                {form.title && <p className="text-sm font-bold text-[#1e0a0a] leading-snug">{form.title}</p>}
                {form.body && <p className="text-xs text-[#5a3030] leading-relaxed line-clamp-4">{form.body}</p>}
                {form.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                        {form.tags.map(t => (
                            <span key={t} className="text-[10px] text-[#7a1a1a] bg-[#fdf8f4] border border-[#e8d5cc] px-2 py-0.5 rounded-full">#{t}</span>
                        ))}
                    </div>
                )}
                <div className="flex items-center gap-3 pt-1 border-t border-[#f5ede8] text-[#9a7070] text-xs">
                    <span className="flex items-center gap-1"><span>❤️</span> 0</span>
                    <span className="flex items-center gap-1"><span>💬</span> 0</span>
                    {images.length > 1 && <span className="ml-auto">{images.length} photos</span>}
                </div>
            </div>
        </div>
    );
}

// ── Main ShareBlog Component ──────────────────────────────────────────────────
export default function ShareBlog() {
    const [tab, setTab] = useState("write"); // "write" | "preview"
    const [images, setImages] = useState([]);
    const [coverIdx, setCoverIdx] = useState(0);
    const [tagInput, setTagInput] = useState("");
    const [locOpen, setLocOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [visMenu, setVisMenu] = useState(false);

    const [form, setForm] = useState({
        title: "",
        body: "",
        location: "",
        category: "",
        tags: [],
        mood: "",
        visibility: "public",
        tips: "",
    });

    const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

    const addImage = (img) => setImages(p => [...p, img]);
    const removeImage = (i) => {
        setImages(p => p.filter((_, idx) => idx !== i));
        if (coverIdx >= i && coverIdx > 0) setCoverIdx(c => c - 1);
    };

    const addTag = () => {
        const t = tagInput.trim().replace(/^#/, "");
        if (t && !form.tags.includes(t) && form.tags.length < 8) {
            set("tags", [...form.tags, t]);
        }
        setTagInput("");
    };

    const removeTag = (t) => set("tags", form.tags.filter(x => x !== t));

    const visOption = VISIBILITY_OPTIONS.find(v => v.id === form.visibility);

    const canPublish = form.title.trim() && form.body.trim();

    const handlePublish = () => {
        if (!canPublish) return;
        setSubmitted(true);
        // 🔌 Replace with your API call: POST /api/blogs { ...form, images }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-96 gap-5 text-center px-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#e8a090] to-[#7a1a1a] flex items-center justify-center">
                    <CheckCircle2 size={36} className="text-white" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-[#1e0a0a]">Blog Published! 🎉</h2>
                    <p className="text-[#9a7070] text-sm mt-1.5 max-w-sm">
                        Your story is now live. Fellow travelers at <strong className="text-[#7a1a1a]">{form.location || "your destination"}</strong> can find and connect with you.
                    </p>
                </div>
                <button
                    onClick={() => { setSubmitted(false); setForm({ title: "", body: "", location: "", category: "", tags: [], mood: "", visibility: "public", tips: "" }); setImages([]); setCoverIdx(0); }}
                    className="flex items-center gap-2 bg-[#7a1a1a] text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#5a0e0e] transition-colors"
                >
                    <Plus size={16} /> Write Another
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">

            {/* ── Page header ── */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#1e0a0a] flex items-center gap-2">
                        <Compass size={22} className="text-[#7a1a1a]" /> Share Your Journey
                    </h1>
                    <p className="text-sm text-[#9a7070] mt-0.5">Write, upload, and help other travelers find you.</p>
                </div>

                {/* Write / Preview toggle */}
                <div className="flex items-center bg-[#f0e4db] rounded-xl p-1">
                    {[
                        { id: "write", icon: Type, label: "Write" },
                        { id: "preview", icon: Eye, label: "Preview" },
                    ].map(({ id, icon: Icon, label }) => (
                        <button
                            key={id}
                            onClick={() => setTab(id)}
                            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${tab === id ? "bg-white text-[#7a1a1a] shadow-sm" : "text-[#9a7070] hover:text-[#5a3030]"}`}
                        >
                            <Icon size={14} /> {label}
                        </button>
                    ))}
                </div>
            </div>

            {tab === "preview" ? (
                /* ══════════ PREVIEW ══════════ */
                <div className="space-y-4">
                    <p className="text-xs text-[#9a7070] text-center">This is how your blog will appear in the feed</p>
                    <PreviewCard form={form} images={images} coverIdx={coverIdx} />
                </div>
            ) : (
                /* ══════════ EDITOR ══════════ */
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* ── Left: Main editor ── */}
                    <div className="lg:col-span-2 space-y-5">

                        {/* Cover image upload */}
                        <div className="bg-white rounded-2xl border border-[#f0e4db] p-5 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-semibold text-[#1e0a0a] mb-3">
                                <ImagePlus size={16} className="text-[#7a1a1a]" /> Photos
                                <span className="text-[#9a7070] font-normal text-xs">(first image = cover)</span>
                            </label>
                            <ImageUploadZone
                                images={images}
                                onAdd={addImage}
                                onRemove={removeImage}
                                onSetCover={setCoverIdx}
                                coverIdx={coverIdx}
                            />
                        </div>

                        {/* Title */}
                        <div className="bg-white rounded-2xl border border-[#f0e4db] p-5 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-semibold text-[#1e0a0a] mb-3">
                                <Type size={16} className="text-[#7a1a1a]" /> Title
                                <span className="text-rose-500 text-xs">*</span>
                            </label>
                            <input
                                maxLength={100}
                                className="w-full bg-[#fdf8f4] border border-[#e8d5cc] rounded-xl px-4 py-3 text-sm text-[#1e0a0a] placeholder:text-[#b09090] outline-none focus:border-[#7a1a1a] focus:ring-2 focus:ring-[#7a1a1a]/10 transition-all"
                                placeholder="Give your journey a headline…"
                                value={form.title}
                                onChange={(e) => set("title", e.target.value)}
                            />
                            <p className="text-right text-[10px] text-[#b09090] mt-1">{form.title.length}/100</p>
                        </div>

                        {/* Body */}
                        <div className="bg-white rounded-2xl border border-[#f0e4db] p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-3">
                                <label className="flex items-center gap-2 text-sm font-semibold text-[#1e0a0a]">
                                    <AlignLeft size={16} className="text-[#7a1a1a]" /> Story
                                    <span className="text-rose-500 text-xs">*</span>
                                </label>
                                <EditorToolbar />
                            </div>
                            <textarea
                                rows={8}
                                maxLength={2000}
                                className="w-full bg-[#fdf8f4] border border-[#e8d5cc] rounded-xl px-4 py-3 text-sm text-[#1e0a0a] placeholder:text-[#b09090] outline-none focus:border-[#7a1a1a] focus:ring-2 focus:ring-[#7a1a1a]/10 transition-all resize-none leading-relaxed"
                                placeholder="Tell travelers what you saw, felt, discovered. Share the real story — the detours, the locals, the surprises…"
                                value={form.body}
                                onChange={(e) => set("body", e.target.value)}
                            />
                            <p className="text-right text-[10px] text-[#b09090] mt-1">{form.body.length}/2000</p>
                        </div>

                        {/* Tips for travelers */}
                        <div className="bg-white rounded-2xl border border-[#f0e4db] p-5 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-semibold text-[#1e0a0a] mb-3">
                                <Star size={16} className="text-[#7a1a1a]" /> Tips for fellow travelers
                                <span className="text-[#9a7070] font-normal text-xs">(optional)</span>
                            </label>
                            <textarea
                                rows={3}
                                maxLength={500}
                                className="w-full bg-[#fdf8f4] border border-[#e8d5cc] rounded-xl px-4 py-3 text-sm text-[#1e0a0a] placeholder:text-[#b09090] outline-none focus:border-[#7a1a1a] focus:ring-2 focus:ring-[#7a1a1a]/10 transition-all resize-none leading-relaxed"
                                placeholder="Best time to visit, what to pack, hidden gem nearby, local tip, budget hack…"
                                value={form.tips}
                                onChange={(e) => set("tips", e.target.value)}
                            />
                        </div>
                    </div>

                    {/* ── Right: Metadata sidebar ── */}
                    <div className="space-y-4">

                        {/* Location */}
                        <div className="bg-white rounded-2xl border border-[#f0e4db] p-4 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-semibold text-[#1e0a0a] mb-3">
                                <MapPin size={15} className="text-[#7a1a1a]" /> Location
                            </label>
                            <LocationPicker
                                value={form.location}
                                onChange={(v) => set("location", v)}
                            />
                            {/* Static map preview placeholder */}
                            {form.location && (
                                <div className="mt-3 rounded-xl overflow-hidden border border-[#e8d5cc] relative">
                                    {/*
                    🔌 GOOGLE MAPS EMBED — replace src with live embed:
                    src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(form.location)}`}
                  */}
                                    <div className="h-32 bg-gradient-to-br from-[#e8f4e8] to-[#c8e6c8] flex flex-col items-center justify-center gap-2">
                                        <MapPin size={20} className="text-[#2e7d32]" />
                                        <p className="text-xs font-medium text-[#2e7d32]">{form.location.split(",")[0]}</p>
                                        <p className="text-[10px] text-[#558b2f]">
                                            {/* 🔌 Plug in Google Maps Embed API here */}
                                            Map preview — connect Google Maps API
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Category */}
                        <div className="bg-white rounded-2xl border border-[#f0e4db] p-4 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-semibold text-[#1e0a0a] mb-3">
                                <Tag size={15} className="text-[#7a1a1a]" /> Category
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {CATEGORIES.map(({ label, emoji }) => (
                                    <button
                                        key={label}
                                        onClick={() => set("category", form.category === label ? "" : label)}
                                        className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-medium border transition-all ${form.category === label
                                            ? "bg-[#7a1a1a] text-white border-[#7a1a1a] shadow-sm"
                                            : "bg-[#fdf8f4] text-[#5a3030] border-[#e8d5cc] hover:border-[#c0857a]"
                                            }`}
                                    >
                                        <span>{emoji}</span> {label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="bg-white rounded-2xl border border-[#f0e4db] p-4 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-semibold text-[#1e0a0a] mb-3">
                                <Tag size={15} className="text-[#7a1a1a]" /> Tags
                                <span className="text-[#9a7070] font-normal text-xs">up to 8</span>
                            </label>
                            <div className="flex gap-2 mb-2.5">
                                <input
                                    className="flex-1 bg-[#fdf8f4] border border-[#e8d5cc] rounded-lg px-3 py-2 text-xs text-[#1e0a0a] placeholder:text-[#b09090] outline-none focus:border-[#7a1a1a] transition-colors"
                                    placeholder="#solotravel"
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                                />
                                <button
                                    onClick={addTag}
                                    className="px-3 py-2 bg-[#7a1a1a] text-white rounded-lg text-xs font-semibold hover:bg-[#5a0e0e] transition-colors"
                                >
                                    Add
                                </button>
                            </div>
                            {form.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {form.tags.map((t) => (
                                        <span key={t} className="flex items-center gap-1 text-[11px] bg-[#fdf8f4] border border-[#e8d5cc] text-[#7a1a1a] px-2.5 py-1 rounded-full font-medium">
                                            #{t}
                                            <button onClick={() => removeTag(t)} className="ml-0.5 hover:text-rose-500 transition-colors">
                                                <X size={10} />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Mood */}
                        <div className="bg-white rounded-2xl border border-[#f0e4db] p-4 shadow-sm">
                            <label className="flex items-center gap-2 text-sm font-semibold text-[#1e0a0a] mb-3">
                                <Smile size={15} className="text-[#7a1a1a]" /> Trip mood
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                                {MOODS.map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => set("mood", form.mood === m ? "" : m)}
                                        className={`text-xs px-2.5 py-1.5 rounded-full border transition-all ${form.mood === m
                                            ? "bg-[#7a1a1a] text-white border-[#7a1a1a]"
                                            : "bg-[#fdf8f4] text-[#5a3030] border-[#e8d5cc] hover:border-[#c0857a]"
                                            }`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Visibility */}
                        <div className="bg-white rounded-2xl border border-[#f0e4db] p-4 shadow-sm relative">
                            <label className="flex items-center gap-2 text-sm font-semibold text-[#1e0a0a] mb-3">
                                <Globe size={15} className="text-[#7a1a1a]" /> Visibility
                            </label>
                            <button
                                onClick={() => setVisMenu(v => !v)}
                                className="w-full flex items-center gap-3 bg-[#fdf8f4] border border-[#e8d5cc] rounded-xl px-3.5 py-2.5 hover:border-[#c0857a] transition-colors"
                            >
                                <visOption.icon size={15} className="text-[#7a1a1a]" />
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-medium text-[#1e0a0a]">{visOption.label}</p>
                                    <p className="text-xs text-[#9a7070]">{visOption.desc}</p>
                                </div>
                                <ChevronDown size={14} className={`text-[#9a7070] transition-transform ${visMenu ? "rotate-180" : ""}`} />
                            </button>
                            {visMenu && (
                                <div className="absolute left-4 right-4 bottom-full mb-2 bg-white border border-[#e8d5cc] rounded-xl shadow-lg overflow-hidden z-20">
                                    {VISIBILITY_OPTIONS.map(({ id, icon: Icon, label, desc }) => (
                                        <button
                                            key={id}
                                            onClick={() => { set("visibility", id); setVisMenu(false); }}
                                            className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-[#fdf8f4] transition-colors text-left ${form.visibility === id ? "bg-[#fdf8f4]" : ""}`}
                                        >
                                            <Icon size={15} className="text-[#7a1a1a] shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-[#1e0a0a]">{label}</p>
                                                <p className="text-xs text-[#9a7070]">{desc}</p>
                                            </div>
                                            {form.visibility === id && <CheckCircle2 size={14} className="ml-auto text-[#7a1a1a]" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Publish actions */}
                        <div className="space-y-2.5">
                            <button
                                onClick={handlePublish}
                                disabled={!canPublish}
                                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all ${canPublish
                                    ? "bg-[#7a1a1a] text-white hover:bg-[#5a0e0e] shadow-md hover:shadow-lg active:scale-[0.98]"
                                    : "bg-[#e8d5cc] text-[#b09090] cursor-not-allowed"
                                    }`}
                            >
                                <Send size={15} /> Publish Blog
                            </button>
                            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium text-sm text-[#7a1a1a] border border-[#e8d5cc] hover:bg-[#fdf8f4] transition-colors">
                                <Save size={15} /> Save as Draft
                            </button>
                            {!canPublish && (
                                <p className="text-center text-[10px] text-[#b09090]">Title & story are required to publish</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}