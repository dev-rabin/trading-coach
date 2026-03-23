import {
  Brain,
  Activity,
} from "lucide-react";
import InsightCard from "../components/Analytics/InsightCard";
import StatCard from "../components/Analytics/StatCard";
import ProfitChart from "../components/Charts/ProfitChart";
import StrategyChart from "../components/Charts/StrategyChart";

export default function AnalyticsScreen() {
  return (
    <div className="py-6 text-white max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-3 ">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
            <Brain />
          </div>
          <div>
            <h1 className="text-xl font-semibold">
              You're improving, but still making emotional mistakes
            </h1>
            <p className="text-gray-400 text-sm">
              Based on your recent trading activity
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#111] rounded-lg p-1 text-sm">
          {["7D", "30D", "90D", "All Time"].map((t, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded-md ${
                t === "30D"
                  ? "bg-white text-black"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatCard title="Win Rate" value="62.4%" change="+4.2%" positive />
        <StatCard
          title="Total Profit"
          value="$8,420"
          change="+12.5%"
          positive
        />
        <StatCard title="Risk/Reward" value="1:2.4" change="+8.1%" positive />
        <StatCard title="Total Trades" value="111" change="-5.2%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="bg-[#060606] border border-gray-800 rounded-2xl p-5">
          <h2 className="mb-4">Profit Over Time</h2>
          <ProfitChart/>
        </div>

        <div className="bg-[#060606] border border-gray-800 rounded-2xl p-5">
          <h2 className="mb-4">Strategy Performance</h2>
          <StrategyChart/>
        </div>
      </div>

      {/* Insights */}
      <div className="space-y-6 mt-14">
        <div className="flex items-start gap-3 mb-6">
          <div className="p-2 rounded-lg bg-green-500/10 text-green-400">
            <Activity />
          </div>

          <div>
            <h2 className="text-xl font-semibold">
              Your Trading Psychology Report
            </h2>
            <p className="text-gray-400 text-sm">
              Understand what’s hurting your performance and what’s working
            </p>
          </div>
        </div>

        <div>
          <p className="text-red-400 mb-2">● Critical Issues</p>
          <InsightCard
            type="danger"
            title="Fear-driven trades are hurting you"
            desc="68% of your losing trades were exited early due to emotional reactions."
            suggestion="Use predefined stop-loss before entry"
            tag="High"
          />
        </div>

        <div>
          <p className="text-yellow-400 mb-2">● Warnings</p>
          <div className="grid md:grid-cols-2 gap-4">
            <InsightCard
              type="warning"
              title="Position sizing inconsistency"
              desc="You increase position size after losses, increasing risk."
              suggestion="Stick to fixed risk rules (1–2%)"
              tag="Medium"
            />
            <InsightCard
              type="warning"
              title="Overtrading on Mondays"
              desc="Monday trades have lower win rate than other days."
              suggestion="Reduce trade frequency on Mondays"
              tag="Medium"
            />
          </div>
        </div>

        <div>
          <p className="text-green-400 mb-2">● Strengths</p>
          <div className="grid md:grid-cols-2 gap-4">
            <InsightCard
              type="success"
              title="Breakout strategy is your strength"
              desc="You perform consistently well with breakout setups."
              tag="Low"
            />
            <InsightCard
              type="success"
              title="Strong discipline in trends"
              desc="You follow rules better in trending markets."
              tag="Low"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
