import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

import outlookCalendarService from "../services/outlookCalendarService";

import {
  setConnected,
  setEvents,
  setLoading,
  setError,
} from "../redux/slices/outlookCalendarSlice";

export default function useOutlookCalendar() {
  const dispatch = useDispatch();

  const state = useSelector(
    (state) => state.outlookCalendar
  );

  const connect = async () => {
    dispatch(setLoading(true));

    try {
      const data =
        await outlookCalendarService.connectOutlook();

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
        await outlookCalendarService.syncOutlook();

      dispatch(setEvents(data.events));

      toast.success(
        "Outlook Calendar synchronized."
      );
    } catch {
      toast.error("Synchronization failed.");
    }
  };

  return {
    ...state,
    connect,
    sync,
  };
}