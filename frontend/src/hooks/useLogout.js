import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logoutUser } from "../redux/slices/authSlice";

export default function useLogout() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await dispatch(logoutUser());
      toast.success("Logged out successfully");
    } catch {
      toast.success("Logged out");
    } finally {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return logout;
}
