import { GoogleGenerativeAI } from "@google/generative-ai";

const cache = new Map();

function setCache(key, value, ttl = 3600000) {
  cache.set(key, {
    value,
    expiry: Date.now() + ttl,
  });
}

function getCache(key) {
  const data = cache.get(key);
  if (!data) return null;
  if (Date.now() > data.expiry) {
    cache.delete(key);
    return null;
  }
  return data.value;
}

function getCacheKey({ strategy, emotion, stopLoss, riskReward }) {
  const sl = stopLoss && stopLoss > 0 ? "withSL" : "noSL";
  return `${strategy}_${emotion}_${sl}_${riskReward}`;
}

// ✅ EXISTING RULES (UNCHANGED)
function checkRules({ emotion, stopLoss, userName }) {
  if (!stopLoss || stopLoss <= 0) {
    return {
      decision: "AVOID",
      reason: `${userName}, no stop loss. Skip.`,
    };
  }

  if (emotion?.toLowerCase() === "revenge") {
    return {
      decision: "AVOID",
      reason: `${userName}, revenge trade. Stay out.`,
    };
  }

  if (emotion?.toLowerCase() === "fear") {
    return {
      decision: "AVOID",
      reason: `${userName}, fear detected. Skip.`,
    };
  }

  return null;
}

// ✅ FULLY FIXED RISK ENGINE
function evaluateRisk({ strategy, emotion, stopLoss, riskReward }) {
  const warnings = [];
  const softWarnings = [];

  const emotionLower = emotion?.toLowerCase();

  // 🔴 HARD RULES
  if (!stopLoss || stopLoss <= 0) {
    warnings.push("no stop loss");
  }

  if (emotionLower === "revenge") {
    warnings.push("revenge trading");
  }

  if (emotionLower === "fear") {
    warnings.push("fear-driven trade");
  }

  // 🔴 HARD RR BLOCK
  if (riskReward && riskReward < 1.2) {
    warnings.push("poor risk reward");
  }

  // 🟡 SOFT WARNINGS
  if (emotionLower === "fomo") {
    softWarnings.push("chasing move");
  }

  if (riskReward && riskReward >= 1.2 && riskReward < 1.5) {
    softWarnings.push("low risk reward");
  }

  if (!strategy || strategy === "Not defined") {
    softWarnings.push("no clear strategy");
  }

  const isSoftRisk = softWarnings.length > 0;

  return { warnings, softWarnings, isSoftRisk };
}

export const generatePreTradeInsight = async ({
  userName,
  strategy,
  emotion,
  stopLoss,
  riskReward,
  behaviorSummary,
}) => {
  try {
    const safeName = userName || "Trader";

    // ✅ RULE ENGINE FIRST
    const ruleDecision = checkRules({
      emotion,
      stopLoss,
      userName: safeName,
    });

    if (ruleDecision) {
      return ruleDecision;
    }

    // ✅ RISK ENGINE
    const { warnings, softWarnings, isSoftRisk } = evaluateRisk({
      strategy,
      emotion,
      stopLoss,
      riskReward,
    });

    // 🔴 HARD BLOCK (NO AI CALL)
    if (warnings.length > 0) {
      return {
        decision: "AVOID",
        reason: `${safeName}, ${warnings[0]}. Stay out.`,
      };
    }

    // ✅ CACHE
    const cacheKey = getCacheKey({
      strategy,
      emotion,
      stopLoss,
      riskReward,
    });

    const cached = getCache(cacheKey);
    if (cached) {
      console.log("CACHE HIT ✅");
      return cached;
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are a strict trading coach who protects the user from bad trades.

User: ${safeName}

Trade Context:
- Strategy: ${strategy || "Not defined"}
- Emotion: ${emotion || "Not defined"}
- Stop Loss: ${stopLoss || "Not defined"}
- Risk Reward: ${riskReward || "Not defined"}

User Behavior:
${behaviorSummary}

Trade Warnings:
${warnings.length > 0 ? warnings.join(", ") : "None"}

Soft Signals:
${softWarnings.length > 0 ? softWarnings.join(", ") : "None"}

System Evaluation:
${
  isSoftRisk
    ? "- Some risk detected. Lean toward AVOID."
    : "- Clean setup. Allow PROCEED."
}

---

PRIORITY RULE:
- Always evaluate the CURRENT trade first
- Current trade is more important than past behavior
- If current trade is clean → DO NOT mention past mistakes
- Only use past behavior if current trade shows similar risk

---

BEHAVIOR INTELLIGENCE:
- Mention past patterns ONLY if they match current trade
- Use words like "again" or "same mistake" only when relevant
- Do NOT accuse user incorrectly

---

RULES:
- Always start with user's name
- No explanations
- No questions
- Direct and strict tone
- Use simple trading language

---

EXAMPLE:
- "Robin, stay out. This is forced."

---

OUTPUT (STRICT JSON ONLY):
{
  "decision": "PROCEED" or "AVOID",
  "reason": "Short coaching sentence"
}
`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();

    text = text
      .replace(/```json|```/g, "")
      .replace(/\n/g, "")
      .trim();

    let aiResponse;

    try {
      aiResponse = JSON.parse(text);
    } catch {
      aiResponse = null;
    }

    // 🛡️ SAFE FALLBACK
    if (!aiResponse || !aiResponse.decision || !aiResponse.reason) {
      const fallback = {
        decision: "AVOID",
        reason: `${safeName}, unclear setup. Stay out.`,
      };

      setCache(cacheKey, fallback);
      return fallback;
    }
    let reason = aiResponse.reason;

    if (!reason.toLowerCase().startsWith(safeName.toLowerCase())) {
      reason = `${safeName}, ${reason}`;
    }

    const finalResponse = {
      decision: aiResponse.decision === "PROCEED" ? "PROCEED" : "AVOID",
      reason,
    };

    setCache(cacheKey, finalResponse);

    return finalResponse;
  } catch (error) {
    console.error("Pre-trade error:", error.message);

    return {
      decision: "AVOID",
      reason: "Trader, system issue. Stay out.",
    };
  }
};
