import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import calendarService from "../services/calendarService";
import { formatCalendarEvents } from "../utils/calendarEvents";

import {
  setEvents,
  setLoading,
  setError,
} from "../redux/slices/calendarSlice";
import { setTasks } from "../redux/slices/taskSlice";

export default function useCalendar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.calendar);

  const fetchEvents = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const data = await calendarService.getCalendarEvents();

      if (data && data.tasks) {
        dispatch(setTasks(data.tasks));
        dispatch(setEvents(formatCalendarEvents(data.tasks)));
      }
    } catch (error) {
      dispatch(setError(error.message || "Failed to load calendar events"));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return {
    ...state,
    fetchEvents,
  };
}