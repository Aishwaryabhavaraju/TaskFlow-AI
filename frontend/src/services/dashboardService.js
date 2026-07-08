import api from "../api/axios";

export const getOverview = async () => {
  const response = await api.get("/dashboard/overview");
  return response.data.data;
};

export const getRecentTasks = async () => {
  const response = await api.get("/dashboard/recent-tasks");
  return response.data.data;
};

export const getUpcomingDeadlines = async () => {
  const response = await api.get("/dashboard/deadlines");
  return response.data.data;
};

export const getTaskStatusSummary = async () => {
  const response = await api.get("/dashboard/task-summary");
  return response.data.data;
};

export default {
  getOverview,
  getRecentTasks,
  getUpcomingDeadlines,
  getTaskStatusSummary,
};
