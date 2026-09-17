import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AppLoader from "../components/common/AppLoader";

export default function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return <AppLoader label="Checking session..." />;
  }

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    children
  );
}