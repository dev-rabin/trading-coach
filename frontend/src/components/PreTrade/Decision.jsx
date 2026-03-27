import { useSelector } from "react-redux";

export default function DecisionScreen() {
  const { data, status } = useSelector((state) => state.preTrade);
  console.log("pre trade data : ", data);
  if (!data || status !== "succeeded") return null;
  const isAvoid = data.decision === "AVOID";

  return (
    <div
      className={`w-full rounded-3xl p-3.5 text-center border ${
        isAvoid
          ? "border-red-500/30 bg-gradient-to-b from-red-500/10 to-black"
          : "border-green-500/30 bg-gradient-to-b from-green-500/10 to-black"
      }`}
    >
      <p
        className={`text-sm tracking-widest mb-4 ${
          isAvoid ? "text-red-400" : "text-green-400"
        }`}
      >
        COACH DECISION
      </p>
      <h1
        className={`text-5xl font-bold ${
          isAvoid ? "text-red-400" : "text-green-400"
        }`}
      >
        {data.decision}
      </h1>
      <p className="text-gray-300 mt-4 text-lg">{data.reason}</p>
      <div className="h-px bg-white/10 my-2" />

      {/* Instruction */}
      {/* <p className="text-gray-400 text-sm">{data.instruction}</p> */}
    </div>
  );
}
