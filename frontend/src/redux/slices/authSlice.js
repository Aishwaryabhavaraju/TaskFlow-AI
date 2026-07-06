import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  login,
  register,
  getCurrentUser,
  logout,
  forgotPassword,
  resetPassword,
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

export const forgotPasswordUser = createAsyncThunk(
  "auth/forgotPassword",

  async (email, thunkAPI) => {
    try {
      const data = await forgotPassword(email);

      return data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Unable to send email"
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
        error.response?.data?.message ||
          "Session expired"
      );
    }
  }
);

export const resetPasswordUser = createAsyncThunk(
  "auth/resetPassword",

  async ({ token, password }, thunkAPI) => {
    try {
      const data = await resetPassword(
        token,
        password
      );

        localStorage.setItem(
            "token",
            data.token
        );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        "Unable to reset password"
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

  isAuthenticated: !!localStorage.getItem("token"),

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

      .addCase(forgotPasswordUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(forgotPasswordUser.fulfilled, (state) => {
            state.loading = false;
        })

        .addCase(forgotPasswordUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        .addCase(resetPasswordUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })

        .addCase(resetPasswordUser.fulfilled, (state, action) => {
            state.loading = false;

            state.token = action.payload.token;

            state.isAuthenticated = true;
        })

        .addCase(resetPasswordUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
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