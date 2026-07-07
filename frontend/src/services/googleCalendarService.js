import api from "./api";

export const connectGoogleCalendar = async () => {
  const { data } = await api.get(
    "/calendar/google/connect"
  );

  return data;
};

export const syncGoogleCalendar = async () => {
  const { data } = await api.post(
    "/calendar/google/sync"
  );

  return data;
};

export const getGoogleEvents = async () => {
  const { data } = await api.get(
    "/calendar/google/events"
  );

  return data;
};

export default {
  connectGoogleCalendar,
  syncGoogleCalendar,
  getGoogleEvents,
};