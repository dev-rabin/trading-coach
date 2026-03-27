import { useState } from "react";
import { AlertTriangle, Shield } from "lucide-react";
import Chip from "../components/PreTrade/Chip";
import EmotionChip from "../components/PreTrade/EmotionChip";
import Input from "../components/PreTrade/Input";
import DecisionScreen from "../components/PreTrade/Decision";
import { useDispatch, useSelector } from "react-redux";
import { preTradePlan } from "../features/preTrade/preTradeSlice.js";

const strategies = ["Breakout", "Scalping", "Swing", "Momentum", "Reversal"];
const emotions = ["Calm", "Confident", "Fear", "Revenge", "FOMO"];

export default function PreTradeScreen() {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.preTrade);

  const [formData, setFormData] = useState({
    strategy: "Reversal",
    emotion: "FOMO",
    stopLoss: "",
    riskReward: "",
  });

  const [formErrors, setFormErrors] = useState({
    strategy: "",
    emotion: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFormErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleStrategySelect = (item) => {
    setSelectedStrategy(item);
    setFormData((prev) => ({ ...prev, strategy: item }));
  };

  const handleEmotionSelect = (item) => {
    setSelectedEmotion(item);
    setFormData((prev) => ({ ...prev, emotion: item }));
  };

  const handleSubmit = async () => {
    const errors = {};
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) return;
    try {
      await dispatch(preTradePlan(formData)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

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
          <div className="bg-[#111] border border-white/5 rounded-2xl p-7.5 space-y-6">
            <div>
              <p className="text-sm text-gray-400 mb-2">Strategy</p>
              <div className="flex flex-wrap gap-2">
                {strategies.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    active={selectedStrategy === item}
                    onClick={() => handleStrategySelect(item)}
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
                    onClick={() => handleEmotionSelect(item)}
                  />
                ))}
              </div>
            </div>

            {/* Inputs */}
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="stopLoss"
                label="Stop Loss (%)"
                placeholder="2.0"
                suffix="%"
                value={formData.stopLoss}
                onChange={handleChange}
                error={formErrors.stopLoss}
              />
              <Input
                name="riskReward"
                label="Risk/Reward (Optional)"
                placeholder="2.5"
                suffix="R"
                value={formData.riskReward}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-400 text-black font-medium py-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <AlertTriangle size={18} />
            {status === "loading" ? "Analyzing..." : "Check This Trade"}
          </button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

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
