import { useState, useEffect, useRef, useCallback } from "react";
import {
  MapPin, Navigation, Users, X, MessageCircle, UserPlus,
  Wifi, WifiOff, ChevronRight, Filter, Star, Globe,
  AlertCircle, Locate, SlidersHorizontal, Heart, Shield,
  Compass, RefreshCw,
} from "lucide-react";

// ── Leaflet loaded via CDN in useEffect ──────────────────────────────────────
// No npm install needed — loaded dynamically

// ── Mock nearby travelers (offset from user's real position) ─────────────────
const MOCK_TRAVELERS = [
  {
    id: 1, name: "Priya Sharma", handle: "@priyatravels",
    avatar: "PS", avatarBg: "from-rose-400 to-pink-600",
    bio: "Solo traveler · 18 countries", interest: ["Hiking", "Photography"],
    rating: 4.9, trips: 18, verified: true, active: true,
    offsetLat: 0.003, offsetLng: 0.004,
  },
  {
    id: 2, name: "Rahul Kapoor", handle: "@rahul_onroad",
    avatar: "RK", avatarBg: "from-amber-400 to-orange-500",
    bio: "Backpacker · Budget travel expert", interest: ["Food", "Culture"],
    rating: 4.7, trips: 12, verified: true, active: true,
    offsetLat: -0.002, offsetLng: 0.006,
  },
  {
    id: 3, name: "Ananya Mehta", handle: "@ananya.wanders",
    avatar: "AM", avatarBg: "from-teal-400 to-cyan-600",
    bio: "Adventure seeker · Trek lover", interest: ["Trekking", "Camping"],
    rating: 4.8, trips: 24, verified: false, active: true,
    offsetLat: 0.005, offsetLng: -0.003,
  },
  {
    id: 4, name: "Vikram Nair", handle: "@vikram_nomad",
    avatar: "VN", avatarBg: "from-violet-400 to-purple-600",
    bio: "Digital nomad · 3 years on road", interest: ["Art", "Food"],
    rating: 4.6, trips: 31, verified: true, active: false,
    offsetLat: -0.006, offsetLng: -0.005,
  },
  {
    id: 5, name: "Sneha Iyer", handle: "@sneha.roams",
    avatar: "SI", avatarBg: "from-lime-400 to-green-600",
    bio: "Wildlife photographer", interest: ["Wildlife", "Photography"],
    rating: 4.9, trips: 9, verified: true, active: true,
    offsetLat: 0.001, offsetLng: -0.007,
  },
  {
    id: 6, name: "Dev Malhotra", handle: "@devexplores",
    avatar: "DM", avatarBg: "from-sky-400 to-blue-600",
    bio: "Road trip enthusiast", interest: ["Road Trip", "Music"],
    rating: 4.5, trips: 15, verified: false, active: false,
    offsetLat: -0.008, offsetLng: 0.002,
  },
];

const RADIUS_OPTIONS = [1, 2, 5, 10, 25];
const INTEREST_FILTERS = ["All", "Hiking", "Food", "Photography", "Trekking", "Culture", "Wildlife"];

