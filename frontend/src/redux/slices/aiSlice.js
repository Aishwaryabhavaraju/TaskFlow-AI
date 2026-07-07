import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  result: "",
  suggestions: null,
  error: null,
};

const aiSlice = createSlice({
  name: "ai",

  initialState,

  reducers: {

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setResult(state, action) {
      state.result = action.payload;
    },

    clearResult(state) {
      state.result = "";
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setSuggestions(state, action) {
        state.suggestions = action.payload;
    },

    clearSuggestions(state) {
        state.suggestions = null;
    },
  },
});

export const {
  setLoading,
  setResult,
  clearResult,
  setError,
  setSuggestions,
  clearSuggestions,
} = aiSlice.actions;

export default aiSlice.reducer;