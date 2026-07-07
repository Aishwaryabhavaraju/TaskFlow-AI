import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

const timelineSlice = createSlice({
  name: "timeline",

  initialState,

  reducers: {
    setTimelineTasks(state, action) {
      state.tasks = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setTimelineTasks,
  setLoading,
  setError,
} = timelineSlice.actions;

export default timelineSlice.reducer;