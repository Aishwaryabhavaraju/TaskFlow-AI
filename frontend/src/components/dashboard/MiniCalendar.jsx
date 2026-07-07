import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function MiniCalendar({
  events,
}) {
  return (
    <div className="rounded-xl border bg-white p-4 shadow dark:border-zinc-700 dark:bg-zinc-900">
      <h2 className="mb-4 text-lg font-semibold">
        Calendar
      </h2>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height={350}
        headerToolbar={{
          left: "prev,next",
          center: "title",
          right: "",
        }}
        events={events}
      />
    </div>
  );
}