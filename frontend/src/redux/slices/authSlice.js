import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  login,
  register,
  getCurrentUser,
  logout,
} from "../../api/authApi";

/* ---------------- LOGIN ---------------- */

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const data = await login(credentials);

      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  }
);

/* ---------------- REGISTER ---------------- */

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const data = await register(userData);

      localStorage.setItem("token", data.token);

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  }
);

/* ---------------- LOAD USER ---------------- */

export const loadUser = createAsyncThunk(
  "auth/loadUser",
  async (_, thunkAPI) => {
    try {
      const data = await getCurrentUser();

      return data.user;
    } catch (error) {
      localStorage.removeItem("token");

      return thunkAPI.rejectWithValue(
        "Session expired"
      );
    }
  }
);

/* ---------------- LOGOUT ---------------- */

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
    await logout();

    localStorage.removeItem("token");
  }
);

const initialState = {
  user: null,

  token: localStorage.getItem("token"),

  isAuthenticated: false,

  loading: false,

  error: null,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearError(state) {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      /* LOGIN */

      .addCase(loginUser.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.token;

        state.user = action.payload.user;

        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* REGISTER */

      .addCase(registerUser.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.token;

        state.user = action.payload.user;

        state.isAuthenticated = true;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      /* LOAD USER */

      .addCase(loadUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(loadUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload;

        state.isAuthenticated = true;
      })

      .addCase(loadUser.rejected, (state) => {
        state.loading = false;

        state.user = null;

        state.token = null;

        state.isAuthenticated = false;
      })

      /* LOGOUT */

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;

        state.token = null;

        state.isAuthenticated = false;
      });
  },
});

export const { clearError } =
  authSlice.actions;

export default authSlice.reducer;