import { getAnalytics } from "../services/analyticsService.js";
import { generateInsights } from "../services/aiService.js";

const cache = {};

export const getSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const analytics = await getAnalytics(userId);

    // 🔥 avoid AI if low data
    if (analytics.totalTrades < 3) {
      return res.json({
        ...analytics,
        aiInsights: {
          mistakes: "Not enough data",
          whatWorks: "Add more trades",
          improvements: "Minimum 3 trades required",
        },
      });
    }

    const now = Date.now();

    if (!cache[userId] || now - cache[userId].lastGenerated > 60000) {
      const aiData = await generateInsights(analytics);

      cache[userId] = {
        data: aiData,
        lastGenerated: now,
      };
    }

    res.json({
      ...analytics,
      aiInsights: cache[userId].data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
