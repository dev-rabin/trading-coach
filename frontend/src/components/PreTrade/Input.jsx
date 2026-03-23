export default function Input({ label, placeholder, suffix }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <div className="relative">
        <input
          placeholder={placeholder}
          className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-green-500"
        />
        {suffix && (
          <span className="absolute right-3 top-2 text-gray-400 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}
