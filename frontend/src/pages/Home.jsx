import { Brain, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Stat from "../components/Home/Stat";
import { homeAPI } from "../features/home/homeAPI";
import Loader from "../components/layout/Loader";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useQuery({
    queryKey: ["home"],
    queryFn: homeAPI,
    keepPreviousData: true,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Loader />;
  if (error)
    return <p className="text-red-500 text-center mt-10">Error loading data</p>;

  const mistakeCount = data.behavior.revengeTrades + data.behavior.fomoTrades;

  const lastMistake =
    data.behavior.revengeTrades > 0
      ? "You traded after a loss → broke discipline"
      : data.behavior.fomoTrades > 0
        ? "You chased trades → FOMO detected"
        : "No major mistakes";
  return (
    <div className="min-h-screen text-white py-4 max-w-7xl mx-auto">
      <div className="mb-5 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm text-red-400 text-center">
        ⚠️ One bad trade can erase your day
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-400">{data.greeting},</p>
        </div>
        <p className="text-gray-500 text-sm">
          {new Date(data.date).toDateString()}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] border border-white/5 rounded-2xl py-10 px-6  flex items-center gap-5 shadow-[0_0_20px_rgba(0,0,0,0.4)] backdrop-blur hover:border-white/10 transition">
            <div className="relative">
              <div className="p-4 rounded-full bg-green-500/20 text-green-400">
                <Brain size={24} />
              </div>
              <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl opacity-40" />
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full animate-ping" />
            </div>
            <div>
              <p className="text-green-400 text-xs tracking-wide">AI COACH</p>
              <h2 className="text-xl font-semibold mt-2 leading-snug">
                {data.userName}, {data.coach.message}
              </h2>
              <p className="text-gray-400 text-sm mt-2">{data.coach.reason}</p>
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl text-sm text-yellow-400">
            You ignored warnings {mistakeCount} times this week
          </div>

          <button
            className="w-full relative overflow-hidden bg-green-400 hover:bg-green-600 text-black font-bold p-3 rounded-xl text-lg shadow-lg shadow-green-500/20 transition active:scale-[0.98] cursor-pointer"
            onClick={() => navigate("/pre-trade-plan")}
          >
            <span className="relative z-10">Check Trade Before Entering</span>
          </button>

          <p className="text-center text-xs text-gray-400">
            Takes 10 seconds. Saves your capital.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-90">
            <Stat title="Win Rate" value={`${data.stats.winRate}%`} />
            <Stat title="Total P&L" value={`₹${data.stats.totalPL}`} green />
            <Stat title="Trades" value={data.stats.totalTrades} />
            <Stat title="Risk/Reward" value="1.8R" />
          </div>

          <div className="p-3 flex items-center justify-center gap-2 text-center rounded-2xl bg-gradient-to-r from-green-500/20 to-black border border-green-500/30 text-green-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <TrendingUp size={20} className="text-green-400" />

            <span>{data.insight}</span>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-5">
          <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] py-8 px-6 rounded-xl border border-gray-800 shadow">
            <p className="text-xs text-gray-400 mb-2">YOUR DISCIPLINE</p>

            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {data.discipline.score}/100
              </h2>
              <span className="text-green-400 text-sm">
                +{data.discipline.rate} today
              </span>
            </div>

            <div className="w-full bg-gray-800 h-2 rounded-full mt-3 overflow-hidden">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${data.discipline.score}%` }}
              />
            </div>

            <p className="text-xs text-gray-400 mt-2">
              {data.discipline.message}
            </p>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-xl">
            <p className="text-xs text-red-400 mb-1">LAST MISTAKE</p>
            <p className="font-medium">{lastMistake}</p>
            <p className="text-sm text-gray-400 mt-1">{data.coach.reason}</p>
            <p className="text-xs text-red-400 mt-2">
              Repeated {mistakeCount} times this week
            </p>
          </div>

          <div className="bg-gradient-to-b from-[#111] to-[#0a0a0a] p-5 rounded-xl border border-gray-800">
            <p className="text-xs text-gray-400 mb-2">TODAY'S FOCUS</p>

            <ul className="space-y-1 text-sm">
              {data.focus.map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
