import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";

import workspaceReducer from "./workspace/workspaceSlice";

import projectReducer from "./slices/projectSlice";
import projectMemberReducer from "./slices/projectMemberSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspace: workspaceReducer,
    project: projectReducer,
    projectMembers: projectMemberReducer,
  },
});