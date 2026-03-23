export default function Stat({ title, value, green }) {
  return (
    <div className="bg-[#111] p-7 rounded-xl border border-gray-800">
      <p className="text-xs text-gray-400">{title}</p>
      <p className={`text-xl font-semibold ${green ? "text-green-400" : ""}`}>
        {value}
      </p>
    </div>
  );
}
