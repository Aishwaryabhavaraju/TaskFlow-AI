import api from "./api";

export const getTimelineTasks = async () => {
  const { data } = await api.get("/timeline");

  return data;
};

export default {
  getTimelineTasks,
};