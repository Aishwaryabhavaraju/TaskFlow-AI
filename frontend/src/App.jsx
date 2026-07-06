import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AppRoutes from "./routes/AppRoutes";

import { loadUser } from "./redux/slices/authSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return <AppRoutes />;
}