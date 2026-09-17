import { createSlice } from "@reduxjs/toolkit";

const getStoredWorkspace = () => {
  try {
    const item = localStorage.getItem("taskflow_current_workspace");
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

const initialState = {
  workspaces: [],
  currentWorkspace: getStoredWorkspace(),
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
      if (!state.currentWorkspace && action.payload?.length > 0) {
        state.currentWorkspace = action.payload[0];
        localStorage.setItem("taskflow_current_workspace", JSON.stringify(action.payload[0]));
      }
    },

    setCurrentWorkspace(state, action) {
      state.currentWorkspace = action.payload;
      if (action.payload) {
        localStorage.setItem("taskflow_current_workspace", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("taskflow_current_workspace");
      }
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