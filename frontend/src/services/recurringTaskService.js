import api from "../api/axios";

export const updateRecurrence = async (
  taskId,
  recurrence
) => {

  const { data } = await api.put(
    `/tasks/${taskId}/recurrence`,
    recurrence
  );

  return data;

};

export default {
  updateRecurrence,
};