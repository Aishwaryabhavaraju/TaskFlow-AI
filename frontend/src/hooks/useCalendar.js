import { useDispatch, useSelector } from "react-redux";

import calendarService from "../services/calendarService";
import { formatCalendarEvents } from "../utils/calendarEvents";

import {
  setEvents,
  setLoading,
  setError,
} from "../redux/slices/calendarSlice";

export default function useCalendar() {

  const dispatch = useDispatch();

  const state = useSelector(
    state => state.calendar
  );

  const fetchEvents = async () => {

    dispatch(setLoading(true));

    try {

      const data =
        await calendarService.getCalendarEvents();

      dispatch(
  setEvents(
    formatCalendarEvents(data.tasks)
  )
);

    } catch (error) {

      dispatch(setError(error.message));

    } finally {

      dispatch(setLoading(false));

    }

  };

  return {

    ...state,

    fetchEvents,

  };

}