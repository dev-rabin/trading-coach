import { useState } from "react";

export default function TradeHistoryScreen() {
  const [trades] = useState([
    {
      date: "Mar 22, 2026",
      pair: "BTC/USD",
      strategy: "Breakout",
      emotion: "Confident",
      decision: "PROCEED",
      pnl: "+4.25%",
    },
    {
      date: "Mar 21, 2026",
      pair: "ETH/USD",
      strategy: "Mean Reversion",
      emotion: "Anxious",
      decision: "AVOID",
      pnl: "+0.00%",
    },
    {
      date: "Mar 20, 2026",
      pair: "SOL/USD",
      strategy: "Momentum",
      emotion: "FOMO",
      decision: "PROCEED",
      pnl: "-2.80%",
    },
    {
      date: "Mar 19, 2026",
      pair: "BTC/USD",
      strategy: "Scalping",
      emotion: "Calm",
      decision: "PROCEED",
      pnl: "+1.15%",
    },
  ]);

  return (
    <div className="min-h-screen text-white space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Trade History</h1>
        <p className="text-gray-400 text-sm">
          Review your past decisions and outcomes
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex gap-3">
          <select className="bg-[#111] border border-gray-700 rounded-xl px-4 py-2 text-sm">
            <option>All Strategies</option>
          </select>

          <select className="bg-[#111] border border-gray-700 rounded-xl px-4 py-2 text-sm">
            <option>All Time</option>
          </select>
        </div>

        <input
          placeholder="Search trades..."
          className="bg-[#111] border border-gray-700 rounded-xl px-4 py-2 text-sm w-full md:w-64"
        />
      </div>

      {/* Trades Grid */}
      <div className="grid md:grid-cols-3 gap-4">
        {trades.map((trade, index) => (
          <TradeCard key={index} trade={trade} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Stat({ title, value, highlight }) {
  return (
    <div className="bg-[#111] p-5 rounded-2xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2
        className={`text-xl font-bold mt-2 ${
          highlight ? "text-green-400" : ""
        }`}
      >
        {value}
      </h2>
    </div>
  );
}

function TradeCard({ trade }) {
  const isProfit = trade.pnl.includes("+");

  return (
    <div className="bg-[#111] p-5 rounded-2xl border border-white/5">
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-xs">{trade.date}</p>
          <h3 className="font-semibold">{trade.pair}</h3>
        </div>

        <span
          className={`text-sm px-3 py-1 rounded-full ${
            isProfit
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {trade.pnl}
        </span>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
        <div>
          <p className="text-gray-500">STRATEGY</p>
          <p>{trade.strategy}</p>
        </div>

        <div>
          <p className="text-gray-500">EMOTION</p>
          <p>{trade.emotion}</p>
        </div>
      </div>

      {/* Decision */}
      <div className="mt-4">
        <span
          className={`text-xs px-3 py-1 rounded-full ${
            trade.decision === "PROCEED"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {trade.decision}
        </span>
      </div>
    </div>
  );
}
