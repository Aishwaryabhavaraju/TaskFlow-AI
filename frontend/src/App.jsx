import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "./hooks/useSocket";
import NotificationToast from "./components/collaboration/NotificationToast";
import AppRoutes from "./routes/AppRoutes";
import ErrorBoundary from "./components/common/ErrorBoundary";
import SEO from "./components/common/SEO";
import { loadUser } from "./redux/slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      dispatch(loadUser());
    }
  }, [dispatch, token, user]);

  useSocket();


  return (
    <ErrorBoundary>
      <SEO />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-yellow-400 focus:px-4 focus:py-2 focus:font-semibold focus:text-black"
      >
        Skip to main content
      </a>
      <NotificationToast />
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
