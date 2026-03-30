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
    strategy: {
      type: String,
      enum: ["Breakout", "Scalping", "Swing", "Momentum", "Mean Reversion"],
    },
    emotion: {
      type: String,
      enum: ["Confident", "Neutral", "Anxious", "FOMO", "Calm"],
    },
    notes: String,
    profitLoss: Number,
    isTradeTaken: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true },
);

tradeSchema.pre("save", function (next) {
  if (this.entryPrice && this.exitPrice && this.quantity) {
    this.profitLoss =
      this.tradeType === "BUY"
        ? (this.exitPrice - this.entryPrice) * this.quantity
        : (this.entryPrice - this.exitPrice) * this.quantity;
  }

  next();
});

const Trade = mongoose.model("Trade", tradeSchema);
export default Trade;
