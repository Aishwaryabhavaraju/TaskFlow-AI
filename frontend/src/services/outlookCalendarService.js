import api from "../api/axios";

export const connectOutlook = async () => {
  const { data } = await api.get(
    "/calendar/outlook/connect"
  );

  return data;
};

export const syncOutlook = async () => {
  const { data } = await api.post(
    "/calendar/outlook/sync"
  );

  return data;
};

export const getOutlookEvents = async () => {
  const { data } = await api.get(
    "/calendar/outlook/events"
  );

  return data;
};

export default {
  connectOutlook,
  syncOutlook,
  getOutlookEvents,
};