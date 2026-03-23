import { Brain } from "lucide-react";
import Stat from "../components/Home/Stat";

const HomeScreen = () => {
  return (
    <div className="min-h-screen text-white py-3 max-w-7xl mx-auto">
      <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-2 text-sm text-red-400 text-center">
        ⚠️ One bad trade can erase your day
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-400">Good morning,</p>
          <h1 className="text-2xl font-bold">Robin</h1>
        </div>
        <p className="text-gray-500 text-sm">March 22, 2026</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 🟢 LEFT (MAIN ACTION) */}
        <div className="lg:col-span-2 space-y-5">
          {/* AI COACH */}
          <div className="bg-[#111] border border-white/5 rounded-2xl p-6.5 flex items-center gap-5 hover:border-white/10 transition">
            <div className="relative">
              <div className="p-4 rounded-full bg-green-500/20 text-green-400">
                <Brain size={24} />
              </div>
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            </div>

            <div>
              <p className="text-green-400 text-xs tracking-wide">AI COACH</p>

              <h2 className="text-xl font-semibold mt-1">
                Robin, stay sharp. Don’t force trades today.
              </h2>

              <p className="text-gray-400 text-sm mt-1">
                You broke discipline after a loss yesterday.
              </p>
            </div>
          </div>

          {/* MEMORY */}
          <div className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-xl text-sm text-yellow-400">
            You ignored warnings 2 times this week
          </div>

          {/* 🔥 MAIN CTA */}
          <div>
            <button className="w-full bg-green-500 hover:bg-green-600 text-black font-bold p-4 rounded-xl text-lg shadow-lg shadow-green-500/20">
              Check Trade Before Entering
            </button>
            <p className="text-center text-xs text-gray-400 mt-2">
              Takes 10 seconds. Saves your capital.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-80">
            <Stat title="Win Rate" value="64%" />
            <Stat title="Total P&L" value="+$2,840" green />
            <Stat title="Risk/Reward" value="1.8R" />
            <Stat title="Trades" value="124" />
          </div>
        </div>

        {/* 🔴 RIGHT (CONTEXT PANEL) */}
        <div className="space-y-5">
          {/* DISCIPLINE */}
          <div className="bg-[#111] p-4 rounded-xl border border-gray-800">
            <p className="text-xs text-gray-400 mb-1">YOUR DISCIPLINE</p>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">72/100</h2>
              <span className="text-green-400 text-sm">+2 today</span>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full mt-3">
              <div className="bg-green-500 h-2 rounded-full w-[72%]" />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              You are improving — stay consistent
            </p>
          </div>

          {/* LAST MISTAKE */}
          <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
            <p className="text-xs text-red-400 mb-1">LAST MISTAKE</p>
            <p className="font-medium">
              You traded after a loss → broke discipline
            </p>
            <p className="text-sm text-gray-400 mt-1">
              This pattern leads to bigger losses
            </p>
            <p className="text-xs text-red-400 mt-2">
              Repeated 3 times this week
            </p>
          </div>

          {/* TODAY FOCUS */}
          <div className="bg-[#111] p-4 rounded-xl border border-gray-800">
            <p className="text-xs text-gray-400 mb-2">TODAY'S FOCUS</p>
            <ul className="space-y-1 text-sm">
              <li>• Only take A+ setups</li>
              <li>• Stop after 3 trades</li>
              <li>• Respect stop loss — no exceptions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FINAL INSIGHT */}
      <div className="p-2 mt-4 w-full text-center rounded-2xl bg-gradient-to-r from-green-500/20 to-black border border-green-500/30 text-green-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
        You perform better when calm.
      </div>
    </div>
  );
};


export default HomeScreen;
