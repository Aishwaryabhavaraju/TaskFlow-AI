import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";

import workspaceReducer from "./workspace/workspaceSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspace: workspaceReducer,
  },
});