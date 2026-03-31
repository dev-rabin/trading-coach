import { useState } from "react";
import TradeHistoryScreen from "./TradeHistory";
import StatRow from "../components/TradeLog/StatRow";
import ReflectionCard from "../components/TradeLog/ReflectionCard";
import { useQuery } from "@tanstack/react-query";
import { fetchTradesAPI } from "../features/trades/tradeAPI";
import LogTradeForm from "../components/TradeLog/LogTradeForm";

export default function TradeLogScreen() {
  const [strategy, setStrategy] = useState("All");
  const [range, setRange] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["trades", strategy, range, search, page],
    queryFn: () => fetchTradesAPI({ strategy, range, search, page }),
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  const trades = data?.data || [];
  const totalPages = data?.totalPages || 1;
  const lastFiveTrades = [...trades].slice(0, 5);

  const profits = lastFiveTrades.filter((t) => {
    const pl = t.profitLoss ?? ((t.exitPrice - t.entryPrice) * t.quantity || 0);
    return pl > 0;
  }).length;

  const losses = lastFiveTrades.filter((t) => {
    const pl = t.profitLoss ?? ((t.exitPrice - t.entryPrice) * t.quantity || 0);
    return pl < 0;
  }).length;

  let pattern = "You're building consistency";

  if (profits > losses) {
    pattern = "You are performing well in recent trades";
  } else if (losses > profits) {
    pattern = "Recent trades show inconsistency, review your strategy";
  }

  const lastEmotion = lastFiveTrades[0]?.emotion;

  if (lastEmotion === "Calm") {
    pattern = "You perform better when trading in a calm state";
  } else if (lastEmotion === "FOMO") {
    pattern = "FOMO is affecting your recent trades";
  } else if (lastEmotion === "Confident") {
    pattern = "Confidence is helping your performance";
  }

  const totalPL = trades.reduce((acc, t) => {
    const calculatedPL =
      t.exitPrice && t.entryPrice && t.quantity
        ? (t.exitPrice - t.entryPrice) * t.quantity
        : 0;
    const pl = t.profitLoss ?? calculatedPL;
    return acc + pl;
  }, 0);

  const wins = trades.filter((t) => {
    const pl = t.profitLoss ?? (t.exitPrice - t.entryPrice) * t.quantity;
    return pl > 0;
  }).length;

  const winRate = trades.length ? Math.round((wins / trades.length) * 100) : 0;
  const strategyMap = {};

  trades.forEach((t) => {
    const calculatedPL =
      t.exitPrice && t.entryPrice && t.quantity
        ? (t.exitPrice - t.entryPrice) * t.quantity
        : 0;
    const pl = t.profitLoss ?? calculatedPL;

    if (!strategyMap[t.strategy]) {
      strategyMap[t.strategy] = 0;
    }
    strategyMap[t.strategy] += pl;
  });

  const strategyList = Object.entries(strategyMap).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="min-h-screen bg-black text-white py-6 max-w-7xl mx-auto">
      <div className="mb-5">
        <h1 className="text-2xl font-semibold">Trade Log</h1>
        <p className="text-gray-400 text-sm">
          Track your trades and build better habits
        </p>
      </div>
      <div className=" grid lg:grid-cols-3 gap-6 ">
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">
          <LogTradeForm />
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          <ReflectionCard pattern={pattern} losses={losses} profits={profits} />
          <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
            <h3 className="text-sm text-gray-400 mb-4">Quick Stats</h3>

            <StatRow
              label="Total P/L"
              value={`₹${totalPL}`}
              positive={totalPL >= 0}
            />
            <StatRow label="Win Rate" value={`${winRate}%`} />
            <StatRow label="Total Trades" value={trades.length} />
          </div>

          <div className="bg-[#111] border border-white/5 rounded-2xl p-5">
            <h3 className="text-sm text-gray-400 mb-4">By Strategy</h3>

            {strategyList.length > 0 ? (
              strategyList.map((s, i) => (
                <StatRow
                  key={i}
                  label={s.name}
                  value={`₹${s.value}`}
                  positive={s.value >= 0}
                />
              ))
            ) : (
              <p className="text-gray-500 text-sm">No data</p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 max-w-7xl mx-auto my-9">
        <TradeHistoryScreen
          trades={trades}
          isLoading={isLoading}
          isFetching={isFetching}
          strategy={strategy}
          setStrategy={setStrategy}
          range={range}
          setRange={setRange}
          search={search}
          setSearch={setSearch}
          page={page}
          setPage={setPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
