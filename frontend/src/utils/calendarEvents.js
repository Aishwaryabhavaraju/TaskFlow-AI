export function formatCalendarEvents(tasks = []) {
  return tasks
    .filter((task) => task && (task.dueDate || task.startDate))
    .map((task) => {
      const rawDate = task.dueDate || task.startDate;
      let dateOnly = "";

      if (typeof rawDate === "string") {
        dateOnly = rawDate.split("T")[0];
      } else if (rawDate instanceof Date) {
        dateOnly = rawDate.toISOString().split("T")[0];
      }

      return {
        id: task._id,
        title: task.title,
        start: dateOnly || rawDate,
        allDay: true,
        extendedProps: {
          status: task.status,
          priority: task.priority,
          project: task.project?.name,
        },
        backgroundColor: getStatusColor(task.status),
        borderColor: getStatusColor(task.status),
      };
    });
}

function getStatusColor(status) {
  switch (status) {
    case "Todo":
    case "To Do":
      return "#3b82f6";

    case "In Progress":
      return "#f59e0b";

    case "Review":
      return "#8b5cf6";

    case "Done":
    case "Completed":
      return "#10b981";

    default:
      return "#6366f1";
  }
}