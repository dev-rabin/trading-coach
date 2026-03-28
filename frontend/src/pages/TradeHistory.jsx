import { Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function TradeHistoryScreen({
  trades,
  isLoading,
  strategy,
  setStrategy,
  range,
  setRange,
  search,
  setSearch,
  page,
  setPage,
  totalPages,
}) {
  return (
    <div className="min-h-screen text-white space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Trade History</h1>
        <p className="text-gray-400 text-sm">
          Review your past decisions and outcomes
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="bg-[#111] border border-gray-700 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-white"
          >
            <option value="All">All Strategies</option>
            <option value="Breakout">Breakout</option>
            <option value="Trend">Trend</option>
            <option value="Scalping">Scalping</option>
          </select>

          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="bg-[#111] border border-gray-700 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-white"
          >
            <option value="All">All Time</option>
            <option value="7D">7D</option>
            <option value="30D">30D</option>
            <option value="90D">90D</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="p-2 rounded-lg bg-[#111] border border-green-700 disabled:opacity-40 hover:border-green-400 transition cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-1 text-sm">
            {[...Array(totalPages)].slice(0, 5).map((_, i) => {
              const pageNumber = i + 1;

              return (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`px-2.5 py-1 rounded-md transition ${
                    page === pageNumber
                      ? "bg-white text-black"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="p-2 rounded-lg bg-[#111] border border-green-700 disabled:opacity-40 hover:border-green-400 transition cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111] border border-gray-700 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-white pl-9"
          />
          <Search size={14} className="absolute left-2.5 top-2 text-gray-500" />
        </div>
      </div>

      {isLoading ? (
        <div className="text-gray-400 text-center py-10">Loading trades...</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {trades.length > 0 ? (
            trades.map((trade, index) => {
              const pl =
                trade.profitLoss ??
                (trade.exitPrice && trade.entryPrice && trade.quantity
                  ? (trade.exitPrice - trade.entryPrice) * trade.quantity
                  : 0);

              const isProfit = pl >= 0;

              return (
                <div
                  key={index}
                  className="bg-[#111] p-5 rounded-2xl border border-white/5"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-gray-400 text-xs">
                        {new Date(trade.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                      <h3 className="font-semibold">{trade.symbol || "N/A"}</h3>
                    </div>

                    <span
                      className={`text-sm px-3 py-1 rounded-full ${
                        isProfit
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      ₹{pl}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
                    <div>
                      <p className="text-gray-500">STRATEGY</p>
                      <p>{trade.strategy || "-"}</p>
                    </div>

                    <div>
                      <p className="text-gray-500">EMOTION</p>
                      <p>{trade.emotion || "-"}</p>
                    </div>
                  </div>

                  {trade.notes && (
                    <div className="mt-4 text-xs text-gray-400">
                      {trade.notes}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 col-span-3 text-center">
              No trades found
            </p>
          )}
        </div>
      )}
    </div>
  );
}
