import { useState } from "react";
import {
  Star, ThumbsUp, MessageCircle, Share2, MapPin, Search,
  Plus, ChevronDown, ChevronUp, Bookmark, Camera, TrendingUp,
  Award, Globe, Shield, X, Send, Sparkles, MoreHorizontal,
  CheckCircle2, Filter, SlidersHorizontal,
} from "lucide-react";

// ── Mock Reviews (newest first) ───────────────────────────────────────────────
const INITIAL_REVIEWS = [
  {
    id: 1,
    user: "Sneha Iyer", handle: "@sneha.roams",
    avatar: "SI", avatarBg: "from-lime-400 to-green-600",
    destination: "Lisbon, Portugal", flag: "🇵🇹",
    rating: 5, timestamp: new Date(Date.now() - 1000 * 60 * 18), // 18 min ago
    verified: true,
    title: "Lisbon stole my heart completely",
    text: "Alfama district at golden hour is something else. The trams, the fado music drifting from open doors, the pastéis de nata still warm from the oven — Lisbon moves at exactly the right pace. Solo-travel paradise. Everyone speaks English and locals are the warmest I've encountered anywhere in Europe.",
    photos: [
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&q=80",
      "https://images.unsplash.com/photo-1513735492246-483525079686?w=400&q=80",
    ],
    helpful: 34, comments: 7, category: "City Break",
    pros: ["Affordable for Europe", "Incredibly welcoming locals", "Stunning viewpoints"],
    cons: ["Hilly terrain (hard on legs)", "Crowded in July–Aug"],
    wouldReturn: true,
  },
  {
    id: 2,
    user: "Dev Malhotra", handle: "@devexplores",
    avatar: "DM", avatarBg: "from-sky-400 to-blue-600",
    destination: "Reykjavik, Iceland", flag: "🇮🇸",
    rating: 5, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hrs ago
    verified: false,
    title: "The Northern Lights changed me as a person",
    text: "I know that sounds dramatic but standing under the aurora at 2 AM in complete silence with nobody else around — it rewires something in you. Skip the Blue Lagoon (overpriced tourist trap), drive to the Snæfellsnes Peninsula instead. Rented a campervan for 5 days and it was the best decision of my life.",
    photos: [
      "https://images.unsplash.com/photo-1531804055935-76f44d7c3621?w=400&q=80",
    ],
    helpful: 91, comments: 22, category: "Adventure",
    pros: ["Other-worldly landscapes", "Midnight sun in summer", "Safe for solo travel"],
    cons: ["Extremely expensive", "Weather unpredictable", "Car essential"],
    wouldReturn: true,
  },
  {
    id: 3,
    user: "Priya Sharma", handle: "@priyatravels",
    avatar: "PS", avatarBg: "from-rose-400 to-pink-600",
    destination: "Santorini, Greece", flag: "🇬🇷",
    rating: 5, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    verified: true,
    title: "Most breathtaking place I've ever been",
    text: "Woke up every morning to caldera views with my coffee. The sunsets in Oia are genuinely life-changing. Solo travel friendly — met amazing people at every turn. One tip: book cliff-side restaurants 3+ days ahead or you'll miss out entirely.",
    photos: [
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&q=80",
      "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400&q=80",
    ],
    helpful: 142, comments: 18, category: "Island Hopping",
    pros: ["Stunning caldera views", "Great food scene", "Friendly atmosphere"],
    cons: ["Very expensive", "Crowded June–Aug", "Limited beaches"],
    wouldReturn: true,
  },
  {
    id: 4,
    user: "Rahul Kapoor", handle: "@rahul_onroad",
    avatar: "RK", avatarBg: "from-amber-400 to-orange-500",
    destination: "Kyoto, Japan", flag: "🇯🇵",
    rating: 5, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 1 week ago
    verified: true,
    title: "A masterclass in serenity and culture",
    text: "I've travelled to 26 countries and Kyoto is still my number one. The temples, the food, the people — everything is dialled to perfection. Wake up at 5 AM for Fushimi Inari and you'll have it to yourself. The bamboo grove at Arashiyama before crowds arrive is something I'll carry forever.",
    photos: [
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80",
    ],
    helpful: 89, comments: 24, category: "Culture Trail",
    pros: ["Incredible street food", "Organised transport", "Deep history everywhere"],
    cons: ["Language barrier outside tourist zones", "Crowded at cherry blossom peak"],
    wouldReturn: true,
  },
  {
    id: 5,
    user: "Ananya Mehta", handle: "@ananya.wanders",
    avatar: "AM", avatarBg: "from-teal-400 to-cyan-600",
    destination: "Patagonia, Argentina", flag: "🇦🇷",
    rating: 4, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21), // 3 weeks ago
    verified: false,
    title: "Brutal, beautiful, unforgettable — the W-Trek",
    text: "The W-trek is the hardest thing I've done and the best. Wind that nearly knocked me off my feet, trails that feel like another planet, glacier views that no photo captures. Go in peak season (Nov–Feb) and pre-book refugios 6 months ahead — no joke.",
    photos: [
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    ],
    helpful: 203, comments: 41, category: "Trek Diary",
    pros: ["Dramatic mountain scenery", "Wildlife encounters", "Life-changing challenge"],
    cons: ["Expensive in season", "Extreme unpredictable weather", "Very remote"],
    wouldReturn: true,
  },
  {
    id: 6,
    user: "Vikram Nair", handle: "@vikram_nomad",
    avatar: "VN", avatarBg: "from-violet-400 to-purple-600",
    destination: "Marrakech, Morocco", flag: "🇲🇦",
    rating: 4, timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 34), // 1 month ago
    verified: true,
    title: "Sensory overload in the best possible way",
    text: "The medina will swallow you whole and you'll love it. Haggle for everything, try the street food at Jemaa el-Fna after dark, and stay in a riad — the architecture inside is jaw-dropping. Budget traveller's dream if you know where to eat.",
    photos: [
      "https://images.unsplash.com/photo-1597211684565-dca64d72bdfe?w=400&q=80",
    ],
    helpful: 167, comments: 29, category: "Food Journey",
    pros: ["Incredible cheap food", "Rich layered culture", "Stunning riads"],
    cons: ["Persistent vendors in tourist areas", "Very hot in summer"],
    wouldReturn: true,
  },
];

