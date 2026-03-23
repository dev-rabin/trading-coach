import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "Mon", profit: 500 },
  { date: "Tue", profit: 1200 },
  { date: "Wed", profit: 800 },
  { date: "Thu", profit: 1600 },
  { date: "Fri", profit: 2100 },
  { date: "Sat", profit: 1800 },
  { date: "Sun", profit: 2400 },
];

export default function ProfitChart() {
  return (
    <div className="">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            {/* X Axis */}
            <XAxis dataKey="date" stroke="#6b7280" tick={{ fontSize: 12 }} />

            {/* Y Axis */}
            <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                backgroundColor: "#020617",
                border: "1px solid #1f2937",
                borderRadius: "8px",
                color: "#fff",
              }}
            />
            <defs>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Line
              type="monotone"
              dataKey="profit"
              stroke="#22c55e"
              strokeWidth={2}
              fill="url(#colorProfit)"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
