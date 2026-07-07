import axiosInstance from "./axios";

/**
 * Register User
 */
export const register = async (userData) => {
  const response = await axiosInstance.post(
    "/auth/register",
    userData
  );

  return response.data;
};

/**
 * Login User
 */
export const login = async (credentials) => {
  const response = await axiosInstance.post(
    "/auth/login",
    credentials
  );

  return response.data;
};

/**
 * Get Current Logged In User
 */
export const getCurrentUser = async () => {
  const response = await axiosInstance.get("/auth/me");

  return response.data;
};

/**
 * Forgot Password
 */
export const forgotPassword = async (email) => {
  const response = await axiosInstance.post(
    "/auth/forgot-password",
    { email }
  );

  return response.data;
};

/**
 * Reset Password
 */
export const resetPassword = async (
  token,
  password
) => {
  const response = await axiosInstance.post(
    `/auth/reset-password/${token}`,
    {
      password,
    }
  );

  return response.data;
};

/**
 * Logout
 */
export const logout = async () => {
  const response = await axiosInstance.post(
    "/auth/logout"
  );

  return response.data;
};