const SORT_OPTIONS = ["Latest", "Most Helpful", "Highest Rated", "Lowest Rated"];
const CATEGORY_FILTERS = ["All", "City Break", "Adventure", "Island Hopping", "Culture Trail", "Trek Diary", "Food Journey"];

// ── Helpers ───────────────────────────────────────────────────────────────────
function timeAgo(date) {
  const s = Math.floor((Date.now() - date) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 86400 * 7) return `${Math.floor(s / 86400)}d ago`;
  if (s < 86400 * 30) return `${Math.floor(s / (86400 * 7))}w ago`;
  return `${Math.floor(s / (86400 * 30))}mo ago`;
}

const StarRow = ({ rating, size = 14, interactive = false, onChange }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map(n => (
      <button
        key={n}
        onClick={() => interactive && onChange?.(n)}
        className={interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"}
        type="button"
      >
        <Star
          size={size}
          className={n <= rating ? "text-amber-400" : "text-gray-200"}
          fill={n <= rating ? "currentColor" : "none"}
        />
      </button>
    ))}
  </div>
);

const RatingBar = ({ label, pct }) => (
  <div className="flex items-center gap-2">
    <span className="text-xs text-[#9a7070] w-3 shrink-0">{label}</span>
    <div className="flex-1 h-1.5 bg-[#f0e4db] rounded-full overflow-hidden">
      <div className="h-full bg-amber-400 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
    </div>
    <span className="text-[10px] text-[#9a7070] w-7 text-right shrink-0">{pct}%</span>
  </div>
);

