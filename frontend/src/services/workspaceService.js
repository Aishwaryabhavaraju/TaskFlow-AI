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

export const inviteMember = async (workspaceId, data) => {
  const response = await api.post(
    `/workspaces/${workspaceId}/invite`,
    data
  );

  return response.data;
};

export const updateMemberRole = async (
  workspaceId,
  memberId,
  role
) => {
  const response = await api.put(
    `/workspaces/${workspaceId}/members/${memberId}/role`,
    { role }
  );

  return response.data;
};

export const removeMember = async (
  workspaceId,
  memberId
) => {
  const response = await api.delete(
    `/workspaces/${workspaceId}/members/${memberId}`
  );

  return response.data;
};

export const getWorkspaceSettings = async (workspaceId) => {
  const response = await api.get(
    `/workspaces/${workspaceId}/settings`
  );

  return response.data;
};

export const updateWorkspaceSettings = async (
  workspaceId,
  data
) => {
  const response = await api.put(
    `/workspaces/${workspaceId}/settings`,
    data
  );

  return response.data;
};

export const archiveWorkspace = async (
  workspaceId
) => {
  const response = await api.patch(
    `/workspaces/${workspaceId}/archive`
  );

  return response.data;
};