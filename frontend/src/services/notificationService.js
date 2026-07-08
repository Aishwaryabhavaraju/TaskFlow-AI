import api from "../api/axios";

export const getNotifications = async () => {
  const { data } = await api.get("/notifications");
  return data.data || data.notifications || [];
};

export const markNotificationRead = async (id) => {
  const { data } = await api.put(
    `/notifications/${id}/read`
  );

  return data.data;
};

export const markAllNotificationsRead = async () => {
  const { data } = await api.put(
    "/notifications/read-all"
  );

  return data;
};

export const deleteNotification = async (id) => {
  const { data } = await api.delete(
    `/notifications/${id}`
  );

  return data;
};

export const getNotificationPreferences = async () => {
  const { data } = await api.get(
    "/notifications/preferences"
  );

  return data.data;
};

export const updateNotificationPreferences = async (
  preferences
) => {
  const { data } = await api.put(
    "/notifications/preferences",
    preferences
  );

  return data.data;
};

export const sendDailyDigest = async () => {
  const { data } = await api.post(
    "/notifications/digest"
  );

  return data.data;
};

export default {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  getNotificationPreferences,
  updateNotificationPreferences,
  sendDailyDigest,
};
