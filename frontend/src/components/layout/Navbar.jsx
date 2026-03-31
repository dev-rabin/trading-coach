import {
  BarChart3,
  Brain,
  ShieldCheck,
  Menu,
  X,
  Notebook,
  Home,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../features/auth/authSlice";
import { useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Pre-Trade", icon: Brain, href: "/pre-trade-plan" },
  { name: "Trade Log", icon: Notebook, href: "/trade-log" },
  { name: "Analytics", icon: BarChart3, href: "/analytics" },
];

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/login");
  };
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500/15 text-green-400 ring-1 ring-green-500/20">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              <span className="text-white">Trade</span>
              <span className="text-green-400">Mind</span>
            </h1>
            <p className="text-[11px] text-gray-400 md:text-xs">
              AI discipline assistant
            </p>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                className={`group relative flex items-center gap-2 px-4 py-2 text-sm transition
                            ${
                              location.pathname === item.href
                                ? "text-green-400"
                                : "text-gray-300 hover:text-white"
                            }`}
              >
                <span>{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <div className="relative" onClick={() => setOpen(!open)}>
            <div className="flex items-center gap-3 cursor-pointer bg-[#0f0f0f] px-3 py-2 rounded-xl border border-gray-800 hover:border-green-400 transition">
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 font-semibold">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>

              <p className="text-sm text-green-400">{user?.name || "Trader"}</p>
            </div>

            {open && (
              <div className="absolute right-0 mt-3 w-44 bg-[#0f0f0f] text-white border border-gray-800 rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => navigate("/analytics")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-green-600 transition cursor-pointer"
                >
                  Analytics
                </button>

                <button
                  onClick={() => navigate("/trade-log")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-green-600 transition cursor-pointer"
                >
                  Trade History
                </button>

                <button
                  onClick={() => navigate("/profile")}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-green-600 transition cursor-pointer"
                >
                  Profile
                </button>

                <div className="border-t border-gray-800" />

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-white md:hidden"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-black md:hidden">
          <div className="space-y-2 px-4 py-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl bg-white/[0.03] px-4 py-3 text-sm text-gray-200"
                >
                  <Icon size={18} className="text-gray-400" />
                  <span>{item.name}</span>
                </a>
              );
            })}

            <div className="pt-2">
              <div className="mb-3 inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
                Live Coach Active
              </div>

              <button className="w-full rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white">
                Check Trade
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
