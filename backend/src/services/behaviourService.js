import PreTrade from "../models/PreTrade.js";

export const getBehaviorSummary = async (userId) => {
  const recentTrades = await PreTrade.find({ userId })
    .sort({ createdAt: -1 })
    .limit(10);

  if (!recentTrades.length) {
    return "New user. No past behavior.";
  }

  let revengeCount = 0;
  let noSLCount = 0;
  let ignoredAvoids = 0;

  recentTrades.forEach((t) => {
    if (t.emotion?.toLowerCase() === "revenge") revengeCount++;

    if (!t.stopLoss || t.stopLoss <= 0) noSLCount++;

    if (t.decision === "AVOID" && t.isTradeTaken) {
      ignoredAvoids++;
    }
  });

  let summary = [];

  if (ignoredAvoids >= 3) {
    summary.push("User ignores advice repeatedly");
  }

  if (revengeCount >= 3) {
    summary.push("User repeats revenge trading");
  }

  if (noSLCount >= 3) {
    summary.push("User trades without protection");
  }

  return summary.length ? summary.join(", ") : "No major negative pattern";
};
