import api from "../api/axios";

const buildQuery = (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      params.append(key, value);
    }
  });

  const query = params.toString();
  return query ? `?${query}` : "";
};

export const getProjectAnalytics = async (
  projectId,
  filters
) => {
  const { data } = await api.get(
    `/analytics/projects/${projectId}${buildQuery(filters)}`
  );

  return data.data;
};

export const exportProjectAnalytics = async (
  projectId,
  format,
  filters
) => {
  const response = await api.get(
    `/analytics/projects/${projectId}/export/${format}${buildQuery(filters)}`,
    {
      responseType: "blob",
    }
  );

  return response.data;
};

export default {
  getProjectAnalytics,
  exportProjectAnalytics,
};
