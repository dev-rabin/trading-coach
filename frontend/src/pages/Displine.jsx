import { useState } from "react";

export default function DisciplineScreen() {
  const [data] = useState({
    score: 87,
    streak: 6,
    best: 12,
    weekly: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    completedDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    today: "Sat",

    stats: {
      avoided: 23,
      rules: 89,
      mistakes: 4,
    },
  });

  return (
    <div className="min-h-screen text-white p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Discipline</h1>
          <p className="text-gray-400 text-sm">Stay focused. Trade better.</p>
        </div>

        <span className="text-orange-400 text-sm border border-orange-500 px-3 py-1 rounded-full">
          ↑ Top 15%
        </span>
      </div>

      {/* Main Card */}
      <div className="bg-[#111] rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-center">
        {/* Circle */}
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 rounded-full border-8 border-gray-800"></div>
          <div
            className="absolute inset-0 rounded-full border-8 border-orange-500"
            style={{
              clipPath: `inset(${100 - data.score}% 0 0 0)`,
            }}
          ></div>

          <div className="absolute inset-0 flex items-center justify-center text-xl font-bold">
            {data.score}%
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🔥 {data.streak} Day Streak
          </h2>
          <p className="text-gray-400 text-sm">
            Personal best: {data.best} days
          </p>

          <div className="bg-[#1a1a1a] rounded-xl p-3 text-sm text-gray-300">
            "Discipline beats motivation every time."
          </div>

          {/* Weekly Tracker */}
          <div className="flex gap-3 mt-3">
            {data.weekly.map((day) => {
              const isDone = data.completedDays.includes(day);
              const isToday = data.today === day;

              return (
                <div
                  key={day}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-semibold
                    ${
                      isDone
                        ? "bg-green-600"
                        : isToday
                          ? "border-2 border-orange-500 text-orange-400"
                          : "bg-[#1a1a1a] text-gray-500"
                    }`}
                >
                  {day[0]}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <StatCard
          title="Trades Avoided"
          value={data.stats.avoided}
          color="green"
        />
        <StatCard
          title="Rules Followed"
          value={data.stats.rules}
          color="green"
        />
        <StatCard
          title="Mistakes Made"
          value={data.stats.mistakes}
          color="red"
        />
      </div>

      {/* Progress */}
      <div className="bg-[#111] rounded-2xl p-6">
        <div className="flex justify-between">
          <h3 className="font-semibold">Today's Progress</h3>
          <span className="text-green-400 text-sm">80%</span>
        </div>

        <div className="mt-3 h-2 bg-gray-800 rounded-full">
          <div className="h-full bg-orange-500 rounded-full w-[80%]"></div>
        </div>

        <div className="flex justify-between text-xs text-gray-400 mt-3">
          <span>Morning</span>
          <span>Pre-Trade</span>
          <span>Risk</span>
          <span>Trade</span>
          <span>Review</span>
        </div>
      </div>

      {/* Achievements */}
      <div className="space-y-4">
        <h3 className="font-semibold">Achievements</h3>

        <Achievement
          title="Rule Keeper"
          desc="Follow rules for 5 days"
          unlocked
        />

        <Achievement
          title="Trade Sniper"
          desc="Avoid 20 impulsive trades"
          unlocked
        />

        <div className="bg-[#111] p-6 rounded-2xl text-center text-gray-400">
          Complete today's checklist to extend your streak!
        </div>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function StatCard({ title, value, color }) {
  return (
    <div className="bg-[#111] p-5 rounded-2xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2
        className={`text-2xl font-bold mt-2 ${
          color === "red" ? "text-red-400" : "text-green-400"
        }`}
      >
        {value}
      </h2>
    </div>
  );
}

function Achievement({ title, desc, unlocked }) {
  return (
    <div
      className={`p-5 rounded-2xl border ${
        unlocked
          ? "border-orange-500 bg-orange-500/10"
          : "border-gray-700 bg-[#111]"
      } flex justify-between`}
    >
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>

      {unlocked && (
        <span className="text-xs bg-orange-500 px-3 py-1 rounded-full">
          Unlocked
        </span>
      )}
    </div>
  );
}
