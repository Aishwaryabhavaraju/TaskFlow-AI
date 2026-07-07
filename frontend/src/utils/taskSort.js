const priorityOrder = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

export const sortTasks = (
  tasks,
  sortBy
) => {

  const sorted = [...tasks];

  switch (sortBy) {

    case "priority":
      sorted.sort(
        (a, b) =>
          priorityOrder[b.priority] -
          priorityOrder[a.priority]
      );
      break;

    case "dueDate":
      sorted.sort(
        (a, b) =>
          new Date(a.dueDate) -
          new Date(b.dueDate)
      );
      break;

    case "title":
      sorted.sort((a, b) =>
        a.title.localeCompare(
          b.title
        )
      );
      break;

    default:
      sorted.sort(
        (a, b) =>
          new Date(
            b.createdAt
          ) -
          new Date(a.createdAt)
      );
  }

  return sorted;

};