import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatCard({
  title,
  value,
  change,
  positive,
  icon: Icon,
}) {
  return (
    <div className="bg-[#060606] border border-gray-800 rounded-xl p-4 flex flex-col gap-2">
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        {Icon && <Icon size={16} className="text-green-700" />}
        <span>{title}</span>
      </div>

      <div className="flex justify-between">
        <h2 className="text-xl font-semibold">{value}</h2>
        {change && (
          <div
            className={`flex items-center gap-1 text-sm ${
              positive ? "text-green-400" : "text-red-400"
            }`}
          >
            {positive ? (
              <ArrowUpRight size={14} />
            ) : (
              <ArrowDownRight size={14} />
            )}
            <span>{change}</span>
          </div>
        )}
      </div>
    </div>
  );
}
