export const filterTasks = (
  tasks,
  filters
) => {

  return tasks.filter(task => {

    if (
      filters.search &&
      !task.title
        .toLowerCase()
        .includes(
          filters.search.toLowerCase()
        )
    )
      return false;

    if (
      filters.status &&
      task.status !== filters.status
    )
      return false;

    if (
      filters.priority &&
      task.priority !==
        filters.priority
    )
      return false;

    if (
      filters.assignee &&
      !task.assignees?.some(
        user =>
          user._id ===
          filters.assignee
      )
    )
      return false;

    if (
      filters.label &&
      !task.labels?.includes(
        filters.label
      )
    )
      return false;

    if (
      filters.dueDate &&
      task.dueDate !==
        filters.dueDate
    )
      return false;

    return true;

  });

};