export default function FeatureCard({ title, desc, icon }) {
  return (
    <div className="flex items-start gap-4 border border-gray-800 rounded-xl p-4 bg-[#060606] hover:bg-[#0b0b0b] transition">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-500/10 text-green-400">
        {icon}
      </div>

      <div>
        <h3 className="font-medium mb-1">{title}</h3>
        <p className="text-gray-400 text-sm">{desc}</p>
      </div>
    </div>
  );
}
