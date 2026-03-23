export default function InsightCard({ type, title, desc, suggestion, tag }) {
  const bgStyles = {
    danger: "bg-red-900/30 border-red-500",
    warning: "bg-yellow-700/20 border-yellow-500/20",
    success: "bg-green-500/10 border-gray-800",
  };

  const dotColors = {
    danger: "bg-red-500",
    warning: "bg-yellow-500",
    success: "bg-green-500",
  };

  return (
    <div
      className={`border rounded-xl p-4 transition hover:scale-[1.01] ${bgStyles[type]}`}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${dotColors[type]}`} />
          <h3 className="font-medium text-white">{title}</h3>
        </div>
        <span className="text-xs text-gray-500">{tag}</span>
      </div>
      <p className="text-sm text-gray-400">{desc}</p>
      {suggestion && (
        <p className="text-sm mt-3 text-gray-300">
          <span className="text-gray-500">Suggestion:</span> {suggestion}
        </p>
      )}
    </div>
  );
}
