import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import preTradeReducer from "../features/preTrade/preTradeSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    preTrade: preTradeReducer,
  },
});
