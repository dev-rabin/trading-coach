export default function DecisionScreen() {
  return (
    <div className="w-full rounded-3xl p-3 text-center border border-red-500/30 bg-gradient-to-b from-red-500/10 to-black">
      <p className="text-sm tracking-widest text-red-400 mb-4">
        COACH DECISION
      </p>
      <h1 className="text-5xl font-bold text-red-400">AVOID</h1>
      <p className="text-gray-300 mt-4 text-lg">
        Robin, this is forced. Skip this trade.
      </p>
      <div className="h-px bg-white/10 my-2" />
      <p className="text-gray-400 text-sm">
        You're repeating a mistake. Wait for a better setup.
      </p>
    </div>
  );
}
