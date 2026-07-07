export function filterCalendarEvents(events, filters) {
  const today = new Date();

  return events.filter((event) => {
    const eventDate = new Date(event.start);

    if (filters.due === "today") {
      if (
        eventDate.toDateString() !== today.toDateString()
      )
        return false;
    }

    if (filters.due === "week") {
      const weekEnd = new Date(today);
      weekEnd.setDate(today.getDate() + 7);

      if (
        eventDate < today ||
        eventDate > weekEnd
      )
        return false;
    }

    if (filters.due === "month") {
      if (
        eventDate.getMonth() !==
          today.getMonth() ||
        eventDate.getFullYear() !==
          today.getFullYear()
      )
        return false;
    }

    if (filters.due === "overdue") {
      if (eventDate >= today) return false;
    }

    if (
      filters.priority !== "all" &&
      event.extendedProps?.priority !==
        filters.priority
    )
      return false;

    if (
      filters.status !== "all" &&
      event.extendedProps?.status !==
        filters.status
    )
      return false;

    if (
      filters.assignee !== "all" &&
      event.extendedProps?.assignee !==
        filters.assignee
    )
      return false;

    return true;
  });
}