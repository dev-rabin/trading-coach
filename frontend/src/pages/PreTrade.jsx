import { useState } from "react";
import { AlertTriangle, Shield } from "lucide-react";

const strategies = ["Breakout", "Scalping", "Swing", "Momentum", "Reversal"];
const emotions = ["Calm", "Confident", "Fear", "Revenge", "FOMO"];

export default function PreTradeScreen() {
  const [selectedStrategy, setSelectedStrategy] = useState("Reversal");
  const [selectedEmotion, setSelectedEmotion] = useState("FOMO");

  return (
    <div className="text-white py-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 bg-white/5 rounded-lg">
          <Shield size={18} />
        </div>
        <div>
          <h1 className="text-xl font-semibold">Validate Your Trade</h1>
          <p className="text-gray-400 text-sm">
            Make sure this trade follows your rules
          </p>
        </div>
      </div>
      <div className=" grid lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* FORM CARD */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-6">
            {/* Strategy */}
            <div>
              <p className="text-sm text-gray-400 mb-2">Strategy</p>
              <div className="flex flex-wrap gap-2">
                {strategies.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    active={selectedStrategy === item}
                    onClick={() => setSelectedStrategy(item)}
                  />
                ))}
              </div>
            </div>

            {/* Emotion */}
            <div>
              <p className="text-sm text-gray-400 mb-2">Current Emotion</p>
              <div className="flex flex-wrap gap-2">
                {emotions.map((item) => (
                  <EmotionChip
                    key={item}
                    label={item}
                    active={selectedEmotion === item}
                    onClick={() => setSelectedEmotion(item)}
                  />
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Stop Loss (%)" placeholder="2.0" suffix="%" />
              <Input
                label="Risk/Reward (Optional)"
                placeholder="2.5"
                suffix="R"
              />
            </div>
          </div>

          {/* CTA */}
          <button className="w-full bg-green-400 text-black font-medium py-4 rounded-xl flex items-center justify-center gap-2">
            <AlertTriangle size={18} />
            Check This Trade
          </button>

          <DecisionScreen />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Behavior Alert */}
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5">
            <p className="text-yellow-400 text-xs mb-1">BEHAVIOR ALERT</p>
            <h3 className="font-medium">
              You broke discipline after your last loss
            </h3>
            <p className="text-gray-400 text-sm mt-1">
              Stay aware of emotional patterns
            </p>
          </div>

          {/* Focus */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
            <p className="text-sm font-medium mb-3">Today's Focus</p>

            <ul className="space-y-2 text-sm text-gray-400">
              <li>• Only take A+ setups</li>
              <li>• Max 3 trades today</li>
              <li>• Respect stop-loss strictly</li>
            </ul>
          </div>

          {/* Discipline */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
            <div className="flex justify-between items-center">
              <p className="text-sm">Discipline Score</p>
              <span className="text-lg font-semibold">72/100</span>
            </div>

            <div className="mt-3 h-2 bg-gray-800 rounded-full">
              <div className="h-full bg-yellow-500 rounded-full w-[72%]" />
            </div>

            <p className="text-xs text-gray-400 mt-2">Stay consistent</p>
          </div>

          {/* Weekly Stats */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
            <p className="text-sm mb-3">This Week</p>

            <div className="grid grid-cols-3 text-center text-sm">
              <div>
                <p className="text-lg font-semibold">7</p>
                <p className="text-gray-400 text-xs">Trades</p>
              </div>

              <div>
                <p className="text-green-400 text-lg font-semibold">57%</p>
                <p className="text-gray-400 text-xs">Win Rate</p>
              </div>

              <div>
                <p className="text-yellow-400 text-lg font-semibold">2</p>
                <p className="text-gray-400 text-xs">Warnings</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1 rounded-lg text-sm ${
        active
          ? "bg-white text-black"
          : "bg-white/5 text-gray-300 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function EmotionChip({ label, active, onClick }) {
  const styles = {
    Calm: "bg-green-500/20 text-green-400",
    Confident: "bg-green-500/20 text-green-400",
    Fear: "bg-red-500/20 text-red-400",
    Revenge: "bg-red-500/20 text-red-400",
    FOMO: "bg-red-500 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-lg text-sm ${
        active ? styles[label] : "bg-white/5 text-gray-300 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function Input({ label, placeholder, suffix }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <div className="relative">
        <input
          placeholder={placeholder}
          className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-green-500"
        />
        {suffix && (
          <span className="absolute right-3 top-2 text-gray-400 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function DecisionScreen() {
  return (
    <div className="w-full rounded-3xl p-3 text-center border border-red-500/30 bg-gradient-to-b from-red-500/10 to-black">
      <p className="text-sm tracking-widest text-red-400 mb-4">
        COACH DECISION
      </p>
      <h1 className="text-5xl font-bold text-red-400">AVOID</h1>
      <p className="text-gray-300 mt-4 text-lg">
        Robin, this is forced. Skip this trade.
      </p>
      <div className="h-px bg-white/10 my-2" />
      <p className="text-gray-400 text-sm">
        You're repeating a mistake. Wait for a better setup.
      </p>
    </div>
  );
}
