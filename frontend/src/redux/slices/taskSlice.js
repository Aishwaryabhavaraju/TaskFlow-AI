import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  tasks: [],
  currentTask: null,
  error: null,
};

const taskSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setTasks(state, action) {
      state.tasks = action.payload;
    },

    addTask(state, action) {
      state.tasks.unshift(action.payload);
    },

    updateTask(state, action) {
      state.tasks = state.tasks.map(task =>
        task._id === action.payload._id
          ? action.payload
          : task
      );
    },

    removeTask(state, action) {
      state.tasks = state.tasks.filter(
        task => task._id !== action.payload
      );
    },

    setCurrentTask(state, action) {
      state.currentTask = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setTasks,
  addTask,
  updateTask,
  removeTask,
  setCurrentTask,
  setError,
} = taskSlice.actions;

export default taskSlice.reducer;