import api from "../api/axios";

export const getProjects = async (workspaceId) => {
  const response = await api.get(
    `/projects/workspace/${workspaceId}`
  );

  return response.data;
};

export const getProject = async (projectId) => {
  const response = await api.get(
    `/projects/${projectId}`
  );

  return response.data;
};

export const createProject = async (data) => {
  const response = await api.post(
    "/projects",
    data
  );

  return response.data;
};

export const updateProject = async (
  id,
  data
) => {
  const response = await api.put(
    `/projects/${id}`,
    data
  );

  return response.data;
};

export const deleteProject = async (id) => {
  const response = await api.delete(
    `/projects/${id}`
  );

  return response.data;
};

export const archiveProject = async (id) => {
  const response = await api.patch(
    `/projects/${id}/archive`
  );

  return response.data;
};

export const restoreProject = async (id) => {
  const response = await api.patch(
    `/projects/${id}/restore`
  );

  return response.data;
};