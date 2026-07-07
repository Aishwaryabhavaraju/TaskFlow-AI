import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const calendarSlice = createSlice({
  name: "calendar",

  initialState,

  reducers: {

    setEvents(state, action) {
      state.events = action.payload;
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
  setEvents,
  setLoading,
  setError,
} = calendarSlice.actions;

export default calendarSlice.reducer;