import Trade from "../models/Trade.js";

const analyticsCache = new Map();

function setCache(key, value, ttl = 6 * 60 * 60 * 1000) {
  analyticsCache.set(key, {
    value,
    expiry: Date.now() + ttl,
  });
}

function getCache(key) {
  const data = analyticsCache.get(key);

  if (!data) return null;

  if (Date.now() > data.expiry) {
    analyticsCache.delete(key);
    return null;
  }

  return data.value;
}

export const getAnalytics = async (userId) => {
  try {
    const cacheKey = `analytics_${userId}`;
    const cached = getCache(cacheKey);
    if (cached) {
      console.log("ANALYTICS CACHE HIT ✅");
      return cached;
    }

    console.log("ANALYTICS DB CALL 💸");

    const trades = await Trade.find({ userId });

    if (!trades.length) {
      const emptyData = {
        totalTrades: 0,
        winRate: 0,
        totalProfit: 0,
        avgWin: 0,
        avgLoss: 0,
        riskReward: "N/A",
        strategies: [],
        insights: [],
        lastEmotion: null,
        lastStrategy: null,
      };

      setCache(cacheKey, emptyData);
      return emptyData;
    }

    let wins = 0;
    let losses = 0;
    let totalProfit = 0;

    let winAmount = 0;
    let lossAmount = 0;

    const strategyMap = {};

    trades.forEach((trade) => {
      const pl =
        trade.profitLoss ??
        (trade.exitPrice - trade.entryPrice) * trade.quantity;

      totalProfit += pl;

      if (pl > 0) {
        wins++;
        winAmount += pl;
      } else {
        losses++;
        lossAmount += Math.abs(pl);
      }

      if (trade.strategy) {
        if (!strategyMap[trade.strategy]) {
          strategyMap[trade.strategy] = {
            total: 0,
            profit: 0,
            wins: 0,
          };
        }

        strategyMap[trade.strategy].total += 1;
        strategyMap[trade.strategy].profit += pl;

        if (pl > 0) {
          strategyMap[trade.strategy].wins += 1;
        }
      }
    });

    const totalTrades = trades.length;
    const winRate = ((wins / totalTrades) * 100).toFixed(2);

    const avgWin = wins ? winAmount / wins : 0;
    const avgLoss = losses ? lossAmount / losses : 0;

    const riskReward = avgLoss > 0 ? (avgWin / avgLoss).toFixed(2) : "N/A";

    const strategies = Object.keys(strategyMap).map((key) => ({
      name: key,
      total: strategyMap[key].total,
      profit: strategyMap[key].profit,
      winRate: (strategyMap[key].wins / strategyMap[key].total) * 100,
    }));

    const insights = [];

    if (avgLoss > avgWin) {
      insights.push("Losses are larger than profits");
    }

    if (riskReward !== "N/A" && riskReward < 1.2) {
      insights.push("Risk reward ratio is too low");
    }

    if (winRate < 40) {
      insights.push("Low win rate");
    }

    if (totalTrades > 20) {
      insights.push("Possible overtrading");
    }

    strategies.forEach((s) => {
      if (s.winRate === 0) {
        insights.push(`${s.name} strategy is not working`);
      }

      if (s.winRate >= 70) {
        insights.push(`${s.name} strategy performs well`);
      }
    });

    if (strategies.length > 1) {
      const bestStrategy = strategies.reduce((a, b) =>
        a.winRate > b.winRate ? a : b,
      );

      const worstStrategy = strategies.reduce((a, b) =>
        a.winRate < b.winRate ? a : b,
      );

      insights.push(`Focus on ${bestStrategy.name}`);
      insights.push(`Avoid ${worstStrategy.name}`);
    }

    const lastTrade = trades[trades.length - 1];

    if (lastTrade?.emotion === "Revenge") {
      insights.push("Revenge trading detected");
    }

    if (lastTrade?.emotion === "Fear") {
      insights.push("Fear-based trading detected");
    }

    if (lastTrade?.emotion === "Overconfident") {
      insights.push("Overconfidence may lead to losses");
    }

    const emotionMap = {};

    trades.forEach((trade) => {
      if (!trade.emotion) return;

      if (!emotionMap[trade.emotion]) {
        emotionMap[trade.emotion] = {
          total: 0,
          wins: 0,
        };
      }

      const pl =
        trade.profitLoss ??
        (trade.exitPrice - trade.entryPrice) * trade.quantity;

      emotionMap[trade.emotion].total += 1;

      if (pl > 0) {
        emotionMap[trade.emotion].wins += 1;
      }
    });

    Object.keys(emotionMap).forEach((emotion) => {
      const data = emotionMap[emotion];
      const winRate = (data.wins / data.total) * 100;

      if (winRate < 30) {
        insights.push(`${emotion} trades perform poorly`);
      }

      if (winRate > 70) {
        insights.push(`${emotion} trades perform well`);
      }
    });

    const result = {
      totalTrades,
      winRate,
      totalProfit,
      avgWin,
      avgLoss,
      riskReward,
      strategies,
      insights,
      lastEmotion: lastTrade?.emotion || null,
      lastStrategy: lastTrade?.strategy || null,
    };
    setCache(cacheKey, result);
    console.log("analytics result: ", result);
    return result;
  } catch (error) {
    console.error("Analytics error:", error.message);
    throw error;
  }
};
