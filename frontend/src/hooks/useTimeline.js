import { useDispatch, useSelector } from "react-redux";

import timelineService from "../services/timelineService";

import {
  setTimelineTasks,
  setLoading,
  setError,
} from "../redux/slices/timelineSlice";

export default function useTimeline() {
  const dispatch = useDispatch();

  const state = useSelector(
    state => state.timeline
  );

  const fetchTimeline = async () => {

    dispatch(setLoading(true));

    try {

      const data =
        await timelineService.getTimelineTasks();

      dispatch(
        setTimelineTasks(data.tasks)
      );

    } catch (error) {

      dispatch(setError(error.message));

    } finally {

      dispatch(setLoading(false));

    }

  };

  return {

    ...state,

    fetchTimeline,

  };
}