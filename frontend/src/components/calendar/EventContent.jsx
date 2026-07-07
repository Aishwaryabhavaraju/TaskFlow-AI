export default function EventContent({ eventInfo }) {
  return (
    <div className="overflow-hidden text-xs">
      <strong>{eventInfo.timeText}</strong>

      <div className="truncate">
        {eventInfo.event.title}
      </div>
    </div>
  );
}