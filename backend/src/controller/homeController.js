import Trade from "../models/Trade.js";


const getPL = (t) =>
  t.profitLoss ?? ((t.exitPrice - t.entryPrice) * t.quantity || 0);

const calculateDisciplineScore = (trades) => {
  let score = 50;

  trades.forEach((t, i) => {
    const pl = getPL(t);

    if (t.isTradeTaken) score += 6;
    else score -= 10;

    if (t.emotion === "Calm") score += 4;
    if (t.emotion === "Confident") score += 3;
    if (t.emotion === "FOMO") score -= 6;
    if (t.emotion === "Anxious") score -= 3;

    if (i > 0) {
      const prev = trades[i - 1];
      const prevPL = getPL(prev);

      if (prevPL < 0 && !t.isTradeTaken) score -= 8;
    }

    if (t.isTradeTaken && pl > 0) score += 2;
  });

  return Math.max(0, Math.min(100, score));
};

const analyzeBehavior = (trades) => {
  let revenge = 0;
  let fomo = 0;
  let calmWins = 0;
  let anxiousLosses = 0;

  for (let i = 0; i < trades.length; i++) {
    const t = trades[i];
    const pl = getPL(t);

    if (t.emotion === "FOMO") fomo++;

    if (t.emotion === "Calm" && pl > 0) calmWins++;

    if (t.emotion === "Anxious" && pl < 0) anxiousLosses++;

    if (i > 0) {
      const prev = trades[i - 1];
      const prevPL = getPL(prev);

      if (prevPL < 0 && !t.isTradeTaken) revenge++;
    }
  }

  return { revenge, fomo, calmWins, anxiousLosses };
};

const generateCoach = (behavior, disciplineScore) => {
  const signals = [];

  if (behavior.revenge > 0) {
    signals.push({
      type: "revenge",
      weight: behavior.revenge * 3,
      message: "You're reacting emotionally after losses.",
      reason: "Revenge trading is hurting your performance.",
    });
  }

  if (behavior.fomo > 0) {
    signals.push({
      type: "fomo",
      weight: behavior.fomo * 2,
      message: "You're chasing trades.",
      reason: "FOMO is reducing your edge.",
    });
  }

  if (behavior.anxiousLosses > 0) {
    signals.push({
      type: "anxiety",
      weight: behavior.anxiousLosses * 2,
      message: "You're trading with hesitation.",
      reason: "Anxiety is leading to poor decisions.",
    });
  }

  if (behavior.calmWins > 0) {
    signals.push({
      type: "calm",
      weight: behavior.calmWins * 2,
      message: "You perform best when calm.",
      reason: "Your best trades come from controlled decisions.",
    });
  }

  if (disciplineScore > 75) {
    signals.push({
      type: "high-discipline",
      weight: 5,
      message: "You're in control. Stay consistent.",
      reason: "Your discipline is strong.",
    });
  }

  if (disciplineScore < 40) {
    signals.push({
      type: "low-discipline",
      weight: 6,
      message: "You're losing control over your trades.",
      reason: "Discipline breakdown is affecting your performance.",
    });
  }

  if (signals.length === 0) {
    return {
      message: "Stay patient and follow your rules.",
      reason: "Consistency is your edge.",
    };
  }
  const topSignal = signals.sort((a, b) => b.weight - a.weight)[0];
  const secondary = signals.sort((a, b) => b.weight - a.weight)[1];

  return {
    message: topSignal.message,
    reason:
      secondary && secondary.weight > 2
        ? `${topSignal.reason} Also, ${secondary.reason.toLowerCase()}`
        : topSignal.reason,
  };
};

const generateFocus = (behavior) => {
  const focus = [];

  if (behavior.revenge > 1) {
    focus.push("Avoid trading after a loss");
  }

  if (behavior.fomo > 1) {
    focus.push("Avoid chasing trades");
  }

  if (focus.length === 0) {
    focus.push("Only take A+ setups");
  }

  focus.push("Respect stop loss");
  focus.push("Limit trades to 3");

  return focus;
};

export const getHomeDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    const trades = await Trade.find({ userId }).sort({ createdAt: -1 });

    if (!trades.length) {
      return res.json({ message: "No trades yet" });
    }

    const totalTrades = trades.length;
    let totalPL = 0;
    let wins = 0;

    trades.forEach((t) => {
      const pl = getPL(t);
      totalPL += pl;
      if (pl > 0) wins++;
    });

    const winRate = Math.round((wins / totalTrades) * 100);
    const last5 = trades.slice(0, 5);

    const disciplineScore = calculateDisciplineScore(last5);

    const followedTrades = last5.filter((t) => t.isTradeTaken).length;

    const disciplineRate = Math.round((followedTrades / last5.length) * 100);

    const behavior = analyzeBehavior(trades);

    const coach = generateCoach(behavior, disciplineScore);

    const focus = generateFocus(behavior);

    let insight = "You're building consistency";

    if (behavior.calmWins > 2) {
      insight = "You perform best when calm.";
    } else if (behavior.anxiousLosses > 2) {
      insight = "Anxiety is leading to poor trades.";
    }

    res.json({
      greeting: "Good morning",
      userName: req.user.name,
      date: new Date().toDateString(),

      coach,

      discipline: {
        score: disciplineScore,
        rate: disciplineRate,
        message:
          disciplineScore > 75
            ? "Elite discipline"
            : disciplineScore > 50
              ? "Improving"
              : "Needs focus",
      },

      behavior: {
        revengeTrades: behavior.revenge,
        fomoTrades: behavior.fomo,
      },

      focus,

      stats: {
        winRate,
        totalPL,
        totalTrades,
      },

      insight,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
