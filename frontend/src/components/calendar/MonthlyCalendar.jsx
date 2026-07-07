import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import EventContent from "./EventContent";
import useTaskSchedule from "../../hooks/useTaskSchedule";

export default function MonthlyCalendar({
  events,
  onEventClick,
}) {
  const { updateTaskSchedule } = useTaskSchedule();

  return (
    <FullCalendar
      plugins={[
        dayGridPlugin,
        interactionPlugin,
      ]}
      initialView="dayGridMonth"
      height="auto"
      events={events}
      editable={true}
      selectable={true}
      weekends={true}
      eventContent={(eventInfo) => (
        <EventContent eventInfo={eventInfo} />
      )}
      eventClick={onEventClick}
      eventDrop={async (info) => {
        try {
          await updateTaskSchedule(
            info.event.id,
            info.event.start,
            info.event.end
          );
        } catch (error) {
          info.revert();
        }
      }}
      eventResize={async (info) => {
        try {
          await updateTaskSchedule(
            info.event.id,
            info.event.start,
            info.event.end
          );
        } catch (error) {
          info.revert();
        }
      }}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "",
      }}
    />
  );
}