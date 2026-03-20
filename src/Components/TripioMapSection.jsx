import { MapPin } from "lucide-react";

const locations = [
    { place: "New York (USA)", top: "42%", left: "23%" },
    { place: "Los Angeles (USA)", top: "47%", left: "18%" },
    { place: "Rio de Janeiro (Brazil)", top: "72%", left: "30%" },
    { place: "London (UK)", top: "35%", left: "46%" },
    { place: "Paris (France)", top: "38%", left: "49%" },
    { place: "Cairo (Egypt)", top: "52%", left: "53%" },
    // { place: "Nairobi (Kenya)", top: "65%", left: "55%" },
    { place: "Dubai (UAE)", top: "55%", left: "60%" },
    { place: "Goa (India)", top: "62%", left: "56%" },
    { place: "Bangkok (Thailand)", top: "60%", left: "68%" },
    { place: "Tokyo (Japan)", top: "44%", left: "84%" },
    { place: "Sydney (Australia)", top: "78%", left: "86%" },
];

export default function TripioMapSection() {
    const handleClick = (place) => {
        // Replace with navigation later
        alert(`Opening blog for ${place}`);
    };

    return (
        <section className="w-full bg-[#5E0006] text-[#FFF8F0] py-20 px-6 md:px-16">
            <div className="max-w-7xl mx-auto">

                {/* HEADING */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-semibold">
                        Explore Trips Around the World
                    </h2>
                    <p className="mt-3 opacity-70">
                        Discover blogs shared by travelers globally
                    </p>
                </div>

                {/* MAP CONTAINER */}
                <div className="relative w-full h-[400px] md:h-[500px] bg-white rounded-2xl overflow-hidden shadow-md">

                    {/* WORLD MAP IMAGE */}
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
                        alt="World Map"
                        className="w-full h-full object-cover opacity-80"
                    />

                    {/* PINS */}
                    {locations.map((loc, i) => (
                        <div
                            key={i}
                            className="absolute cursor-pointer group"
                            style={{ top: loc.top, left: loc.left }}
                            onClick={() => handleClick(loc.place)}
                        >
                            {/* PIN ICON */}
                            <div className="relative flex flex-col items-center">

                                {/* PULSE EFFECT */}
                                <span className="absolute inline-flex h-6 w-6 rounded-full bg-[#5E0006] opacity-30 animate-ping"></span>

                                {/* ICON */}
                                <MapPin className="text-[#5E0006] bg-[#FFF8F0] rounded-full p-1 shadow-md" />

                                {/* TOOLTIP */}
                                <div className="opacity-0 group-hover:opacity-100 transition bg-[#5E0006] text-[#FFF8F0] text-xs px-3 py-1 rounded-md mt-2 whitespace-nowrap">
                                    {loc.place}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}