import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  workspaces: [],
  currentWorkspace: null,
  loading: false,
  error: null,
};

const workspaceSlice = createSlice({
  name: "workspace",

  initialState,

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setWorkspaces(state, action) {
      state.workspaces = action.payload;
    },

    setCurrentWorkspace(state, action) {
      state.currentWorkspace = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setWorkspaces,
  setCurrentWorkspace,
  setError,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;