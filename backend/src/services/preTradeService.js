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

function getCacheKey({ strategy, emotion, stopLoss }) {
  const sl = stopLoss && stopLoss > 0 ? "withSL" : "noSL";
  return `${strategy}_${emotion}_${sl}`;
}

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

export const generatePreTradeInsight = async ({
  userName,
  strategy,
  emotion,
  stopLoss,
  behaviorSummary,
}) => {
  try {
    const ruleDecision = checkRules({ emotion, stopLoss, userName });
    if (ruleDecision) {
      return ruleDecision;
    }
    const cacheKey = getCacheKey({ strategy, emotion, stopLoss });
    const cached = getCache(cacheKey);
    if (cached) {
      console.log("CACHE HIT ✅");
      return cached;
    }
    console.log("AI CALL 💸");
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

 const prompt = `
You are a strict trading coach who protects the user from bad trades.

User: ${userName}

Trade Context:
- Strategy: ${strategy || "Not defined"}
- Emotion: ${emotion || "Not defined"}
- Stop Loss: ${stopLoss || "Not defined"}

User Behavior:
${behaviorSummary}

Trade Warnings:
${warnings.length > 0 ? warnings.join(", ") : "None"}

Soft Signals:
${softWarnings.length > 0 ? softWarnings.join(", ") : "None"}

System Evaluation:
${
  warnings.length > 0
    ? "- High risk detected. Strongly AVOID."
    : isSoftRisk
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
- Max 8 words
- No explanations
- No questions
- Direct and strict tone
- Use simple trading language

---

STYLE:
- "Robin, stay out. This is forced."
- "Robin, skip it. Not clean."
- "Robin, this looks clean. Execute properly."

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

    // 🛡️ FALLBACK
    if (!aiResponse || !aiResponse.decision || !aiResponse.reason) {
      const fallback = {
        decision: "PROCEED",
        reason: `${userName}, looks fine. Execute properly.`,
      };

      setCache(cacheKey, fallback);
      return fallback;
    }

    // 💾 4. SAVE TO CACHE
    setCache(cacheKey, aiResponse);

    return aiResponse;
  } catch (error) {
    console.error("Pre-trade error:", error.message);

    return {
      decision: "AVOID",
      reason: `${userName}, system issue. Stay out.`,
    };
  }
};
