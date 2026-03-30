import { Brain, Activity } from "lucide-react";
import InsightCard from "../components/Analytics/InsightCard";
import StatCard from "../components/Analytics/StatCard";
import ProfitChart from "../components/Charts/ProfitChart";
import StrategyChart from "../components/Charts/StrategyChart";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { analyticsAPI } from "../features/analytics/analyticsAPI";
import Loader from "../components/layout/Loader";

export default function AnalyticsScreen() {
  const [range, setRange] = useState("30D");

  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["analytics", range],
    queryFn: () => analyticsAPI(range),
    keepPreviousData: true,
  });

  {
    isFetching && (
      <p className="text-gray-400 text-sm mt-2">Updating data...</p>
    );
  }
  if (isLoading) {
    return <Loader/>
  }
  if (isError)
    return <div className="text-red-500 p-6">Error loading data</div>;

  const critical = [];
  const warnings = [];
  const strengths = [];

  data.insights.forEach((text) => {
    const lower = text.toLowerCase();

    if (
      lower.includes("poor") ||
      lower.includes("not working") ||
      lower.includes("avoid")
    ) {
      critical.push({
        type: "danger",
        title: text,
      });
    } else if (lower.includes("low") || lower.includes("too")) {
      warnings.push({
        type: "warning",
        title: text,
      });
    } else {
      strengths.push({
        type: "success",
        title: text,
      });
    }
  });

  return (
    <div className="py-6 text-white max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3 ">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
            <Brain />
          </div>
          <div>
            <h1 className="text-xl font-semibold">
              Your Trading Behavior Summary
            </h1>
            <p className="text-gray-400 text-sm">
              Last Emotion: {data.lastEmotion} | Strategy: {data.lastStrategy}
            </p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex bg-[#111] rounded-lg p-1 text-sm">
          {["7D", "30D", "90D", "All"].map((t, i) => (
            <button
              key={i}
              onClick={() => setRange(t)}
              className={`px-3 py-1 rounded-md ${
                range === t
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <StatCard title="Win Rate" value={`${data.winRate}%`} />
        <StatCard title="Total Profit" value={`₹${data.totalProfit}`} />
        <StatCard title="Risk/Reward" value={`1:${data.riskReward}`} />
        <StatCard title="Total Trades" value={data.totalTrades} />
        <StatCard
          title="Consistency"
          value={`${data.consistencyScore}%`}
          change={
            data.consistencyScore > 70
              ? "Stable"
              : data.consistencyScore > 40
                ? "Moderate"
                : "Unstable"
          }
          positive={data.consistencyScore > 60}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#060606] border border-gray-800 rounded-2xl p-5">
          <h2 className="mb-4">Profit by Strategy</h2>
          <StrategyChart data={data.strategies} />
        </div>

        <div className="bg-[#060606] border border-gray-800 rounded-2xl p-5">
          <h2 className="mb-4">Performance Overview</h2>
          <ProfitChart data={data.profitTimeline} />
        </div>
      </div>

      {/* AI INSIGHTS */}
      <div className="space-y-4 mb-10">
        <InsightCard
          type="danger"
          title="Key Mistakes"
          desc={data.aiInsights.mistakes}
        />
        <InsightCard
          type="success"
          title="What Works"
          desc={data.aiInsights.whatWorks}
        />
        <InsightCard
          type="warning"
          title="Improvements"
          desc={data.aiInsights.improvements}
        />
      </div>

      {/* INSIGHTS */}
      <div className="space-y-6 mt-10">
        <div className="flex items-start gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
            <Activity />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Behavioral Insights</h2>
          </div>
        </div>

        {/* Critical */}
        {critical.length > 0 && (
          <div>
            <p className="text-red-400 mb-2">● Critical Issues</p>
            <div className="grid md:grid-cols-2 gap-4">
              {critical.map((item, i) => (
                <InsightCard key={i} {...item} />
              ))}
            </div>
          </div>
        )}

        {/* Warnings */}
        {warnings.length > 0 && (
          <div>
            <p className="text-yellow-400 mb-2">● Warnings</p>
            <div className="grid md:grid-cols-2 gap-4">
              {warnings.map((item, i) => (
                <InsightCard key={i} {...item} />
              ))}
            </div>
          </div>
        )}

        {/* Strengths */}
        {strengths.length > 0 && (
          <div>
            <p className="text-green-400 mb-2">● Strengths</p>
            <div className="grid md:grid-cols-2 gap-4">
              {strengths.map((item, i) => (
                <InsightCard key={i} {...item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
