import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

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
    </Routes>
  );
}