import api from "../api/axios";

export const getProjects = async (workspaceId) => {
  const endpoint = workspaceId
    ? `/projects/workspace/${workspaceId}`
    : "/projects";

  const response = await api.get(endpoint);

  return response.data.data;
};

export const getProject = async (projectId) => {
  const response = await api.get(
    `/projects/${projectId}`
  );

  return response.data.data;
};

export const createProject = async (data) => {
  const response = await api.post(
    "/projects",
    data
  );

  return response.data.data;
};

export const updateProject = async (
  id,
  data
) => {
  const response = await api.put(
    `/projects/${id}`,
    data
  );

  return response.data.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(
    `/projects/${id}`
  );

  return response.data.data;
};

export const archiveProject = async (id) => {
  const response = await api.patch(
    `/projects/${id}/archive`
  );

  return response.data.data;
};

export const restoreProject = async (id) => {
  const response = await api.patch(
    `/projects/${id}/restore`
  );

  return response.data.data;
};