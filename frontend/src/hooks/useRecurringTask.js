import { toast } from "react-hot-toast";

import recurringTaskService
from "../services/recurringTaskService";

export default function useRecurringTask() {

  const saveRecurrence = async (
    taskId,
    recurrence
  ) => {

    try {

      await recurringTaskService.updateRecurrence(
        taskId,
        recurrence
      );

      toast.success(
        "Recurring settings updated."
      );

    }

    catch (error) {

      toast.error(
        "Unable to update recurring task."
      );

    }

  };

  return {

    saveRecurrence,

  };

}