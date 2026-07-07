export function formatCalendarEvents(tasks = []) {
  return tasks.map((task) => ({
    id: task._id,
    title: task.title,
    start: task.startDate || task.dueDate,
    end: task.dueDate,
    extendedProps: {
      status: task.status,
      priority: task.priority,
      project: task.project?.name,
    },
    backgroundColor: getStatusColor(task.status),
    borderColor: getStatusColor(task.status),
  }));
}

function getStatusColor(status) {
  switch (status) {
    case "Todo":
      return "#3b82f6";

    case "In Progress":
      return "#f59e0b";

    case "Done":
      return "#10b981";

    default:
      return "#6b7280";
  }
}