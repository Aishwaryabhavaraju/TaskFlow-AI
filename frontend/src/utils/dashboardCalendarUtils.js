export const getTodayTasks = (tasks) => {
  const todayStr = new Date().toDateString();

  return tasks.filter(
    (task) =>
      task?.dueDate &&
      new Date(task.dueDate).toDateString() === todayStr
  );
};

export const getUpcomingTasks = (tasks) => {
  const today = new Date();

  return tasks.filter(
    (task) =>
      task?.dueDate &&
      new Date(task.dueDate) > today &&
      !/done|completed/i.test(task.status || "")
  );
};

export const getOverdueTasks = (tasks) => {
  const today = new Date();

  return tasks.filter(
    (task) =>
      task?.dueDate &&
      new Date(task.dueDate) < today &&
      new Date(task.dueDate).toDateString() !== today.toDateString() &&
      !/done|completed/i.test(task.status || "")
  );
};