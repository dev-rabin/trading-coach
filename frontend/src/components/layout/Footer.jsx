import { BarChart3, Brain, Flame, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 md:grid-cols-4 md:px-6">
        {/* Brand */}
        <div>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-green-500/15 text-green-400 ring-1 ring-green-500/20">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-white">
                Trading Coach
              </h2>
              <p className="text-xs text-gray-400">AI discipline assistant</p>
            </div>
          </div>

          <p className="max-w-xs text-sm leading-6 text-gray-400">
            Built to help traders make better decisions before execution through
            AI coaching, risk checks, and discipline tracking.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">Product</h3>
          <div className="space-y-3 text-sm text-gray-400">
            <a
              href="/pre-trade"
              className="flex items-center gap-2 hover:text-white"
            >
              <Brain size={16} />
              Pre-Trade Check
            </a>
            <a
              href="/analytics"
              className="flex items-center gap-2 hover:text-white"
            >
              <BarChart3 size={16} />
              Analytics
            </a>
            <a
              href="/discipline"
              className="flex items-center gap-2 hover:text-white"
            >
              <Flame size={16} />
              Discipline
            </a>
          </div>
        </div>

        {/* Value */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">
            Why it matters
          </h3>
          <div className="space-y-3 text-sm text-gray-400">
            <p>Reduce impulsive trades</p>
            <p>Build rule-based execution</p>
            <p>Track discipline over time</p>
            <p>Get real-time coaching</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div>
          <h3 className="mb-4 text-sm font-semibold text-white">
            Stay disciplined
          </h3>
          <p className="mb-4 text-sm leading-6 text-gray-400">
            Consistency beats emotion. Review your setup before every trade.
          </p>

          <button className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500">
            Start Pre-Trade Check
          </button>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-xs text-gray-500 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© 2026 Trading Coach. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Powered by AI Analytics</span>
            <span className="hidden md:inline">•</span>
            <span>Trade with discipline</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
