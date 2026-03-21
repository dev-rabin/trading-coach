import mongoose, { Schema } from "mongoose";

const tradeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
  },
  { timestamps: true },
);

const Trade = mongoose.model("Trade", tradeSchema);
export default Trade;
