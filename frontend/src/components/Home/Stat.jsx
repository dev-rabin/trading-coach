export default function Stat({ title, value, green }) {
  return (
    <div className="bg-[#111] px-4 py-2.5 rounded-xl border border-gray-800">
      <p className="text-xs text-gray-400">{title}</p>
      <p className={`text-lg font-semibold ${green ? "text-green-400" : ""}`}>
        {value}
      </p>
    </div>
  );
}
