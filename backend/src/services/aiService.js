import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateInsights = async (analytics) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are a trading psychology coach.

Analyze the trading data in INR currency with symbol and return ONLY valid JSON.

Format:
{
  "mistakes": "...",
  "whatWorks": "...",
  "improvements": "..."
}

Rules:
- Keep responses short and to the point
- Focus on behavior and emotions
- No markdown or extra text

Trading Data:
Win Rate: ${analytics.winRate}%
Avg Win: ${analytics.avgWin}
Avg Loss: ${analytics.avgLoss}
Risk Reward: ${analytics.riskReward}

Detected Issues:
${analytics.insights.join(", ")}

Recent Emotion:
${analytics.lastEmotion || "Not available"}

Strategy:
${analytics.lastStrategy || "Not available"}
`;

  const result = await model.generateContent(prompt);

  let text = result.response.text();

  // clean response
  text = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("AI JSON parse error:", text);

    return {
      mistakes: "Unable to analyze behavior",
      whatWorks: "Insufficient data",
      improvements: "Add more trades and try again",
    };
  }
};
