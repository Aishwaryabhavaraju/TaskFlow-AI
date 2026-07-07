import api from "../api/axios";

export const updateSchedule = async (
  taskId,
  schedule
) => {
  const { data } = await api.put(
    `/tasks/${taskId}/schedule`,
    schedule
  );

  return data;
};

export default {
  updateSchedule,
};