import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMeAPI, loginAPI, logoutAPI, signupAPI } from "./authAPI";

const initialState = {
  user: null,
  loginStatus: "idle",
  signupStatus: "idle",
  authStatus: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await loginAPI(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Login failed");
    }
  },
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getMeAPI();
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Not Authenticated!");
    }
  },
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await signupAPI(payload);
      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Signup failed");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await logoutAPI();
      return true;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Logout failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loginStatus = "idle";
      state.authStatus = "idle";
      state.signupStatus = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //LOGIN
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.user = action.payload?.user || action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.payload;
      })

      //GET ME
      .addCase(getMe.pending, (state) => {
        state.authStatus = "loading";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.authStatus = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(getMe.rejected, (state) => {
        state.authStatus = "failed";
        state.user = null;
      })

      // SIGNUP
      .addCase(signup.pending, (state) => {
        state.signupStatus = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signupStatus = "succeeded";
        state.user = action.payload?.user || action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupStatus = "failed";
        state.error = action.payload;
      })

      //LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.loginStatus = "idle";
        state.signupStatus = "idle";
        state.authStatus = "idle";
        state.error = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
