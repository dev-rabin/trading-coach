import { useMemo, useState } from "react";
import { AlertTriangle, Shield } from "lucide-react";
import Chip from "../components/PreTrade/Chip";
import EmotionChip from "../components/PreTrade/EmotionChip";
import Input from "../components/PreTrade/Input";
import DecisionScreen from "../components/PreTrade/Decision";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPreTrade,
  preTradePlan,
} from "../features/preTrade/preTradeSlice.js";
import { useQuery } from "@tanstack/react-query";
import { homeAPI } from "../features/home/homeAPI.js";

const strategies = ["Breakout", "Scalping", "Swing", "Momentum", "Reversal"];
const emotions = ["Calm", "Confident", "Fear", "Revenge", "FOMO"];

export default function PreTradeScreen() {
  const dispatch = useDispatch();
  const { status, error, data } = useSelector((state) => state.preTrade);

  const { data: homeData } = useQuery({
    queryKey: ["home"],
    queryFn: homeAPI,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const finalData = useMemo(
    () => ({
      ...(homeData || {}),
      ...(data || {}),
    }),
    [homeData, data],
  );

  const [formData, setFormData] = useState({
    strategy: "Reversal",
    emotion: "FOMO",
    stopLoss: "",
    riskReward: "",
  });

  const [selectedStrategy, setSelectedStrategy] = useState("Reversal");
  const [selectedEmotion, setSelectedEmotion] = useState("FOMO");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    try {
      await dispatch(preTradePlan(formData)).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setFormData({
      strategy: "Reversal",
      emotion: "FOMO",
      stopLoss: "",
      riskReward: "",
    });
    setSelectedStrategy("Reversal");
    setSelectedEmotion("FOMO");
    dispatch(clearPreTrade());
  };
  const mistakeCount =
    (finalData?.behavior?.revengeTrades || 0) +
    (finalData?.behavior?.fomoTrades || 0);

  return (
    <div className="text-white py-6 max-w-7xl mx-auto">
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

      <div className="grid lg:grid-cols-3 gap-6">
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

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="stopLoss"
                label="Stop Loss (%)"
                placeholder="2.0"
                suffix="%"
                value={formData.stopLoss}
                onChange={handleChange}
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

          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              className={`cursor-pointer flex-1 text-lg font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition ${
                status === "loading"
                  ? "bg-green-400/50 cursor-not-allowed"
                  : "bg-green-400 hover:bg-green-500 text-black"
              }`}
            >
              <AlertTriangle size={18} />
              {status === "loading" ? "AI is analyzing..." : "Check This Trade"}
            </button>

            <button
              onClick={handleReset}
              className="cursor-pointer px-5 py-4 rounded-xl border border-white/30 text-gray-400 hover:text-white hover:border-white/20 transition"
            >
              Reset
            </button>
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <DecisionScreen />
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-5">
            <p className="text-yellow-400 text-xs mb-1">BEHAVIOR ALERT</p>

            <h3 className="font-medium">
              {finalData?.behavior?.revengeTrades > 0
                ? "You traded emotionally after a loss"
                : finalData?.behavior?.fomoTrades > 0
                  ? "You are chasing trades (FOMO)"
                  : "No major behavioral issues"}
            </h3>

            <p className="text-gray-400 text-sm mt-1">
              {finalData?.coach?.reason || "Stay aware of emotional patterns"}
            </p>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
            <div className="flex justify-between items-center">
              <p className="text-sm">Discipline Trend</p>
              <span className="text-green-400">+2 Today</span>
            </div>

            <div className="mt-3 h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 rounded-full transition-all duration-500"
                style={{
                  width: `${finalData?.discipline?.score || 0}%`,
                }}
              />
            </div>

            <p className="text-xs text-gray-400 mt-2">
              {finalData?.discipline?.message || "Stay consistent"}
            </p>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
            <p className="text-sm mb-3">This Week</p>

            <div className="grid grid-cols-3 text-center text-sm">
              <div>
                <p className="text-lg font-semibold">
                  {finalData?.stats?.totalTrades || 0}
                </p>
                <p className="text-gray-400 text-xs">Trades</p>
              </div>

              <div>
                <p className="text-green-400 text-lg font-semibold">
                  {finalData?.stats?.winRate || 0}%
                </p>
                <p className="text-gray-400 text-xs">Win Rate</p>
              </div>

              <div>
                <p className="text-yellow-400 text-lg font-semibold">
                  {mistakeCount}
                </p>
                <p className="text-gray-400 text-xs">Warnings</p>
              </div>
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
            <p className="text-sm font-medium mb-3">Today's Focus</p>

            <ul className="space-y-2 text-sm text-gray-400">
              {finalData?.focus?.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
