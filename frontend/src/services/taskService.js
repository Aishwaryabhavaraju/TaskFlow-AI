import api from "../api/axios";

export const getTasks = async (projectId) => {
  const endpoint = projectId
    ? `/tasks?project=${projectId}`
    : "/tasks";

  const { data } = await api.get(endpoint);

  return data;
};

export const createTask = async (payload) => {
  const { data } = await api.post(
    "/tasks",
    payload
  );

  return data;
};

export const updateTask = async (
  id,
  payload
) => {
  const { data } = await api.put(
    `/tasks/${id}`,
    payload
  );

  return data;
};

export const deleteTask = async (
  id
) => {
  const { data } = await api.delete(
    `/tasks/${id}`
  );

  return data;
};

export const updateTaskStatus = async (
  taskId,
  status,
  columnId
) => {
  const payload = { status };

  if (columnId) {
    payload.columnId = columnId;
  }

  const { data } = await api.put(
    `/tasks/${taskId}/move`,
    payload
  );

  return data;
};

export const watchTask = async (taskId) => {
  const { data } = await api.put(
    `/tasks/${taskId}/watch`
  );

  return data;
};

export const unwatchTask = async (taskId) => {
  const { data } = await api.delete(
    `/tasks/${taskId}/watch`
  );

  return data;
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  watchTask,
  unwatchTask,
};
