import api from "../api/axios";

export const getActivities = async (taskId) => {
  const { data } = await api.get(
    `/activities/${taskId}`
  );

  return data;
};

export default {
  getActivities,
};