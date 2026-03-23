export default function Input({ label, placeholder }) {
  return (
    <div>
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      <input
        placeholder={placeholder}
        className="w-full bg-black border border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-green-500"
      />
    </div>
  );
}