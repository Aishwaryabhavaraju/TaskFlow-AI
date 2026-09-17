import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import CalendarHeader from "../../components/calendar/CalendarHeader";
import CalendarLegend from "../../components/calendar/CalendarLegend";
import CalendarContainer from "../../components/calendar/CalendarContainer";
import MonthlyCalendar from "../../components/calendar/MonthlyCalendar";
import WeeklyCalendar from "../../components/calendar/WeeklyCalendar";
import CalendarToolbar from "../../components/calendar/CalendarToolbar";
import DailyCalendar from "../../components/calendar/DailyCalendar";
import CalendarFilters from "../../components/calendar/CalendarFilters";
import CreateTaskModal from "../../components/task/modal/CreateTaskModal";
import useCalendarFilters from "../../hooks/useCalendarFilters";
import { filterCalendarEvents } from "../../utils/calendarFilter";
import useCalendar from "../../hooks/useCalendar";

export default function CalendarPage() {
  const { loading, events, fetchEvents } = useCalendar();
  const [view, setView] = useState("month");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const { filters, updateFilter, clearFilters } = useCalendarFilters();

  const filteredEvents = filterCalendarEvents(events, filters);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleEventClick = () => {
    // Event click action
  };

  return (
    <DashboardLayout>
      <CalendarHeader onCreateTask={() => setIsTaskModalOpen(true)} />

      <CalendarLegend />

      <CalendarFilters
        filters={filters}
        updateFilter={updateFilter}
        clearFilters={clearFilters}
      />

      <CalendarToolbar view={view} setView={setView} />

      <CalendarContainer>
        {loading ? (
          <p className="py-20 text-center text-zinc-500">Loading Calendar...</p>
        ) : view === "month" ? (
          <MonthlyCalendar
            events={filteredEvents}
            onEventClick={handleEventClick}
          />
        ) : view === "week" ? (
          <WeeklyCalendar
            events={filteredEvents}
            onEventClick={handleEventClick}
          />
        ) : (
          <DailyCalendar
            events={filteredEvents}
            onEventClick={handleEventClick}
          />
        )}
      </CalendarContainer>

      <CreateTaskModal
        open={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          fetchEvents();
        }}
      />
    </DashboardLayout>
  );
}

