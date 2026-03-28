export default function ReflectionCard({ pattern, profits, losses }) {
  return (
    <div className="bg-[#111] border border-gray-800 rounded-2xl p-4.5">
      <p className="text-xs text-gray-400 mb-2">YOUR PATTERNS</p>
      {/* Main Insight */}
      <h3 className="text-sm font-medium text-blue-400 leading-relaxed">
       {pattern}
      </h3>

      {/* Divider */}
      <div className="border-t border-gray-800 my-4"></div>

      {/* Secondary Insight */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-400">Last 5 Trades</span>
        <span className="text-green-400 font-medium">
          {profits} Profit <span className="text-white">•</span>{" "}
          <span className="text-orange-400">{losses} Loss</span>
        </span>
      </div>
    </div>
  );
}
