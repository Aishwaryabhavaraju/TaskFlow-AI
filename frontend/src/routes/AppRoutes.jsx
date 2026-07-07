import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

import Appearance from "../pages/settings/Appearance";

import WorkspaceHome from "../pages/workspace/WorkspaceHome";
import WorkspaceDashboard from "../pages/workspace/WorkspaceDashboard";
import WorkspaceDetails from "../pages/workspace/WorkspaceDetails";
import WorkspaceMembersPage from "../pages/workspace/WorkspaceMembersPage";
import WorkspaceSettings from "../pages/workspace/WorkspaceSettings";

import ProjectsHome from "../pages/project/ProjectsHome";
import ProjectDetails from "../pages/project/ProjectDetails";
import ProjectSettings from "../pages/project/ProjectSettings";
import ProjectAnalytics from "../pages/analytics/ProjectAnalytics";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/register"
        element={
            <PublicRoute>
            <Register />
            </PublicRoute>
        }
       />

       <Route
            path="/forgot-password"
            element={
                <PublicRoute>
                    <ForgotPassword />
                </PublicRoute>
            }
        />

        <Route
            path="/reset-password/:token"
            element={
                <PublicRoute>
                    <ResetPassword />
                </PublicRoute>
            }
        />

        <Route
            path="/settings/appearance"
            element={<Appearance />}
        />

        <Route
            path="/workspaces"
            element={<WorkspaceHome />}
        />
        
        <Route
          path="/workspaces/:workspaceId"
          element={<WorkspaceDashboard />}
        />

        <Route
          path="/workspaces/:workspaceId/details"
          element={<WorkspaceDetails />}
        />

        <Route
          path="/workspaces/:workspaceId/members"
          element={<WorkspaceMembersPage />}
        />

        <Route
            path="/workspaces/:workspaceId/settings"
            element={<WorkspaceSettings />}
        />

        <Route
            path="/workspaces/:workspaceId/projects"
            element={<ProjectsHome />}
        />

        <Route
          path="/projects/:projectId"
          element={<ProjectDetails />}
        />

        <Route
          path="/projects/:projectId/settings"
          element={<ProjectSettings />}
        />

        <Route
          path="/projects/:projectId/analytics"
          element={<ProjectAnalytics />}
        />
    </Routes>
  );
}