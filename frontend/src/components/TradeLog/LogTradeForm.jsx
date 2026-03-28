import Input from "../../components/TradeLog/Input";
import Chip from "../../components/TradeLog/Chip.jsx";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logTradeAPI } from "../../features/trades/tradeAPI";

const strategies = [
  "Breakout",
  "Scalping",
  "Swing",
  "Momentum",
  "Mean Reversion",
];

const emotions = ["Confident", "Neutral", "Anxious", "FOMO", "Calm"];

export default function LogTradeForm() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    symbol: "",
    entryPrice: "",
    exitPrice: "",
    quantity: "",
    notes: "",
    tradeType: "",
  });

  const [selectedStrategy, setSelectedStrategy] = useState("Breakout");
  const [selectedEmotion, setSelectedEmotion] = useState("Confident");
  const [tradeType, setTradeType] = useState("BUY");

  const { mutate, isLoading } = useMutation({
    mutationFn: logTradeAPI,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["trades"] });
      setForm({
        symbol: "",
        entryPrice: "",
        exitPrice: "",
        quantity: "",
        notes: "",
        tradetype: "",
      });
      setSelectedStrategy("Breakout");
      setSelectedEmotion("Confident");
    },
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      entryPrice: Number(form.entryPrice),
      exitPrice: Number(form.exitPrice),
      quantity: Number(form.quantity),
      strategy: selectedStrategy,
      emotion: selectedEmotion,
      tradeType,
    };

    mutate(payload);
  };

  return (
    <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-6">
      {/* Inputs */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-400 mb-2">Trade Type</p>
          <div className="flex gap-2">
            {["BUY", "SELL"].map((type) => (
              <Chip
                key={type}
                label={type}
                active={tradeType === type}
                onClick={() => setTradeType(type)}
              />
            ))}
          </div>
        </div>
        <Input
          label="Symbol"
          value={form.symbol}
          onChange={(e) => handleChange("symbol", e.target.value)}
          placeholder="e.g. NIFTY"
        />
        <Input
          label="Entry Price"
          value={form.entryPrice}
          onChange={(e) => handleChange("entryPrice", e.target.value)}
          placeholder="0.00"
        />
        <Input
          label="Exit Price"
          value={form.exitPrice}
          onChange={(e) => handleChange("exitPrice", e.target.value)}
          placeholder="0.00"
        />
        <Input
          label="Quantity"
          value={form.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
          placeholder="0"
        />
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
          value={form.notes}
          onChange={(e) => handleChange("notes", e.target.value)}
          placeholder="Add your thoughts."
          className="w-full bg-black border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-green-500 min-h-[92px]"
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-xl disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Trade"}
      </button>
    </div>
  );
}