// ── Review Card ───────────────────────────────────────────────────────────────
function ReviewCard({ review, index }) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [voted, setVoted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [localComments, setLocalComments] = useState([]);

  const isLong = review.text.length > 200;

  const handleComment = () => {
    if (!comment.trim()) return;
    setLocalComments(c => [...c, { text: comment, time: "just now" }]);
    setComment("");
  };

  return (
    <div
      className="bg-white rounded-2xl border border-[#f0e4db] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 p-5 pb-3">
        <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${review.avatarBg} flex items-center justify-center text-xs font-bold text-white ring-2 ring-white shadow shrink-0`}>
          {review.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="text-sm font-bold text-[#1e0a0a]">{review.user}</p>
            {review.verified && <Shield size={12} className="text-[#7a1a1a]" />}
            <span className="ml-auto text-[10px] font-semibold bg-[#fdf8f4] border border-[#e8d5cc] text-[#7a1a1a] px-2 py-0.5 rounded-full">
              {review.category}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <StarRow rating={review.rating} size={13} />
            <span className="flex items-center gap-1 text-xs text-[#9a7070]">
              <MapPin size={10} className="text-[#c0857a]" />
              {review.destination} {review.flag}
            </span>
            <span className="text-xs text-[#b09090]">· {timeAgo(review.timestamp)}</span>
          </div>
        </div>
        <button className="p-1.5 rounded-lg hover:bg-[#f5ede8] text-[#9a7070] transition-colors shrink-0">
          <MoreHorizontal size={15} />
        </button>
      </div>

      {/* Photos */}
      {review.photos?.length > 0 && (
        <div className="flex gap-2 px-5 mb-3 overflow-x-auto pb-1">
          {review.photos.map((src, i) => (
            <img
              key={i} src={src} alt=""
              className="h-36 w-52 object-cover rounded-xl border border-[#f0e4db] shrink-0"
            />
          ))}
        </div>
      )}

      {/* Text body */}
      <div className="px-5 pb-3">
        <p className="text-sm font-bold text-[#1e0a0a] mb-1.5">{review.title}</p>
        <p className="text-sm text-[#5a3030] leading-relaxed">
          {!isLong || expanded ? review.text : review.text.slice(0, 200) + "…"}
        </p>
        {isLong && (
          <button
            onClick={() => setExpanded(e => !e)}
            className="flex items-center gap-1 text-xs font-semibold text-[#7a1a1a] mt-1.5 hover:underline"
          >
            {expanded
              ? <><ChevronUp size={13} /> Show less</>
              : <><ChevronDown size={13} /> Read more</>}
          </button>
        )}

        {/* Pros & cons (only when expanded) */}
        {expanded && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-green-50 rounded-xl p-3 border border-green-100">
              <p className="text-[10px] font-bold text-green-700 uppercase tracking-wide mb-2">✅ Pros</p>
              {review.pros.map(p => (
                <p key={p} className="text-xs text-green-800 mb-1 leading-snug">· {p}</p>
              ))}
            </div>
            <div className="bg-rose-50 rounded-xl p-3 border border-rose-100">
              <p className="text-[10px] font-bold text-rose-600 uppercase tracking-wide mb-2">⚠️ Cons</p>
              {review.cons.map(c => (
                <p key={c} className="text-xs text-rose-700 mb-1 leading-snug">· {c}</p>
              ))}
            </div>
          </div>
        )}

        {expanded && review.wouldReturn && (
          <div className="flex items-center gap-2 mt-3 bg-[#fdf8f4] border border-[#f0e4db] rounded-xl px-3 py-2">
            <CheckCircle2 size={14} className="text-[#7a1a1a] shrink-0" />
            <p className="text-xs font-semibold text-[#5a3030]">
              {review.user.split(" ")[0]} would return to this destination
            </p>
          </div>
        )}
      </div>

      {/* Action row */}
      <div className="flex items-center gap-1 px-5 py-3 border-t border-[#f5ede8]">
        <button
          onClick={() => { if (!voted) { setHelpful(h => h + 1); setVoted(true); } }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${voted ? "text-[#7a1a1a] bg-[#f5ede8]" : "text-[#9a7070] hover:bg-[#f5ede8]"}`}
        >
          <ThumbsUp size={13} fill={voted ? "currentColor" : "none"} />
          Helpful · {helpful}
        </button>
        <button
          onClick={() => setShowComments(s => !s)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${showComments ? "text-[#7a1a1a] bg-[#f5ede8]" : "text-[#9a7070] hover:bg-[#f5ede8]"}`}
        >
          <MessageCircle size={13} />
          {review.comments + localComments.length}
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#9a7070] hover:bg-[#f5ede8] transition-colors">
          <Share2 size={13} /> Share
        </button>
        <button
          onClick={() => setSaved(s => !s)}
          className={`ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${saved ? "text-[#7a1a1a] bg-[#f5ede8]" : "text-[#9a7070] hover:bg-[#f5ede8]"}`}
        >
          <Bookmark size={13} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Comment thread */}
      {showComments && (
        <div className="border-t border-[#f5ede8] bg-[#fdf8f4] px-5 py-3 space-y-2.5">
          {localComments.map((c, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#e8a090] to-[#c0392b] flex items-center justify-center text-[9px] font-bold text-white shrink-0">AK</div>
              <div className="bg-white border border-[#f0e4db] rounded-xl px-3 py-2 text-xs text-[#5a3030] flex-1">
                {c.text}
                <span className="text-[#b09090] ml-2">{c.time}</span>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#e8a090] to-[#c0392b] flex items-center justify-center text-[10px] font-bold text-white shrink-0">AK</div>
            <div className="flex-1 flex items-center gap-2 bg-white border border-[#e8d5cc] rounded-xl px-3 py-2 focus-within:border-[#7a1a1a] transition-colors">
              <input
                className="flex-1 bg-transparent outline-none text-xs text-[#1e0a0a] placeholder:text-[#b09090]"
                placeholder="Add a comment…"
                value={comment}
                onChange={e => setComment(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleComment()}
              />
              {comment && (
                <button onClick={handleComment} className="text-[#7a1a1a] shrink-0">
                  <Send size={13} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Write Review Modal ────────────────────────────────────────────────────────
function WriteReviewModal({ onClose, onSubmit }) {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [dest, setDest] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");
  const [wouldReturn, setReturn] = useState(null);

  const CATEGORIES = ["City Break", "Adventure", "Island Hopping", "Culture Trail", "Trek Diary", "Food Journey"];

  const canNext1 = dest.trim() && rating > 0 && category;
  const canNext2 = title.trim() && body.length >= 50;

  const handlePublish = () => {
    const AVATARS = [
      { avatar: "AK", avatarBg: "from-[#e8a090] to-[#c0392b]" },
    ];
    onSubmit({
      user: "Arjun Kulkarni", handle: "@arjun.travels",
      avatar: "AK", avatarBg: "from-orange-300 to-red-500",
      destination: dest, flag: "🌍",
      rating, timestamp: new Date(),
      verified: true,
      title, text: body,
      photos: [], helpful: 0, comments: 0,
      category, wouldReturn: wouldReturn === "Yes, definitely!",
      pros: [], cons: [],
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#f0e4db]">
          <div>
            <p className="text-xs text-[#9a7070] font-medium">Step {step} of 3</p>
            <h3 className="text-base font-bold text-[#1e0a0a]">Write a Review</h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-[#f5ede8] text-[#9a7070] transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[#f0e4db]">
          <div
            className="h-full bg-[#7a1a1a] rounded-full transition-all duration-500"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        <div className="px-6 py-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {step === 1 && (
            <>
              <div>
                <label className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide mb-2 block">Destination</label>
                <div className="flex items-center gap-2 bg-[#fdf8f4] border border-[#e8d5cc] rounded-xl px-4 py-3 focus-within:border-[#7a1a1a] focus-within:ring-2 focus-within:ring-[#7a1a1a]/10 transition-all">
                  <MapPin size={15} className="text-[#c0857a] shrink-0" />
                  <input
                    className="flex-1 bg-transparent outline-none text-sm text-[#1e0a0a] placeholder:text-[#b09090]"
                    placeholder="Where did you travel to?"
                    value={dest}
                    onChange={e => setDest(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide mb-2 block">Your rating</label>
                <div className="flex items-center gap-3">
                  <StarRow rating={rating} size={30} interactive onChange={setRating} />
                  {rating > 0 && (
                    <span className="text-sm font-semibold text-[#7a1a1a]">
                      {["", "Disappointing", "Below average", "Good", "Great", "Outstanding!"][rating]}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(c => (
                    <button
                      key={c} type="button"
                      onClick={() => setCategory(c)}
                      className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all ${category === c ? "bg-[#7a1a1a] text-white border-[#7a1a1a]" : "bg-[#fdf8f4] text-[#5a3030] border-[#e8d5cc] hover:border-[#c0857a]"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide mb-2 block">Would you return?</label>
                <div className="flex gap-2">
                  {["Yes, definitely!", "Maybe someday", "Probably not"].map(opt => (
                    <button
                      key={opt} type="button"
                      onClick={() => setReturn(opt)}
                      className={`flex-1 text-xs py-2 rounded-xl border font-medium transition-all ${wouldReturn === opt ? "bg-[#7a1a1a] text-white border-[#7a1a1a]" : "border-[#e8d5cc] text-[#5a3030] hover:border-[#c0857a]"}`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <label className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide mb-2 block">Title</label>
                <input
                  maxLength={80}
                  className="w-full bg-[#fdf8f4] border border-[#e8d5cc] rounded-xl px-4 py-3 text-sm text-[#1e0a0a] placeholder:text-[#b09090] outline-none focus:border-[#7a1a1a] focus:ring-2 focus:ring-[#7a1a1a]/10 transition-all"
                  placeholder="Sum it up in one memorable line…"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <p className="text-right text-[10px] text-[#b09090] mt-1">{title.length}/80</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-[#9a7070] uppercase tracking-wide mb-2 block">Your experience</label>
                <textarea
                  rows={6}
                  maxLength={1500}
                  className="w-full bg-[#fdf8f4] border border-[#e8d5cc] rounded-xl px-4 py-3 text-sm text-[#1e0a0a] placeholder:text-[#b09090] outline-none focus:border-[#7a1a1a] focus:ring-2 focus:ring-[#7a1a1a]/10 resize-none leading-relaxed transition-all"
                  placeholder="Tell other travelers what made it special — the details, the hidden gems, the things you wish someone had told you before you went…"
                  value={body}
                  onChange={e => setBody(e.target.value)}
                />
                <p className={`text-right text-[10px] mt-1 ${body.length < 50 ? "text-rose-400" : "text-[#b09090]"}`}>
                  {body.length}/1500 {body.length < 50 ? `· ${50 - body.length} more chars required` : ""}
                </p>
              </div>
            </>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-14 h-14 bg-[#f0e4db] rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <Camera size={26} className="text-[#7a1a1a]" />
                </div>
                <p className="text-sm font-bold text-[#1e0a0a]">Add photos</p>
                <p className="text-xs text-[#9a7070] mt-0.5">Optional — reviews with photos get 3× more helpful votes</p>
              </div>
              <div className="border-2 border-dashed border-[#e8d5cc] rounded-2xl py-8 text-center hover:border-[#c0857a] hover:bg-[#fdf8f4] transition-all cursor-pointer">
                <p className="text-xs text-[#9a7070]">Click or drag to upload photos</p>
              </div>

              {/* Summary */}
              <div className="bg-[#fdf8f4] border border-[#f0e4db] rounded-2xl p-4 space-y-2">
                <p className="text-xs font-bold text-[#1e0a0a] uppercase tracking-wide">Review preview</p>
                <div className="flex items-center gap-2">
                  <MapPin size={12} className="text-[#c0857a]" />
                  <span className="text-xs text-[#5a3030] font-medium">{dest}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarRow rating={rating} size={12} />
                  <span className="text-[10px] text-[#9a7070] bg-[#f0e4db] px-2 py-0.5 rounded-full">{category}</span>
                </div>
                <p className="text-xs font-semibold text-[#1e0a0a]">"{title}"</p>
                <p className="text-xs text-[#5a3030] line-clamp-2 leading-relaxed">{body}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#f0e4db]">
          {step > 1
            ? <button type="button" onClick={() => setStep(s => s - 1)} className="text-sm font-semibold text-[#9a7070] hover:text-[#5a3030] transition-colors">← Back</button>
            : <div />
          }
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(s => s + 1)}
              disabled={step === 1 ? !canNext1 : !canNext2}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${(step === 1 ? canNext1 : canNext2)
                ? "bg-[#7a1a1a] text-white hover:bg-[#5a0e0e] shadow-md"
                : "bg-[#f0e4db] text-[#b09090] cursor-not-allowed"
                }`}
            >
              Continue →
            </button>
          ) : (
            <button
              type="button"
              onClick={handlePublish}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold bg-[#7a1a1a] text-white hover:bg-[#5a0e0e] shadow-md transition-colors"
            >
              <CheckCircle2 size={15} /> Publish Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function CommunityReviews() {
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [sortBy, setSortBy] = useState("Latest");
  const [showSortMenu, setSort] = useState(false);
  const [categoryFilter, setFilter] = useState("All");
  const [searchQuery, setSearch] = useState("");
  const [showModal, setModal] = useState(false);

  const handleNewReview = (review) => {
    setReviews(r => [{ ...review, id: Date.now() }, ...r]);
    setSortBy("Latest");
  };

  // Filter
  const filtered = reviews.filter(r => {
    const matchesCat = categoryFilter === "All" || r.category === categoryFilter;
    const matchesSearch =
      r.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.user.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "Latest") return b.timestamp - a.timestamp;
    if (sortBy === "Most Helpful") return b.helpful - a.helpful;
    if (sortBy === "Highest Rated") return b.rating - a.rating;
    if (sortBy === "Lowest Rated") return a.rating - b.rating;
    return 0;
  });

  // Rating distribution
  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  const dist = [5, 4, 3, 2, 1].map(s => ({
    star: s,
    pct: Math.round((reviews.filter(r => r.rating === s).length / reviews.length) * 100),
  }));

  return (
    <div className="w-screen mx-auto">

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[#1e0a0a] flex items-center gap-2">
            <Star size={22} className="text-amber-400" fill="currentColor" />
            Traveler Reviews
          </h1>
          <p className="text-sm text-[#9a7070] mt-0.5">
            Honest experiences from the travelMates community · latest first
          </p>
        </div>
        <button
          onClick={() => setModal(true)}
          className="flex items-center gap-2 bg-[#7a1a1a] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#5a0e0e] transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <Plus size={16} /> Write a Review
        </button>
      </div>



      {/* ── Search + filters ── */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {/* Search */}
        <div className="flex-1 min-w-48 flex items-center gap-2 bg-white border border-[#e8d5cc] rounded-xl px-3.5 py-2.5 shadow-sm focus-within:border-[#7a1a1a] focus-within:ring-2 focus-within:ring-[#7a1a1a]/10 transition-all">
          <Search size={14} className="text-[#9a7070] shrink-0" />
          <input
            className="flex-1 bg-transparent outline-none text-sm text-[#1e0a0a] placeholder:text-[#b09090]"
            placeholder="Search by destination, title, traveler…"
            value={searchQuery}
            onChange={e => setSearch(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearch("")}>
              <X size={13} className="text-[#9a7070]" />
            </button>
          )}
        </div>

        {/* Sort */}
        <div className="relative">
          <button
            onClick={() => setSort(s => !s)}
            className="flex items-center gap-2 bg-white border border-[#e8d5cc] px-3.5 py-2.5 rounded-xl text-sm font-medium text-[#5a3030] hover:border-[#c0857a] transition-colors shadow-sm"
          >
            <SlidersHorizontal size={14} className="text-[#9a7070]" />
            {sortBy}
            <ChevronDown size={13} className={`text-[#9a7070] transition-transform ${showSortMenu ? "rotate-180" : ""}`} />
          </button>
          {showSortMenu && (
            <div className="absolute top-full right-0 mt-1.5 bg-white border border-[#e8d5cc] rounded-xl shadow-xl z-20 overflow-hidden w-44">
              {SORT_OPTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => { setSortBy(s); setSort(false); }}
                  className={`w-full px-4 py-2.5 text-sm text-left hover:bg-[#fdf8f4] transition-colors flex items-center justify-between ${sortBy === s ? "font-semibold text-[#7a1a1a] bg-[#fdf8f4]" : "text-[#5a3030]"}`}
                >
                  {s}
                  {sortBy === s && <CheckCircle2 size={13} className="text-[#7a1a1a]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Category pills ── */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1 scrollbar-hide">
        <Filter size={14} className="text-[#9a7070] shrink-0 mt-1.5" />
        {CATEGORY_FILTERS.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`shrink-0 text-xs px-3.5 py-1.5 rounded-full font-semibold border transition-all ${categoryFilter === c
              ? "bg-[#7a1a1a] text-white border-[#7a1a1a] shadow-sm"
              : "bg-white text-[#9a7070] border-[#e8d5cc] hover:border-[#c0857a] hover:text-[#5a3030]"
              }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ── Results count ── */}
      <p className="text-xs text-[#9a7070] mb-4 font-medium">
        Showing <span className="font-bold text-[#5a3030]">{sorted.length}</span> review{sorted.length !== 1 ? "s" : ""}
        {categoryFilter !== "All" && <> in <span className="text-[#7a1a1a] font-bold">{categoryFilter}</span></>}
        {searchQuery && <> matching <span className="text-[#7a1a1a] font-bold">"{searchQuery}"</span></>}
        {" · "}sorted by <span className="font-bold text-[#5a3030]">{sortBy}</span>
      </p>

      {/* ── Review list ── */}
      {sorted.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4 text-center text-[#9a7070]">
          <Search size={32} className="opacity-30" />
          <p className="text-sm">No reviews match your filters.</p>
          <button
            onClick={() => { setSearch(""); setFilter("All"); }}
            className="text-xs font-semibold text-[#7a1a1a] hover:underline"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-5">
          {sorted.map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)}
        </div>
      )}

      {showModal && (
        <WriteReviewModal
          onClose={() => setModal(false)}
          onSubmit={handleNewReview}
        />
      )}
    </div>
  );
}