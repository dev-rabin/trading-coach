import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { preTradeAPI } from "./preTradeAPI";

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

export const preTradePlan = createAsyncThunk(
  "pretrade/plan",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await preTradeAPI(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Pre-trade failed");
    }
  },
);

const preTradeSlice = createSlice({
  name: "pretrade",
  initialState,
  reducers: {
    clearPreTrade: (state) => {
      state.data = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(preTradePlan.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(preTradePlan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })

      .addCase(preTradePlan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearPreTrade } = preTradeSlice.actions;
export default preTradeSlice.reducer;
