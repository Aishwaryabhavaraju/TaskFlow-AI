import api from "./api";

export const getProjectAnalytics = async (projectId) => {
  const { data } = await api.get(
    `/analytics/projects/${projectId}`
  );

  return data;
};

export default {
  getProjectAnalytics,
};