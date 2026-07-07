import { useState } from "react";

export default function useTaskFilters() {

  const [filters, setFilters] =
    useState({
      search: "",
      status: "",
      priority: "",
      assignee: "",
      label: "",
      dueDate: "",
      sort: "createdAt",
    });

  const updateFilter = (
    key,
    value
  ) => {

    const updated = {
      ...filters,
      [key]: value,
    };

    setFilters(updated);

    localStorage.setItem(
      "taskFilters",
      JSON.stringify(updated)
    );

  };

  return {
    filters,
    updateFilter,
  };
}