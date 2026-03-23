import { useState } from "react";
import TradeHistoryScreen from "./TradeHistory";
import Input from "../components/TradeLog/Input";
import Chip from "../components/TradeLog/Chip";
import StatRow from "../components/TradeLog/StatRow";
import ReflectionCard from "../components/TradeLog/ReflectionCard";

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
                className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-green-500"
              />
            </div>

            {/* Button */}
            <button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-xl">
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