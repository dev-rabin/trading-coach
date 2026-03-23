export default function StatRow({ label, value, positive }) {
  return (
    <div className="flex justify-between text-sm mb-2">
      <span className="text-gray-400">{label}</span>
      <span className={positive ? "text-green-600" : "text-white/50"}>
        {value}
      </span>
    </div>
  );
}