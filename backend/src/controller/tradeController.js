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
