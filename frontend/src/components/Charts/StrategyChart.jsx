import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

export default function StrategyChart({ data = [] }) {
  const chartData = data.map((item) => ({
    strategy: item.name,
    profit: item.profit,
  }));
  
  if (!data?.length) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        No strategy data
      </div>
    );
  }
  return (
    <div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid stroke="#1f2937" vertical={false} />

            <XAxis
              dataKey="strategy"
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
            />

            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />

            <Tooltip
              cursor={{ fill: "transparent" }}
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #1f2937",
                borderRadius: "8px",
                color: "#fff",
              }}
            />

            <Bar
              dataKey="profit"
              radius={[4, 4, 0, 0]}
              barSize={30}
              activeBar={false}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.profit >= 0 ? "#22c55e" : "#ef4444"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
