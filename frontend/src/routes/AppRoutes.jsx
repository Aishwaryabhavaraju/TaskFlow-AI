import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AppLoader from "../components/common/AppLoader";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

const Login = lazy(() => import("../pages/auth/Login"));
const Register = lazy(() => import("../pages/auth/Register"));
const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/auth/ResetPassword"));
const LandingPage = lazy(() => import("../pages/landing/LandingPage"));

const Dashboard = lazy(() => import("../pages/dashboard/Dashboard"));
const Appearance = lazy(() => import("../pages/settings/Appearance"));
const SettingsAdministration = lazy(() =>
  import("../pages/settings/SettingsAdministration")
);

const WorkspaceHome = lazy(() => import("../pages/workspace/WorkspaceHome"));
const WorkspaceDashboard = lazy(() =>
  import("../pages/workspace/WorkspaceDashboard")
);
const WorkspaceDetails = lazy(() =>
  import("../pages/workspace/WorkspaceDetails")
);
const WorkspaceMembersPage = lazy(() =>
  import("../pages/workspace/WorkspaceMembersPage")
);
const WorkspaceSettings = lazy(() =>
  import("../pages/workspace/WorkspaceSettings")
);

const ProjectsHome = lazy(() => import("../pages/project/ProjectsHome"));
const ProjectDetails = lazy(() => import("../pages/project/ProjectDetails"));
const ProjectSettings = lazy(() => import("../pages/project/ProjectSettings"));
const ProjectAnalytics = lazy(() =>
  import("../pages/analytics/ProjectAnalytics")
);
const TaskBoard = lazy(() => import("../pages/task/TaskBoard"));
const AIAssistantPage = lazy(() => import("../pages/ai/AIAssistantPage"));
const NotFound = lazy(() => import("../pages/errors/NotFound"));
const Offline = lazy(() => import("../pages/errors/Offline"));

const privatePage = (component) => (
  <PrivateRoute>{component}</PrivateRoute>
);

export default function AppRoutes() {
  return (
    <Suspense fallback={<AppLoader />}>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
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
          path="/dashboard"
          element={privatePage(<Dashboard />)}
        />

        <Route
          path="/settings/appearance"
          element={privatePage(<Appearance />)}
        />

        <Route
          path="/settings"
          element={privatePage(<SettingsAdministration />)}
        />

        <Route
          path="/workspaces"
          element={privatePage(<WorkspaceHome />)}
        />

        <Route
          path="/workspaces/:workspaceId"
          element={privatePage(<WorkspaceDashboard />)}
        />

        <Route
          path="/workspaces/:workspaceId/details"
          element={privatePage(<WorkspaceDetails />)}
        />

        <Route
          path="/workspaces/:workspaceId/members"
          element={privatePage(<WorkspaceMembersPage />)}
        />

        <Route
          path="/workspaces/:workspaceId/settings"
          element={privatePage(<WorkspaceSettings />)}
        />

        <Route
          path="/workspaces/:workspaceId/projects"
          element={privatePage(<ProjectsHome />)}
        />

        <Route
          path="/projects/:projectId"
          element={privatePage(<ProjectDetails />)}
        />

        <Route
          path="/projects/:projectId/settings"
          element={privatePage(<ProjectSettings />)}
        />

        <Route
          path="/projects/:projectId/analytics"
          element={privatePage(<ProjectAnalytics />)}
        />

        <Route
          path="/projects/:projectId/tasks"
          element={privatePage(<TaskBoard />)}
        />

        <Route
          path="/ai"
          element={privatePage(<AIAssistantPage />)}
        />

        <Route
          path="/offline"
          element={privatePage(<Offline />)}
        />

        <Route
          path="*"
          element={privatePage(<NotFound />)}
        />
      </Routes>
    </Suspense>
  );
}
