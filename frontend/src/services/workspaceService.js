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

export const updateWorkspace = async (id, formData) => {
  const response = await api.put(
    `/workspaces/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteWorkspace = async (id) => {
  const response = await api.delete(`/workspaces/${id}`);
  return response.data;
};

export const getWorkspaceMembers = async (workspaceId) => {
  const response = await api.get(
    `/workspaces/${workspaceId}/members`
  );

  return response.data;
};