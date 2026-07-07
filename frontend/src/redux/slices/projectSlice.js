import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  projects: [],
  currentProject: null,
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setProjects(state, action) {
      state.projects = action.payload;
    },

    setCurrentProject(state, action) {
      state.currentProject = action.payload;
    },

    addProject(state, action) {
      state.projects.unshift(action.payload);
    },

    updateProject(state, action) {
      state.projects = state.projects.map((project) =>
        project._id === action.payload._id
          ? action.payload
          : project
      );
    },

    removeProject(state, action) {
      state.projects = state.projects.filter(
        (project) => project._id !== action.payload
      );
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setProjects,
  setCurrentProject,
  addProject,
  updateProject,
  removeProject,
  setError,
} = projectSlice.actions;

export default projectSlice.reducer;