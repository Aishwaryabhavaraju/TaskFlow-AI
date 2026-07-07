import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";

import workspaceReducer from "./workspace/workspaceSlice";

import projectReducer from "./slices/projectSlice";
import projectMemberReducer from "./slices/projectMemberSlice";

import taskReducer from "./slices/taskSlice";

import commentReducer from "./slices/commentSlice";

import attachmentReducer from "./slices/attachmentSlice";

import aiReducer from "./slices/aiSlice";

import activityReducer from "./slices/activitySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspace: workspaceReducer,
    project: projectReducer,
    projectMembers: projectMemberReducer,
    tasks: taskReducer,
    comments: commentReducer,
    attachments: attachmentReducer,
    ai: aiReducer,
    activity: activityReducer,
  },
});