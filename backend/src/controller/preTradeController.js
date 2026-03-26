import PreTrade from "../models/PreTrade.js";
import { getBehaviorSummary } from "../services/behaviourService.js";
import { generatePreTradeInsight } from "../services/preTradeService.js";

export const preTradeCheck = async (req, res) => {
  try {
    const { strategy, emotion, stopLoss, riskReward } = req.body;

    if (!strategy || !emotion) {
      return res.status(400).json({
        message: "Strategy and emotion are required",
      });
    }

    const userId = req.user._id;
    const userName = req.user.name || "Trader";
    const behaviorSummary = await getBehaviorSummary(userId);

    const result = await generatePreTradeInsight({
      userName,
      strategy,
      emotion,
      stopLoss,
      riskReward,
      behaviorSummary,
    });

    const preTrade = await PreTrade.create({
      userId,
      strategy,
      emotion,
      stopLoss,
      riskReward,
      decision: result.decision,
      reason: result.reason,
    });
    res.json({
      success: true,
      decision: result.decision,
      reason: result.reason,
      preTradeId: preTrade._id,
    });
  } catch (error) {
    console.error("PreTrade Controller Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
