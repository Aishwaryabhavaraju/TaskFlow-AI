import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  connected: false,
  loading: false,
  events: [],
  error: null,
};

const outlookCalendarSlice = createSlice({
  name: "outlookCalendar",

  initialState,

  reducers: {
    setConnected(state, action) {
      state.connected = action.payload;
    },

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
  setConnected,
  setEvents,
  setLoading,
  setError,
} = outlookCalendarSlice.actions;

export default outlookCalendarSlice.reducer;