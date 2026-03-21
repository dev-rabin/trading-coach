import mongoose, { Schema } from "mongoose";

const tradePlanSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    symbol: String,

    plannedEntry: Number,

    stopLoss: Number,

    target: Number,

    strategy: String,
  },
  { timestamps: true },
);

const TradePlan = mongoose.model("Tradeplan", tradePlanSchema);
export default TradePlan
