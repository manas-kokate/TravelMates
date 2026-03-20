import { useEffect, useState } from "react";
import { Send, Sparkles, Map, Wallet } from "lucide-react";
import TripioImg from "../assets/tripio.png";


const prompts = [
  "Plan a 3-day Goa trip under ₹10,000",
  "Suggest a solo backpacking trip in Himachal",
  "Romantic weekend getaway near Pune",
];

export default function TripioSection() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = prompts[index];
    let speed = isDeleting ? 35 : 65;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.substring(0, text.length + 1));
        if (text === current) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setText(current.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % prompts.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <section className="w-full bg-[#5E0006] text-[#FFF8F0] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-2 justify-center pl-20">

        {/* LEFT CONTENT */}
        <div className="w-full md:w-[55%]">
          <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
            Confused where to start?
            <br />
            <span className="opacity-80">
              Tripio is here to plan with you.
            </span>
          </h2>

          <p className="mt-4 text-lg opacity-70 max-w-xl">
            Tell Tripio your idea — get a complete travel plan instantly.
            Smart, fast and tailored to your budget.
          </p>

          {/* INPUT UI */}
          <div className="mt-8 bg-[#FFF8F0] text-[#5E0006] border border-[#FFF8F0]/20 rounded-2xl p-3 shadow-md max-w-xl flex items-center gap-3">
            <Sparkles className="w-5 h-5 opacity-70" />

            <input
              type="text"
              value={text}
              readOnly
              className="bg-transparent outline-none flex-1 text-[#5E0006] placeholder-[#5E0006]/50"
              placeholder="Describe your trip..."
            />

            <button className="flex items-center gap-2 bg-[#5E0006] text-[#FFF8F0] px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition">
              <Send size={16} />
              Generate
            </button>
          </div>

          {/* FEATURES */}
          <div className="flex flex-wrap gap-4 mt-6 text-sm opacity-80">
            <div className="flex items-center gap-2">
              <Map size={16} />
              <span>Smart itineraries</span>
            </div>

            <div className="flex items-center gap-2">
              <Wallet size={16} />
              <span>Budget planning</span>
            </div>

            <div className="flex items-center gap-2">
              <Sparkles size={16} />
              <span>AI-powered suggestions</span>
            </div>
          </div>

          {/* CTA */}
          <button className="mt-6 flex items-center gap-2 bg-[#FFF8F0] text-[#5E0006] px-6 py-3 rounded-xl font-medium hover:scale-105 transition shadow-sm">
            Start Planning
            <Send size={16} />
          </button>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full md:w-[40%] flex justify-start items-center relative">

          {/* SPEECH BUBBLE */}
          <div className="absolute top-0 left-14 md:left-16 -translate-y-10 bg-[#FFF8F0] text-[#5E0006] px-4 py-2 rounded-xl shadow-md border border-[#5E0006]/20 animate-bounce-slow">
            <p className="text-sm font-medium">Hi! I am Tripio 👋</p>

            <div className="absolute -bottom-2 left-6 w-3 h-3 bg-[#FFF8F0] border-l border-b border-[#5E0006]/20 rotate-45"></div>
          </div>

          {/* IMAGE */}
          <img
            src={TripioImg}
            alt="Tripio AI Bot"
            className="w-[360px] md:w-[100%] object-contain -ml-12 md:-ml-35 animate-float"
          />
        </div>
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        .animate-bounce-slow {
          animation: bounceSlow 3s infinite;
        }

        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </section>
  );
}