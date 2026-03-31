import { BarChart3, IndianRupee, Pencil, Save, TrendingUp } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { updateProfile } from "../features/auth/authSlice";
import { homeAPI } from "../features/home/homeAPI";
import { analyticsAPI } from "../features/analytics/analyticsAPI";
import { useNavigate } from "react-router-dom";
import Loader from "../components/layout/Loader";
import StatCard from "../components/Analytics/StatCard";

export default function IdentityScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, updateStatus } = useSelector((state) => state.auth);

  const { data: homeData, isLoading: homeLoading } = useQuery({
    queryKey: ["home"],
    queryFn: homeAPI,
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ["analytics", "7d"],
    queryFn: () => analyticsAPI("7d"),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    enabled: !!user,
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSave = async () => {
    await dispatch(updateProfile(form));
    setEditMode(false);
  };

  const discipline = homeData?.discipline?.score || 0;
  const revenge = homeData?.behavior?.revengeTrades || 0;
  const fomo = homeData?.behavior?.fomoTrades || 0;

  const stats = homeData?.stats || {};
  const strategies = analytics?.strategies || [];
  const ai = analytics?.aiInsights || {};

  const bestStrategies = strategies.filter((s) => s.winRate >= 60);
  const worstStrategies = strategies.filter((s) => s.winRate === 0);

  let identity = "Disciplined Trader";
  let identityColor = "text-green-400";

  if (discipline < 30) {
    identity = "Inconsistent Trader ⚠️";
    identityColor = "text-red-400";
  } else if (revenge > 3) {
    identity = "Emotional Trader";
    identityColor = "text-yellow-400";
  }

  let ctaText = "Maintain Discipline →";
  let ctaColor = "bg-green-500 hover:bg-green-600 text-black";

  if (discipline < 30) {
    ctaText = "Improve Discipline Now →";
    ctaColor = "bg-red-500 hover:bg-red-600 text-black";
  } else if (discipline < 70) {
    ctaText = "Stabilize Your Trading →";
    ctaColor = "bg-yellow-400 hover:bg-yellow-500 text-black";
  }

  if (homeLoading || analyticsLoading) {
    return <Loader />;
  }

  return (
    <div className="text-white max-w-7xl mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          {editMode ? (
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="text-2xl font-semibold bg-transparent border-b border-green-700 focus:outline-none"
            />
          ) : (
            <h1 className="text-2xl font-semibold">{user?.name || "Trader"}</h1>
          )}
          <p className="text-gray-400 text-sm">
            Your trading identity & behavior
          </p>
        </div>

        <button
          onClick={() => (editMode ? handleSave() : setEditMode(true))}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 transition"
        >
          {editMode ? <Save size={16} /> : <Pencil size={16} />}
          {updateStatus === "loading"
            ? "Saving..."
            : editMode
              ? "Save"
              : "Edit"}
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-4.5">
            <p className="text-sm text-gray-400 mb-1">Identity</p>
            <p className={`text-lg font-semibold ${identityColor}`}>
              {identity}
            </p>
          </div>

          <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5">
            <p className="text-sm text-gray-400 mb-2">Discipline Score</p>
            <h2 className="text-2xl font-semibold text-green-400">
              {discipline}/100
            </h2>

            <div className="mt-3 h-2 bg-gray-800 rounded-full">
              <div
                className="h-full bg-green-500"
                style={{ width: `${discipline}%` }}
              />
            </div>
          </div>

          <div className="bg-[#0f0f0f] border border-white/5 rounded-2xl p-5">
            <p className="text-sm text-gray-400 mb-3">Behavior Patterns</p>

            <div className="flex justify-between text-sm">
              <span>Revenge</span>
              <span className="text-red-400">
                {revenge > 3 ? "High" : "Low"}
              </span>
            </div>

            <div className="flex justify-between text-sm mt-2">
              <span>FOMO</span>
              <span className="text-yellow-400">
                {fomo > 1 ? "Medium" : "Low"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2 flex flex-col gap-6 h-full">
          <div className="grid md:grid-cols-3 gap-4">
            <StatCard
              title="Win Rate"
              value={`${stats.winRate || 0}%`}
              icon={TrendingUp}
            />
            <StatCard
              title="Trades"
              value={`${stats.totalTrades || 0}`}
              icon={BarChart3}
            />
            <StatCard
              title="Total Profit"
              value={`₹${stats.totalPL || 0}`}
              icon={IndianRupee}
            />
          </div>

          <div className="bg-gradient-to-r from-red-500/10 to-black border border-red-500/20 rounded-2xl p-5">
            <p className="text-xs text-red-400 mb-1">BEHAVIOR INSIGHT</p>
            <p className="text-gray-300 text-sm">
              {ai.mistakes || "No insights"}
            </p>
          </div>

          <div className="flex justify-between gap-5">
            <div className="bg-[#0f0f0f] border border-green-500/20 rounded-2xl p-5 w-1/2">
              <p className="text-sm text-gray-400 mb-3">What Works</p>
              <ul className="space-y-2 text-green-400 text-sm">
                {bestStrategies.length ? (
                  bestStrategies.map((s, i) => (
                    <li key={i}>
                      • {s.name} ({s.winRate}%)
                    </li>
                  ))
                ) : (
                  <li>No strong strategy yet</li>
                )}
              </ul>
            </div>

            <div className="bg-[#0f0f0f] border border-amber-500/20 rounded-2xl p-5 w-1/2">
              <p className="text-sm text-gray-400 mb-3">Avoid Strategies</p>
              <ul className="space-y-2 text-yellow-400 text-sm">
                {worstStrategies.length ? (
                  worstStrategies.map((s, i) => <li key={i}>• {s.name}</li>)
                ) : (
                  <li>All performing</li>
                )}
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/10 to-black border border-green-500/20 rounded-2xl p-5">
            <p className="text-xs text-green-400 mb-1">IMPROVEMENT PLAN</p>
            <p className="text-gray-300 text-sm">
              {ai.improvements || "No suggestions"}
            </p>
          </div>

          <button
            onClick={() => navigate("/analytics")}
            className={`w-full font-bold p-3 rounded-xl text-lg transition-all duration-300 ${ctaColor} hover:scale-[1.01] hover:-translate-y-1 cursor-pointer`}
          >
            {ctaText}
          </button>
        </div>
      </div>
    </div>
  );
}
