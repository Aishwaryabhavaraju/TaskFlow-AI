import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import AppLoader from "../components/common/AppLoader";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return <AppLoader label="Checking your session" />;
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}
