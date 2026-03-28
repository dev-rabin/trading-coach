import Trade from "../models/Trade.js";

export async function createTrade(req, res) {
  try {
    const trade = await Trade.create({
      ...req.body,
      userId: req.user.id,
    });
    res.json(trade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function fetchTrades(req, res) {
  try {
    const { strategy, search, range, page = 1, limit = 12 } = req.query;
    const query = {};
    if (strategy && strategy !== "All") {
      query.strategy = strategy;
    }
    if (search) {
      query.$or = [
        { symbol: { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } },
      ];
    }
    if (range && range !== "All") {
      const daysMap = { "7D": 7, "30D": 30, "90D": 90 };
      const cutoff = new Date();
      cutoff.setDate(cutoff.getDate() - daysMap[range]);
      query.createdAt = { $gte: cutoff };
    }
    const skip = (page - 1) * limit;
    const trades = await Trade.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    const total = await Trade.countDocuments(query);
    res.json({
      data: trades,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}