// ── Haversine distance (km) ───────────────────────────────────────────────────
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ── Companion Card ────────────────────────────────────────────────────────────
function CompanionCard({ traveler, dist, onSelect, selected }) {
  const [requested, setRequested] = useState(false);

  return (
    <div
      onClick={() => onSelect(traveler)}
      className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all duration-200 hover:shadow-md group
        ${selected ? "border-[#7a1a1a] ring-2 ring-[#7a1a1a]/15 shadow-md" : "border-[#f0e4db] hover:border-[#c0857a]"}`}
    >
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${traveler.avatarBg} flex items-center justify-center text-sm font-bold text-white ring-2 ring-white shadow`}>
            {traveler.avatar}
          </div>
          {traveler.active && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="text-sm font-bold text-[#1e0a0a]">{traveler.name}</p>
            {traveler.verified && (
              <Shield size={12} className="text-[#7a1a1a] shrink-0" />
            )}
          </div>
          <p className="text-xs text-[#9a7070] truncate">{traveler.bio}</p>

          <div className="flex items-center gap-3 mt-1.5">
            <span className="flex items-center gap-1 text-xs text-[#9a7070]">
              <MapPin size={10} className="text-[#c0857a]" />
              {dist < 1 ? `${Math.round(dist * 1000)}m` : `${dist.toFixed(1)}km`} away
            </span>
            <span className="flex items-center gap-1 text-xs text-amber-500">
              <Star size={10} fill="currentColor" /> {traveler.rating}
            </span>
            <span className="flex items-center gap-1 text-xs text-[#9a7070]">
              <Globe size={10} /> {traveler.trips} trips
            </span>
          </div>

          {/* Interest tags */}
          <div className="flex gap-1 flex-wrap mt-2">
            {traveler.interest.map((tag) => (
              <span key={tag} className="text-[10px] bg-[#fdf8f4] border border-[#e8d5cc] text-[#7a1a1a] px-2 py-0.5 rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Status badge */}
        <div className={`shrink-0 flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded-full ${traveler.active ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-400"}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${traveler.active ? "bg-green-500 animate-pulse" : "bg-gray-300"}`} />
          {traveler.active ? "Online" : "Away"}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-3 pt-3 border-t border-[#f5ede8]">
        <button
          onClick={(e) => { e.stopPropagation(); setRequested(r => !r); }}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all ${requested
              ? "bg-[#f0e4db] text-[#7a1a1a]"
              : "bg-[#7a1a1a] text-white hover:bg-[#5a0e0e]"
            }`}
        >
          <UserPlus size={13} />
          {requested ? "Requested" : "Connect"}
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-[#e8d5cc] text-[#5a3030] hover:bg-[#fdf8f4] transition-colors"
        >
          <MessageCircle size={13} /> Message
        </button>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function FindCompanions() {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});
  const userMarkerRef = useRef(null);
  const pulseCircle = useRef(null);

  const [geoStatus, setGeoStatus] = useState("idle");    // idle | requesting | granted | denied | unsupported
  const [userPos, setUserPos] = useState(null);
  const [travelers, setTravelers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [radius, setRadius] = useState(10);
  const [interestFilter, setFilter] = useState("All");
  const [showPanel, setShowPanel] = useState(true);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  // ── Load Leaflet from CDN ─────────────────────────────────────────────────
  useEffect(() => {
    if (window.L) { setLeafletLoaded(true); return; }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.onload = () => setLeafletLoaded(true);
    document.head.appendChild(script);
  }, []);

  // ── Request geolocation ───────────────────────────────────────────────────
  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) { setGeoStatus("unsupported"); return; }
    setGeoStatus("requesting");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoStatus("granted");
      },
      () => {
        // Fallback: use Mumbai as demo position
        setUserPos({ lat: 19.076, lng: 72.877 });
        setGeoStatus("granted");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  // ── Auto-request on mount ─────────────────────────────────────────────────
  useEffect(() => { requestLocation(); }, [requestLocation]);

  // ── Compute nearby travelers from userPos ─────────────────────────────────
  useEffect(() => {
    if (!userPos) return;
    const withDist = MOCK_TRAVELERS.map((t) => ({
      ...t,
      lat: userPos.lat + t.offsetLat,
      lng: userPos.lng + t.offsetLng,
      dist: getDistance(userPos.lat, userPos.lng, userPos.lat + t.offsetLat, userPos.lng + t.offsetLng),
    })).sort((a, b) => a.dist - b.dist);
    setTravelers(withDist);
  }, [userPos]);

  // ── Init / update map ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!leafletLoaded || !userPos || !mapRef.current) return;
    const L = window.L;

    // Init map once
    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, { zoomControl: false }).setView([userPos.lat, userPos.lng], 14);

      // Tile layer — warm CartoDB style to match travelMates theme
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: "© OpenStreetMap © CARTO",
        maxZoom: 19,
      }).addTo(mapInstance.current);

      L.control.zoom({ position: "bottomright" }).addTo(mapInstance.current);
    }

    const map = mapInstance.current;

    // ── User marker (pulsing) ──
    if (userMarkerRef.current) userMarkerRef.current.remove();
    if (pulseCircle.current) pulseCircle.current.remove();

    // Accuracy circle
    pulseCircle.current = L.circle([userPos.lat, userPos.lng], {
      radius: radius * 1000,
      color: "#7a1a1a",
      fillColor: "#7a1a1a",
      fillOpacity: 0.05,
      weight: 1.5,
      dashArray: "6 4",
    }).addTo(map);

    // User pin (custom HTML marker)
    const userIcon = L.divIcon({
      className: "",
      html: `
        <div style="position:relative;width:48px;height:48px;display:flex;align-items:center;justify-content:center">
          <div style="position:absolute;width:48px;height:48px;border-radius:50%;background:rgba(122,26,26,0.18);animation:tm-ping 1.6s ease-out infinite"></div>
          <div style="position:absolute;width:32px;height:32px;border-radius:50%;background:rgba(122,26,26,0.25);animation:tm-ping 1.6s ease-out infinite;animation-delay:0.4s"></div>
          <div style="width:20px;height:20px;border-radius:50%;background:#7a1a1a;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.25);position:relative;z-index:1"></div>
        </div>`,
      iconSize: [48, 48],
      iconAnchor: [24, 24],
    });

    userMarkerRef.current = L.marker([userPos.lat, userPos.lng], { icon: userIcon })
      .addTo(map)
      .bindPopup("<b style='color:#7a1a1a'>You are here</b>", { className: "tm-popup" });

    map.setView([userPos.lat, userPos.lng], 14);
  }, [leafletLoaded, userPos, radius]);

  // ── Traveler markers ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!leafletLoaded || !mapInstance.current || travelers.length === 0) return;
    const L = window.L;
    const map = mapInstance.current;

    // Clear old markers
    Object.values(markersRef.current).forEach((m) => m.remove());
    markersRef.current = {};

    travelers.forEach((t) => {
      if (t.dist > radius) return;

      // gradient color based on avatarBg class hint
      const colorMap = {
        "from-rose-400": "#fb7185", "from-amber-400": "#fbbf24",
        "from-teal-400": "#2dd4bf", "from-violet-400": "#a78bfa",
        "from-lime-400": "#a3e635", "from-sky-400": "#38bdf8",
      };
      const colorKey = Object.keys(colorMap).find(k => t.avatarBg.includes(k));
      const color = colorMap[colorKey] || "#7a1a1a";

      const icon = L.divIcon({
        className: "",
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer">
            <div style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,${color},${color}cc);border:3px solid white;box-shadow:0 3px 10px rgba(0,0,0,0.2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white">
              ${t.avatar}
            </div>
            <div style="width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:7px solid white;margin-top:-1px;filter:drop-shadow(0 1px 1px rgba(0,0,0,0.15))"></div>
          </div>`,
        iconSize: [36, 44],
        iconAnchor: [18, 44],
      });

      const marker = L.marker([t.lat, t.lng], { icon })
        .addTo(map)
        .bindPopup(
          `<div style="font-family:sans-serif;min-width:140px">
            <b style="color:#1e0a0a;font-size:13px">${t.name}</b>
            <p style="color:#9a7070;font-size:11px;margin:2px 0">${t.handle}</p>
            <p style="color:#7a1a1a;font-size:11px;font-weight:600">📍 ${t.dist < 1 ? Math.round(t.dist * 1000) + "m" : t.dist.toFixed(1) + "km"} away</p>
            <p style="color:#5a3030;font-size:11px;margin-top:4px">${t.bio}</p>
          </div>`,
          { maxWidth: 200 }
        );

      marker.on("click", () => setSelected(t));
      markersRef.current[t.id] = marker;
    });
  }, [travelers, radius, leafletLoaded]);

  // ── Pan map to selected ───────────────────────────────────────────────────
  useEffect(() => {
    if (!selected || !mapInstance.current) return;
    mapInstance.current.flyTo([selected.lat, selected.lng], 15, { animate: true, duration: 0.8 });
    markersRef.current[selected.id]?.openPopup();
  }, [selected]);

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
    requestLocation();
  };

  const filtered = travelers.filter((t) => {
    if (t.dist > radius) return false;
    if (interestFilter !== "All" && !t.interest.includes(interestFilter)) return false;
    return true;
  });

  // ── Permission screen ─────────────────────────────────────────────────────
  if (geoStatus === "idle" || geoStatus === "requesting") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-6 text-center px-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#f0e4db] to-[#e8d5cc] flex items-center justify-center">
            <Compass size={40} className="text-[#7a1a1a]" />
          </div>
          {geoStatus === "requesting" && (
            <div className="absolute inset-0 rounded-full border-2 border-[#7a1a1a]/30 animate-ping" />
          )}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-[#1e0a0a]">Find Nearby Travelers</h2>
          <p className="text-[#9a7070] text-sm mt-2 max-w-sm leading-relaxed">
            {geoStatus === "requesting"
              ? "Detecting your location…"
              : "Enable location to discover fellow travelers within your radius and connect in real time."}
          </p>
        </div>
        {geoStatus === "idle" && (
          <button
            onClick={requestLocation}
            className="flex items-center gap-2 bg-[#7a1a1a] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#5a0e0e] transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            <Locate size={16} /> Enable Location
          </button>
        )}
        {geoStatus === "requesting" && (
          <div className="flex items-center gap-2 text-[#9a7070] text-sm">
            <div className="w-4 h-4 border-2 border-[#7a1a1a] border-t-transparent rounded-full animate-spin" />
            Requesting permission…
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {/* Keyframe injection */}
      <style>{`
        @keyframes tm-ping {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .tm-popup .leaflet-popup-content-wrapper {
          border-radius: 12px !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
          border: 1px solid #f0e4db !important;
        }
        .tm-popup .leaflet-popup-tip { background: white !important; }
        .leaflet-control-zoom a {
          border-radius: 8px !important;
          border: 1px solid #e8d5cc !important;
          color: #7a1a1a !important;
        }
      `}</style>

      <div className="flex flex-col h-[calc(100vh-64px)] -m-8 overflow-hidden">

        {/* ── Top bar ── */}
        <div className="flex items-center gap-3 px-5 py-3 bg-white border-b border-[#f0e4db] shrink-0 flex-wrap gap-y-2 z-10">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 text-sm font-bold text-[#1e0a0a]">
              <Users size={16} className="text-[#7a1a1a]" />
              Find Companions
            </div>
            <span className="text-xs bg-[#f0e4db] text-[#7a1a1a] font-semibold px-2 py-0.5 rounded-full">
              {filtered.length} nearby
            </span>
          </div>

          {/* Location status */}
          <div className="flex items-center gap-1.5 text-xs text-green-600 bg-green-50 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            <Wifi size={11} /> Location active
          </div>

          {/* Radius selector */}
          <div className="flex items-center gap-1.5 ml-auto">
            <span className="text-xs text-[#9a7070] font-medium hidden sm:block">Radius:</span>
            <div className="flex gap-1">
              {RADIUS_OPTIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => setRadius(r)}
                  className={`text-xs px-2.5 py-1 rounded-lg font-semibold transition-all ${radius === r ? "bg-[#7a1a1a] text-white" : "bg-[#f0e4db] text-[#7a1a1a] hover:bg-[#e8d5cc]"}`}
                >
                  {r}km
                </button>
              ))}
            </div>
          </div>

          {/* Interest filter */}
          <div className="flex items-center gap-1 overflow-x-auto">
            <Filter size={13} className="text-[#9a7070] shrink-0" />
            {INTEREST_FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`shrink-0 text-xs px-2.5 py-1 rounded-lg font-medium transition-all ${interestFilter === f ? "bg-[#7a1a1a] text-white" : "text-[#9a7070] hover:text-[#5a3030]"}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Refresh + toggle panel */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded-lg hover:bg-[#f0e4db] text-[#9a7070] hover:text-[#7a1a1a] transition-colors"
              title="Refresh"
            >
              <RefreshCw size={15} className={isRefreshing ? "animate-spin" : ""} />
            </button>
            <button
              onClick={() => setShowPanel(p => !p)}
              className="hidden lg:flex items-center gap-1.5 text-xs font-medium text-[#7a1a1a] bg-[#fdf8f4] border border-[#e8d5cc] px-3 py-1.5 rounded-lg hover:bg-[#f0e4db] transition-colors"
            >
              <SlidersHorizontal size={13} />
              {showPanel ? "Hide" : "Show"} list
            </button>
          </div>
        </div>

        {/* ── Map + Panel ── */}
        <div className="flex flex-1 overflow-hidden relative">

          {/* ── MAP ── */}
          <div className="flex-1 relative">
            <div ref={mapRef} className="w-full h-full" />

            {/* Selected user floating card */}
            {selected && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-32px)] max-w-sm z-[999] bg-white rounded-2xl border border-[#f0e4db] shadow-xl p-4 animate-slide-up">
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-3 right-3 p-1 rounded-lg hover:bg-[#f0e4db] text-[#9a7070]"
                >
                  <X size={14} />
                </button>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${selected.avatarBg} flex items-center justify-center text-sm font-bold text-white ring-2 ring-white shadow`}>
                    {selected.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-bold text-[#1e0a0a]">{selected.name}</p>
                      {selected.verified && <Shield size={12} className="text-[#7a1a1a]" />}
                    </div>
                    <p className="text-xs text-[#9a7070]">{selected.bio}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="flex items-center gap-0.5 text-xs text-[#c0857a]">
                        <MapPin size={10} />
                        {selected.dist < 1 ? `${Math.round(selected.dist * 1000)}m` : `${selected.dist.toFixed(1)}km`} away
                      </span>
                      <span className="flex items-center gap-0.5 text-xs text-amber-500">
                        <Star size={10} fill="currentColor" /> {selected.rating}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#7a1a1a] text-white rounded-xl text-xs font-semibold hover:bg-[#5a0e0e] transition-colors">
                    <UserPlus size={13} /> Connect
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-[#e8d5cc] text-[#5a3030] rounded-xl text-xs font-semibold hover:bg-[#fdf8f4] transition-colors">
                    <MessageCircle size={13} /> Message
                  </button>
                </div>
              </div>
            )}

            {/* "You are here" floating label */}
            {userPos && (
              <div className="absolute top-3 left-3 z-[999] flex items-center gap-2 bg-white/90 backdrop-blur border border-[#f0e4db] rounded-xl px-3 py-1.5 shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-[#7a1a1a] animate-pulse" />
                <span className="text-xs font-semibold text-[#1e0a0a]">You are here</span>
              </div>
            )}
          </div>

          {/* ── Companion list panel ── */}
          {showPanel && (
            <div className="w-80 shrink-0 bg-[#fdf8f4] border-l border-[#f0e4db] flex flex-col overflow-hidden hidden lg:flex">
              <div className="px-4 py-3 border-b border-[#f0e4db] flex items-center justify-between">
                <p className="text-sm font-bold text-[#1e0a0a]">
                  Nearby Travelers
                  <span className="ml-2 text-xs font-medium text-[#9a7070]">within {radius}km</span>
                </p>
                <span className="text-xs bg-[#7a1a1a] text-white font-semibold px-2 py-0.5 rounded-full">
                  {filtered.length}
                </span>
              </div>

              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
                    <Compass size={28} className="text-[#c0857a] opacity-50" />
                    <p className="text-sm text-[#9a7070]">No travelers in range</p>
                    <button
                      onClick={() => setRadius(r => Math.min(r * 2, 25))}
                      className="text-xs text-[#7a1a1a] font-semibold hover:underline"
                    >
                      Expand radius →
                    </button>
                  </div>
                ) : (
                  filtered.map((t) => (
                    <CompanionCard
                      key={t.id}
                      traveler={t}
                      dist={t.dist}
                      onSelect={setSelected}
                      selected={selected?.id === t.id}
                    />
                  ))
                )}
              </div>

              {/* Legend */}
              <div className="px-4 py-3 border-t border-[#f0e4db] bg-white">
                <div className="flex items-center gap-4 text-[10px] text-[#9a7070]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7a1a1a]" /> You
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400" /> Online
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300" /> Away
                  </span>
                  <span className="flex items-center gap-1.5 ml-auto">
                    <Shield size={10} /> Verified
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { opacity:0; transform: translate(-50%,16px); }
          to   { opacity:1; transform: translate(-50%,0); }
        }
        .animate-slide-up { animation: slide-up 0.25s ease; }
      `}</style>
    </>
  );
}