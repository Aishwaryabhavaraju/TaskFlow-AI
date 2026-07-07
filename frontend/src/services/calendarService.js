import api from "../api/axios";

export const getCalendarEvents = async () => {

  const { data } = await api.get(
    "/calendar/events"
  );

  return data;

};

export default {
  getCalendarEvents,
};