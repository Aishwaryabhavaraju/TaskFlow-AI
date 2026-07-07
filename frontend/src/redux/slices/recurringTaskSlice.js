import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recurringTasks: [],
  loading: false,
  error: null,
};

const recurringTaskSlice = createSlice({
  name: "recurringTask",

  initialState,

  reducers: {

    setRecurringTasks(state, action) {
      state.recurringTasks = action.payload;
    },

    addRecurringTask(state, action) {
      state.recurringTasks.push(action.payload);
    },

    updateRecurringTask(state, action) {

      state.recurringTasks =
        state.recurringTasks.map(task =>
          task._id === action.payload._id
            ? action.payload
            : task
        );

    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    }

  }

});

export const {
  setRecurringTasks,
  addRecurringTask,
  updateRecurringTask,
  setLoading,
  setError,
} = recurringTaskSlice.actions;

export default recurringTaskSlice.reducer;