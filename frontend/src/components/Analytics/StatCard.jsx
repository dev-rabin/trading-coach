export default function StatCard({ title, value, change, positive }) {
  return (
    <div className="bg-[#060606] border border-gray-800 rounded-xl p-4">
      <p className="text-gray-400 text-sm">{title}</p>
      <h2 className="text-xl font-semibold">{value}</h2>
      <p
        className={`text-sm mt-1 ${
          positive ? "text-green-400" : "text-red-400"
        }`}
      >
        {change}
      </p>
    </div>
  );
}
