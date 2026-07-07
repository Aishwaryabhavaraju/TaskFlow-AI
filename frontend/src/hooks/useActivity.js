import { useDispatch, useSelector } from "react-redux";

import activityService from "../services/activityService";

import {
  setActivities,
  addActivity,
  setLoading,
  setError,
} from "../redux/slices/activitySlice";

export default function useActivity() {

  const dispatch = useDispatch();

  const state = useSelector(
    state => state.activity
  );

  const fetchActivities = async (taskId) => {

    dispatch(setLoading(true));

    try {

      const data =
        await activityService.getActivities(taskId);

      dispatch(setActivities(data.activities));

    } catch (error) {

      dispatch(setError(error.message));

    } finally {

      dispatch(setLoading(false));

    }

  };

  return {
    ...state,
    fetchActivities,
    addNewActivity: (activity) =>
      dispatch(addActivity(activity)),
  };

}