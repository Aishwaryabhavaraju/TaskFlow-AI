import api from "./api";

export const getComments = async (taskId) => {
  const { data } = await api.get(`/comments/${taskId}`);
  return data;
};

export const createComment = async (taskId, text) => {
  const { data } = await api.post(`/comments/${taskId}`, {
    text,
  });

  return data;
};

export const editComment = async (id, text) => {
  const { data } = await api.put(`/comments/${id}`, {
    text,
  });

  return data;
};

export const removeComment = async (id) => {
  const { data } = await api.delete(`/comments/${id}`);
  return data;
};

export default {
  getComments,
  createComment,
  editComment,
  removeComment,
};