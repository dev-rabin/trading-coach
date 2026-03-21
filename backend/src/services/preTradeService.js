import { GoogleGenerativeAI } from "@google/generative-ai";

export const generatePreTradeInsight = async ({
  userName,
  strategy,
  emotion,
  stopLoss,
  behaviorSummary,
}) => {
  try {
    let warnings = [];
    let softWarnings = [];

    if (!stopLoss || stopLoss <= 0) {
      warnings.push("No stop loss defined");
    }

    if (emotion?.toLowerCase() === "fear") {
      warnings.push("Trading in fear");
    }

    if (emotion?.toLowerCase() === "revenge") {
      warnings.push("Revenge trading detected");
    }

    if (["hesitant", "confused", "excited"].includes(emotion?.toLowerCase())) {
      softWarnings.push("Unstable mindset");
    }

    const isCleanSetup = warnings.length === 0 && softWarnings.length === 0;
    const isSoftRisk = warnings.length === 0 && softWarnings.length > 0;

    let baseDecision =
      warnings.length > 0 ? "AVOID" : isSoftRisk ? "AVOID" : "PROCEED";

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

    if (!aiResponse || !aiResponse.decision || !aiResponse.reason) {
      return {
        decision: baseDecision,
        reason:
          warnings.length > 0
            ? `${userName}, avoid this. Poor discipline.`
            : isSoftRisk
              ? `${userName}, this feels off. Stay out.`
              : `${userName}, this looks clean. Follow plan.`,
      };
    }

    if (isCleanSetup && aiResponse.decision === "AVOID") {
      aiResponse.decision = "PROCEED";
    }
    return aiResponse;
  } catch (error) {
    console.error("Pre-trade error:", error.message);

    return {
      decision: "AVOID",
      reason: `${userName}, system issue. Stay out.`,
    };
  }
};
