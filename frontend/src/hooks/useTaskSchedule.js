import { toast } from "react-hot-toast";
import socket from "../socket/socket";

import scheduleService from "../services/scheduleService";

export default function useTaskSchedule() {
  const updateTaskSchedule = async (
    taskId,
    start,
    end
  ) => {
    try {
      const data =
        await scheduleService.updateSchedule(
          taskId,
          {
            startDate: start,
            endDate: end,
          }
        );

      socket.emit(
        "taskScheduleUpdated",
        data.task
      );

      toast.success(
        "Task schedule updated."
      );

      return data.task;
    } catch (error) {
      toast.error(
        "Failed to update schedule."
      );

      console.error(error);
    }
  };

  return {
    updateTaskSchedule,
  };
}