import api from "./axios";

export const getWorkspaces = async () => {
  const response = await api.get("/workspaces");
  return response.data;
};

export const getWorkspaceById = async (id) => {
  const response = await api.get(`/workspaces/${id}`);
  return response.data;
};

export const createWorkspace = async (formData) => {
  const response = await api.post(
    "/workspaces",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};