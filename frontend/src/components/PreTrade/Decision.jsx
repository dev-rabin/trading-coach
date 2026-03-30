import { useState } from "react";
import { useSelector } from "react-redux";

export default function DecisionScreen() {
  const { data, status } = useSelector((state) => state.preTrade);

  const [isTradeTaken, setIsTradeTaken] = useState(null);
  const hasDecision = data && status === "succeeded";
  const isAvoid = data?.decision === "AVOID";

  const disciplineImpact =
    isTradeTaken === null
      ? null
      : isTradeTaken && isAvoid
        ? -5
        : !isTradeTaken && isAvoid
          ? +2
          : isTradeTaken && !isAvoid
            ? +2
            : -1;

  return (
    <div
      className={`w-full rounded-3xl p-[23px] text-center border transition-all duration-300 ${
        hasDecision
          ? isAvoid
            ? "border-red-500/30 bg-gradient-to-b from-red-500/10 to-black"
            : "border-green-500/30 bg-gradient-to-b from-green-500/10 to-black"
          : "border-white/10 bg-[#0f0f0f]"
      }`}
    >
      <p
        className={`text-xs tracking-widest mb-4 ${
          hasDecision
            ? isAvoid
              ? "text-red-400"
              : "text-green-400"
            : "text-gray-500"
        }`}
      >
        COACH DECISION
      </p>

      {hasDecision ? (
        <>
          <h1
            className={`text-5xl font-bold transition-all duration-500 ${
              isAvoid ? "text-red-400" : "text-green-400"
            }`}
          >
            {data.decision}
          </h1>

          <p className="text-gray-300 mt-3 text-base leading-relaxed max-w-md mx-auto">
            {data.reason}
          </p>
        </>
      ) : (
        <div className="py-8 flex flex-col items-center gap-4">
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150" />
            <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300" />
          </div>

          <p className="text-gray-400 text-sm">No decision yet</p>
        </div>
      )}

      {hasDecision && (
        <div className="">
          <p className="text-sm text-gray-400 mb-4">Did you take this trade?</p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsTradeTaken(true)}
              className={`px-5 py-2 rounded-xl font-medium transition ${
                isTradeTaken === true
                  ? "bg-green-500 text-black shadow-lg shadow-green-500/20"
                  : "bg-green-500/10 text-green-400 hover:bg-green-500/20"
              }`}
            >
              Yes
            </button>

            <button
              onClick={() => setIsTradeTaken(false)}
              className={`px-5 py-2 rounded-xl font-medium transition ${
                isTradeTaken === false
                  ? "bg-red-500 text-black shadow-lg shadow-red-500/20"
                  : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
              }`}
            >
              No
            </button>
          </div>

          {isTradeTaken !== null && (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-gray-300">
                {isTradeTaken
                  ? isAvoid
                    ? "You ignored the AI recommendation"
                    : "You followed your trading plan"
                  : isAvoid
                    ? "Good discipline — you avoided a bad trade"
                    : "You skipped a valid opportunity"}
              </p>

              <p
                className={`text-xs font-medium ${
                  disciplineImpact < 0 ? "text-red-400" : "text-green-400"
                }`}
              >
                {disciplineImpact > 0 ? "+" : ""}
                {disciplineImpact} Discipline
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
