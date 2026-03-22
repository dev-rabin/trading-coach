import { useEffect, useState } from "react";

export default function AnalyticsScreen() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    setAnalytics({
      winRate: 67.4,
      totalProfit: 12847,
      riskReward: "1:2.4",
      totalTrades: 326,
      insights: [
        {
          type: "warning",
          title: "Fear-driven trades are hurting you",
          desc: "You've lost 68% of trades exited early.",
          action: "Use predefined stop-loss before entry",
          priority: "High",
        },
        {
          type: "success",
          title: "Breakout strategy is your strength",
          desc: "78% win rate with strong gains.",
          action: "Focus more on breakout setups",
          priority: "High",
        },
        {
          type: "warning",
          title: "Position sizing inconsistency",
          desc: "Position size increases after losses.",
          action: "Stick to fixed risk rules",
          priority: "High",
        },
        {
          type: "danger",
          title: "Overtrading on Mondays",
          desc: "3x more trades than average.",
          action: "Limit trades on Mondays",
          priority: "Medium",
        },
        {
          type: "info",
          title: "Optimal trading window identified",
          desc: "Best performance between 10:30–12 PM.",
          action: "Focus trades in this window",
          priority: "Medium",
        },
      ],
    });
  }, []);

  if (!analytics) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="min-h-screen text-white p-5 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Trading Analytics</h1>
          <p className="text-gray-400 text-sm">Personal Assistant</p>
        </div>
        <div className="text-sm text-green-400">● Live</div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card title="Win Rate" value={`${analytics.winRate}%`} highlight />
        <Card title="Total Profit" value={`$${analytics.totalProfit}`} />
        <Card title="Risk/Reward" value={analytics.riskReward} />
        <Card title="Total Trades" value={analytics.totalTrades} />
      </div>

      {/* Charts Section (Placeholder) */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-[#111] p-5 rounded-2xl h-64">
          <h2 className="text-sm text-gray-400 mb-3">Profit Over Time</h2>
          <div className="h-full flex items-center justify-center text-gray-500">
            Chart here
          </div>
        </div>

        <div className="bg-[#111] p-5 rounded-2xl h-64">
          <h2 className="text-sm text-gray-400 mb-3">Strategy Performance</h2>
          <div className="h-full flex items-center justify-center text-gray-500">
            Chart here
          </div>
        </div>
      </div>

      {/* AI Insights */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">AI Insights</h2>

        {analytics.insights.map((item, index) => (
          <InsightCard key={index} item={item} />
        ))}

        <div className="text-gray-500 text-sm mt-4">
          {analytics.insights.length} insights based on {analytics.totalTrades}{" "}
          trades
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Card({ title, value, highlight }) {
  return (
    <div
      className={`p-5 rounded-2xl bg-[#111] ${
        highlight ? "border border-green-500" : ""
      }`}
    >
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}

function InsightCard({ item }) {
  const colorMap = {
    warning: "border-yellow-500 bg-yellow-500/10",
    success: "border-green-500 bg-green-500/10",
    danger: "border-red-500 bg-red-500/10",
    info: "border-blue-500 bg-blue-500/10",
  };

  return (
    <div
      className={`p-5 rounded-2xl border ${
        colorMap[item.type]
      } flex justify-between`}
    >
      <div>
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-gray-400 text-sm mt-1">{item.desc}</p>

        <p className="text-green-400 text-sm mt-2">→ {item.action}</p>
      </div>

      <span className="text-xs bg-black px-3 py-1 rounded-full h-fit">
        {item.priority}
      </span>
    </div>
  );
}
