import mongoose, { Schema } from "mongoose";

const preTradeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tradeId: {
      type: Schema.Types.ObjectId,
      ref: "Trade",
      default: null,
    },
    strategy: {
      type: String,
      required: true,
    },

    emotion: {
      type: String,
      required: true,
    },

    stopLoss: {
      type: Number,
      default: null,
    },

    decision: {
      type: String,
    },

    reason: {
      type: String,
    },

    isTradeTaken: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true },
);

const PreTrade = mongoose.model("PreTrade", preTradeSchema);
export default PreTrade;
