import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import googleCalendarService from "../services/googleCalendarService";

import {
  setEvents,
  setLoading,
  setError,
} from "../redux/slices/googleCalendarSlice";

export default function useGoogleCalendar() {

  const dispatch = useDispatch();

  const state = useSelector(
    state => state.googleCalendar
  );

  const connect = async () => {

    dispatch(setLoading(true));

    try {

      const data =
        await googleCalendarService.connectGoogleCalendar();

      window.location.href = data.url;

    } catch (error) {

      dispatch(setError(error.message));

      toast.error("Connection failed");

    } finally {

      dispatch(setLoading(false));

    }

  };

  const sync = async () => {

    try {

      const data =
        await googleCalendarService.syncGoogleCalendar();

      dispatch(setEvents(data.events));

      toast.success(
        "Google Calendar synchronized."
      );

    } catch {

      toast.error("Sync failed");
    }

  };

  return {

    ...state,

    connect,

    sync,

  };

}
