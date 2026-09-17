import api from "../api/axios";

export const updateProfile = async (profileData) => {
  const response = await api.put("/users/profile", profileData);
  return response.data.data;
};

export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data.data;
};

export const deactivateAccount = async () => {
  const response = await api.delete("/users/deactivate");
  return response.data;
};

export const getApiKeys = async () => {
  const response = await api.get("/users/api-keys");
  return response.data.data;
};

export const saveApiKey = async (keyData) => {
  const response = await api.post("/users/api-keys", keyData);
  return response.data.data;
};

export const deleteApiKey = async (provider) => {
  const response = await api.delete(`/users/api-keys/${provider}`);
  return response.data.data;
};

export default {
  updateProfile,
  getProfile,
  deactivateAccount,
  getApiKeys,
  saveApiKey,
  deleteApiKey,
};
