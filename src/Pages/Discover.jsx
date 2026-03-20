import React from "react";
import { MapPin, Sparkles } from "lucide-react";
import TravelBlogs from "../Components/TravelBlogs";
import TripioMapSection from "../Components/TripioMapSection";

const Discover = () => {

    // 🔥 Simulating DB data (later fetch from backend)
    const locations = [
        { id: 1, name: "Paris", top: "35%", left: "48%", note: "Romantic getaway 🇫🇷" },
        { id: 2, name: "India", top: "55%", left: "68%", note: "Cultural diversity 🇮🇳" },
        { id: 3, name: "Brazil", top: "70%", left: "35%", note: "Vibrant festivals 🇧🇷" },
        { id: 4, name: "Australia", top: "75%", left: "85%", note: "Adventure & beaches 🇦🇺" },
        { id: 5, name: "USA", top: "40%", left: "25%", note: "Modern cities 🇺🇸" }
    ];

    return (
        <div className="min-h-screen bg-[#FFF8F0] text-[#5E0006]">

            <TripioMapSection />

            {/* Cards */}
            <TravelBlogs />
        </div>
    );
};

export default Discover;