export default function EmotionChip({ label, active, onClick }) {
  const styles = {
    Calm: "bg-green-500/20 text-green-400",
    Confident: "bg-green-500/20 text-green-400",
    Fear: "bg-red-500/20 text-red-400",
    Revenge: "bg-red-500/20 text-red-400",
    FOMO: "bg-red-500 text-white",
  };

  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-lg text-sm ${
        active ? styles[label] : "bg-white/5 text-gray-300 hover:bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}
