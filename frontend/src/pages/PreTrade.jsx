import { useState } from "react";

const emotionsList = [
  { label: "Fear", emoji: "😨" },
  { label: "Revenge", emoji: "😡" },
  { label: "Calm", emoji: "😌" },
  { label: "Confident", emoji: "😎" },
];

export default function PreTradeScreen() {
  const [strategy, setStrategy] = useState("Scalping");
  const [emotion, setEmotion] = useState("Calm");
  const [stopLoss, setStopLoss] = useState("");
  const [decision, setDecision] = useState("PROCEED");
  const [message, setMessage] = useState("Robin, you're calm. Take the trade.");

  const handleCheckTrade = () => {
    // 🔥 Dummy logic (replace with API later)
    if (!stopLoss || stopLoss <= 0) {
      setDecision("AVOID");
      setMessage("Robin, no stop loss. Skip.");
      return;
    }

    if (emotion === "Revenge") {
      setDecision("AVOID");
      setMessage("Robin, revenge trade. Stay out.");
      return;
    }

    if (emotion === "Fear") {
      setDecision("AVOID");
      setMessage("Robin, fear detected. Skip.");
      return;
    }

    setDecision("PROCEED");
    setMessage("Robin, clean setup. Execute properly.");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 text-white">
      <div className="w-full max-w-md space-y-6">
        {/* Card */}
        <div className="bg-[#111] rounded-2xl p-6 shadow-lg space-y-5">
          {/* Strategy */}
          <div>
            <label className="text-sm text-gray-400">Strategy</label>
            <select
              value={strategy}
              onChange={(e) => setStrategy(e.target.value)}
              className="w-full mt-2 bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 outline-none"
            >
              <option>Scalping</option>
              <option>Intraday</option>
              <option>Swing</option>
            </select>
          </div>

          {/* Emotion */}
          <div>
            <label className="text-sm text-gray-400">
              How are you feeling?
            </label>

            <div className="grid grid-cols-4 gap-3 mt-3">
              {emotionsList.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setEmotion(item.label)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border transition
                    ${
                      emotion === item.label
                        ? "border-blue-500 bg-[#1a1f2e]"
                        : "border-gray-700 bg-[#1a1a1a]"
                    }`}
                >
                  <span className="text-xl">{item.emoji}</span>
                  <span className="text-xs mt-1 text-gray-300">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Stop Loss */}
          <div>
            <label className="text-sm text-gray-400">Stop Loss (%)</label>
            <input
              type="number"
              value={stopLoss}
              onChange={(e) => setStopLoss(e.target.value)}
              placeholder="e.g., 2"
              className="w-full mt-2 bg-[#1a1a1a] border border-gray-700 rounded-xl px-4 py-3 outline-none"
            />
          </div>
        </div>

        {/* Decision Card */}
        <div
          className={`rounded-2xl p-6 text-center transition-all duration-300 ${
            decision === "PROCEED"
              ? "bg-gradient-to-r from-green-700 to-green-500"
              : "bg-gradient-to-r from-red-700 to-red-500"
          }`}
        >
          <h1 className="text-3xl font-bold tracking-wide">{decision}</h1>
          <p className="mt-2 text-sm text-white/90">{message}</p>
        </div>

        {/* Button */}
        <button
          onClick={handleCheckTrade}
          className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold shadow-md"
        >
          Check Trade
        </button>
      </div>
    </div>
  );
}
