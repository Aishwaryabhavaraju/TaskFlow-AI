import { Routes, Route } from "react-router-dom";

import useSocket from "./hooks/useSocket";

import NotificationToast from "./components/collaboration/NotificationToast";

import Home from "./pages/Home";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

import Dashboard from "./pages/dashboard/Dashboard";

import WorkspaceHome from "./pages/workspace/WorkspaceHome";

import ProjectsPage from "./pages/projects/ProjectsPage";

import TaskBoard from "./pages/tasks/TaskBoard";

import NotFound from "./pages/NotFound";

import CalendarPage from "./pages/calendar/CalendarPage";
import TimelinePage from "./pages/timeline/TimelinePage";

function App() {
  useSocket();

  return (
    <>
      <NotificationToast />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/workspaces"
          element={<WorkspaceHome />}
        />

        <Route
          path="/projects/:workspaceId"
          element={<ProjectsPage />}
        />

        <Route
          path="/tasks/:projectId"
          element={<TaskBoard />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />

        <Route
          path="/calendar"
          element={<CalendarPage />}
        />
        
        <Route
          path="/timeline"
          element={<TimelinePage />}
        />
      </Routes>
    </>
  );
}

export default App;