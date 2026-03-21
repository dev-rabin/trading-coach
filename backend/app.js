import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import cookieParser from "cookie-parser";

connectDB();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is online.");
});

import PretradeRoutes from "./src/routes/preTradeRoutes.js"
app.use("/api/pretrade", PretradeRoutes)

import TradeRoutes from "./src/routes/tradeRoutes.js";
app.use("/api/trade", TradeRoutes);

import AuthRoutes from "./src/routes/authRoutes.js";
app.use("/api/auth", AuthRoutes);

import AnalyticsRoutes from "./src/routes/analyticsRoutes.js";
app.use("/api/analytics", AnalyticsRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
