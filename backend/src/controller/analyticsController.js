import { getAnalytics } from "../services/analyticsService.js";
import { generateInsights } from "../services/aiService.js";

const cache = {};

export const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { range = "All" } = req.query;

    const analytics = await getAnalytics(userId);

    let filteredTimeline = analytics.profitTimeline || [];

    if (range !== "All") {
      const daysMap = {
        "7D": 7,
        "30D": 30,
        "90D": 90,
      };

      const days = daysMap[range];
      if (days) {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);

        filteredTimeline = filteredTimeline.filter(
          (item) => new Date(item.date) >= cutoff,
        );
      }
    }

    // ✅ RE-CALCULATE CONSISTENCY SCORE BASED ON FILTERED DATA
    let consistencyScore = analytics.consistencyScore || 0;

    if (filteredTimeline.length > 1) {
      const returns = [];
      let prev = filteredTimeline[0].profit;

      filteredTimeline.forEach((item, i) => {
        if (i === 0) return;
        const change = item.profit - prev;
        returns.push(change);
        prev = item.profit;
      });

      const mean = returns.reduce((a, b) => a + b, 0) / (returns.length || 1);

      const variance =
        returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) /
        (returns.length || 1);

      const stdDev = Math.sqrt(variance);

      const normalizedVolatility = stdDev / (Math.abs(mean) + 1);

      let score = 100 - normalizedVolatility * 100;

      score =
        score * 0.6 +
        parseFloat(analytics.winRate) * 0.2 +
        (analytics.riskReward !== "N/A"
          ? parseFloat(analytics.riskReward) * 20
          : 0) *
          0.2;

      consistencyScore = Math.max(0, Math.min(100, Math.round(score)));
    }

    // ✅ SAFE ANALYTICS OBJECT
    const safeAnalytics = {
      ...analytics,
      profitTimeline: filteredTimeline,
      consistencyScore,
    };

    // ✅ NOT ENOUGH DATA
    if (safeAnalytics.totalTrades < 3) {
      return res.json({
        ...safeAnalytics,
        aiInsights: {
          mistakes: "Not enough data",
          whatWorks: "Add more trades",
          improvements: "Minimum 3 trades required",
        },
      });
    }

    const cacheKey = `${userId}_${range}`;
    const now = Date.now();

    if (!cache[cacheKey] || now - cache[cacheKey].lastGenerated > 60000) {
      const aiData = await generateInsights(safeAnalytics);

      cache[cacheKey] = {
        data: aiData,
        lastGenerated: now,
      };
    }

    res.json({
      ...safeAnalytics,
      aiInsights: cache[cacheKey].data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
