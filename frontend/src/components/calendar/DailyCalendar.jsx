import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import EventContent from "./EventContent";

import useTaskSchedule from "../../hooks/useTaskSchedule";

export default function DailyCalendar({
  events,
  onEventClick,
}) {
  const { updateTaskSchedule } = useTaskSchedule();

  const handleEventDrop = async (info) => {
    try {
      await updateTaskSchedule(
        info.event.id,
        info.event.start,
        info.event.end
      );
    } catch (error) {
      info.revert();
    }
  };

  const handleEventResize = async (info) => {
    try {
      await updateTaskSchedule(
        info.event.id,
        info.event.start,
        info.event.end
      );
    } catch (error) {
      info.revert();
    }
  };

  return (
    <FullCalendar
      plugins={[
        timeGridPlugin,
        interactionPlugin,
      ]}
      initialView="timeGridDay"
      height="auto"
      events={events}
      nowIndicator={true}
      editable={true}
      selectable={true}
      allDaySlot={false}
      slotMinTime="06:00:00"
      slotMaxTime="22:00:00"
      eventContent={(info) => (
        <EventContent eventInfo={info} />
      )}
      eventClick={onEventClick}
      eventDrop={handleEventDrop}
      eventResize={handleEventResize}
      headerToolbar={{
        left: "prev,next today",
        center: "title",
        right: "",
      }}
    />
  );
}