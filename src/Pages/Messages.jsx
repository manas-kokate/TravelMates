import { useState } from "react";
import { Send, MapPin } from "lucide-react";

const chats = [
    {
        id: 1,
        name: "Aarav",
        trip: "Manali • Mar 12-16",
        online: true,
    },
    {
        id: 2,
        name: "Priya",
        trip: "Goa • Apr 2-6",
        online: false,
    },
];

export default function Messages() {
    const [active, setActive] = useState(chats[0]);
    const [msg, setMsg] = useState("");

    return (
        <div className="h-[calc(100vh-80px)] mt-[10px] flex bg-gradient-to-br from-[#F5EDE6] to-[#EFE3D9]">

            {/* SIDEBAR */}
            <div className="w-[26%] p-4">
                <div className="h-full bg-white/60 backdrop-blur-xl rounded-3xl p-4 shadow-md">

                    <h2 className="text-lg font-semibold mb-4">Connections</h2>

                    <div className="space-y-3">
                        {chats.map((c) => (
                            <div
                                key={c.id}
                                onClick={() => setActive(c)}
                                className={`p-3 rounded-2xl cursor-pointer transition ${active.id === c.id
                                    ? "bg-white shadow-sm"
                                    : "hover:bg-white/50"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <img
                                            src={`https://i.pravatar.cc/150?img=${c.id}`}
                                            className="w-11 h-11 rounded-full"
                                        />
                                        {c.online && (
                                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold">{c.name}</h3>
                                        <p className="text-xs text-gray-500">{c.trip}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CHAT AREA */}
            <div className="flex-1 flex justify-center items-center p-6">

                <div className="w-[70%] h-full bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg flex flex-col">

                    {/* HEADER */}
                    <div className="p-5 border-b flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-lg">{active.name}</h3>
                            <p className="text-xs text-gray-500">{active.trip}</p>
                        </div>

                        <button className="text-sm bg-[#5E0006] text-white px-4 py-1.5 rounded-full">
                            View Trip
                        </button>
                    </div>

                    {/* CHAT CONTENT */}
                    <div className="flex-1 p-6 space-y-4 overflow-y-auto">

                        {/* TRIP CARD */}
                        <div className="bg-[#5E0006]/5 border border-[#5E0006]/20 p-4 rounded-2xl flex items-center gap-3">
                            <MapPin size={18} className="text-[#5E0006]" />
                            <div>
                                <p className="text-sm font-medium">Manali Trip</p>
                                <p className="text-xs text-gray-500">Mar 12–16 • Budget ₹8k</p>
                            </div>
                        </div>

                        {/* MESSAGES */}
                        <div className="bg-white p-3 rounded-2xl shadow-sm w-fit">
                            Found a cozy hostel near Mall Road!
                        </div>

                        <div className="bg-[#5E0006] text-white p-3 rounded-2xl w-fit ml-auto">
                            That’s perfect! Book it.
                        </div>

                    </div>

                    {/* INPUT BAR */}
                    <div className="p-4">
                        <div className="flex items-center gap-2 bg-white rounded-full shadow-md px-4 py-2">

                            <input
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                placeholder="Plan your trip together..."
                                className="flex-1 outline-none text-sm bg-transparent"
                            />

                            <button className="bg-[#5E0006] text-white p-2 rounded-full">
                                <Send size={16} />
                            </button>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}