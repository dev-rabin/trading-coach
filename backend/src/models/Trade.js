import mongoose, { Schema } from "mongoose";

const tradeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    tradeType: {
      type: String,
      enum: ["BUY", "SELL"],
      default: "BUY",
    },
    symbol: String,
    entryPrice: Number,
    exitPrice: Number,
    quantity: Number,
    strategy: String,
    emotion: String,
    notes: String,
    tradeDate: Date,
    profitLoss: Number,
    duration: Number,
    notes: String,
  },
  { timestamps: true },
);

const Trade = mongoose.model("Trade", tradeSchema);
export default Trade;
