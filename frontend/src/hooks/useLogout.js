import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { logoutUser } from "../redux/slices/authSlice";

export default function useLogout() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();

      toast.success("Logged out successfully");

      navigate("/login");
    } catch (error) {
      toast.error("Unable to logout");
    }
  };

  return logout;
}