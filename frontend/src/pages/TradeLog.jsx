import { useState } from "react";
import TradeHistoryScreen from "./TradeHistory";

const strategies = [
  "Breakout",
  "Scalping",
  "Swing",
  "Momentum",
  "Mean Reversion",
];
const emotions = ["Confident", "Neutral", "Anxious", "FOMO", "Calm"];

export default function TradeLogScreen() {
  const [selectedStrategy, setSelectedStrategy] = useState("Breakout");
  const [selectedEmotion, setSelectedEmotion] = useState("Confident");

  return (
    <div className="min-h-screen bg-black text-white px-6 py-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-2xl font-semibold">Trade Log</h1>
            <p className="text-gray-400 text-sm">
              Track your trades and build better habits
            </p>
          </div>

          {/* FORM CARD */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-6">
            {/* Inputs */}
            <div className="grid md:grid-cols-3 gap-4">
              <Input label="Entry Price" placeholder="0.00" />
              <Input label="Exit Price" placeholder="0.00" />
              <Input label="Quantity" placeholder="0" />
            </div>

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
              <p className="text-sm text-gray-400 mb-2">Emotion</p>
              <div className="flex flex-wrap gap-2">
                {emotions.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    active={selectedEmotion === item}
                    onClick={() => setSelectedEmotion(item)}
                  />
                ))}
              </div>
            </div>

            {/* Notes */}
            <div>
              <p className="text-sm text-gray-400 mb-2">
                Notes <span className="text-gray-500">(optional)</span>
              </p>
              <textarea
                placeholder="Add your thaughts."
                className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-emerald-500"
              />
            </div>

            {/* Button */}
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold px-6 py-2 rounded-xl">
              Save Trade
            </button>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <ReflectionCard />
          {/* Quick Stats */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
            <h3 className="text-sm text-gray-400 mb-4">Quick Stats</h3>

            <StatRow label="Total P/L" value="+$175.00" positive />
            <StatRow label="Win Rate" value="50%" />
            <StatRow label="Total Trades" value="4" />
          </div>

          {/* Strategy Stats */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
            <h3 className="text-sm text-gray-400 mb-4">By Strategy</h3>

            <StatRow label="Momentum" value="+$322.50" positive />
            <StatRow label="Breakout" value="+$195.00" positive />
            <StatRow label="Scalping" value="-$112.50" />
            <StatRow label="Swing" value="-$230.00" />
          </div>
        </div>
      </div>

      {/* HISTORY LIST */}
      <div className="space-y-4 max-w-7xl mx-auto my-9">
        <TradeHistoryScreen />
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function Input({ label, placeholder }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <input
        placeholder={placeholder}
        className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-500"
      />
    </div>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm transition ${
        active
          ? "bg-emerald-500 text-black"
          : "bg-white/5 text-gray-300 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}

function StatRow({ label, value, positive }) {
  return (
    <div className="flex justify-between text-sm mb-2">
      <span className="text-gray-400">{label}</span>
      <span className={positive ? "text-emerald-600" : "text-white/50"}>
        {value}
      </span>
    </div>
  );
}

function Progress({ label, value, total, positive }) {
  const percent = (value / total) * 100;

  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-400">{label}</span>
        <span className={positive ? "text-emerald-400" : "text-red-400"}>
          {value}
        </span>
      </div>

      <div className="h-2 bg-gray-800 rounded-full">
        <div
          className={`h-full rounded-full ${
            positive ? "bg-emerald-500" : "bg-red-500"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

const ReflectionCard = () => {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl p-4.5">
      {/* Title */}
      <p className="text-xs text-gray-400 mb-2">YOUR PATTERNS</p>
      {/* Main Insight */}
      <h3 className="text-sm font-medium text-blue-400 leading-relaxed">
        You perform better when trading in a calm state
      </h3>

      {/* Divider */}
      <div className="border-t border-gray-800 my-4"></div>

      {/* Secondary Insight */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">Last 5 Trades</span>
        <span className="text-emerald-400 font-medium">
          3 Profit <span className="text-white">•</span>{" "}
          <span className="text-orange-400">2 Loss</span>
        </span>
      </div>
    </div>
  );
};
