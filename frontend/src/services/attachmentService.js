import api from "../api/axios";

export const getAttachments = async (taskId) => {
  const { data } = await api.get(
    `/attachments/${taskId}`
  );

  return data;
};

export const uploadAttachment = async (
  taskId,
  file
) => {

  const formData = new FormData();

  formData.append("file", file);

  const { data } = await api.post(
    `/attachments/${taskId}`,
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return data;
};

export const deleteAttachment = async (
  id
) => {

  await api.delete(
    `/attachments/${id}`
  );

};

export default {
  getAttachments,
  uploadAttachment,
  deleteAttachment,
};