import TimelineTaskRow from "./TimelineTaskRow";

export default function TimelineGrid({
  tasks,
}) {
  return (
    <div
    draggable
    className="cursor-move"
    >

      {tasks.map(task => (

        <TimelineTaskRow
          key={task._id}
          task={task}
        />

      ))}

    </div>
  );
}