import { useState } from "react";

export default function useCalendarFilters() {
  const [filters, setFilters] = useState({
    due: "all",
    priority: "all",
    assignee: "all",
    status: "all",
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      due: "all",
      priority: "all",
      assignee: "all",
      status: "all",
    });
  };

  return {
    filters,
    updateFilter,
    clearFilters,
  };
}