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

const data = [
  { strategy: "Breakout", profit: 2400 },
  { strategy: "Scalping", profit: 1200 },
  { strategy: "Trend", profit: 1800 },
  { strategy: "Range", profit: -800 },
  { strategy: "News", profit: 600 },
  { strategy: "RSI", profit: 1000 },
];

export default function StrategyChart() {
  return (
    <div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
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
              radius={[3, 3, 0, 0]}
              barSize={30}
              activeBar={false}
            >
              {data.map((entry, index) => (
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
