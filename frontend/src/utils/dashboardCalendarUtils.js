export const getTodayTasks = (tasks) => {
  const today = new Date().toDateString();

  return tasks.filter(
    (task) =>
      new Date(task.dueDate).toDateString() ===
      today
  );
};

export const getUpcomingTasks = (tasks) => {
  const today = new Date();

  return tasks.filter(
    (task) => new Date(task.dueDate) > today
  );
};

export const getOverdueTasks = (tasks) => {
  const today = new Date();

  return tasks.filter(
    (task) =>
      new Date(task.dueDate) < today &&
      task.status !== "Done"
  );
};