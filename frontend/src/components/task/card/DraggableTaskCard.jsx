import { Draggable } from "@hello-pangea/dnd";

import TaskCard from "./TaskCard";

export default function DraggableTaskCard({
  task,
  index,
}) {
  return (
<Draggable draggableId={task._id} index={index}>
  {(provided, snapshot) => (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className={
        snapshot.isDragging
          ? "rotate-2 scale-105"
          : ""
      }
    >
      <TaskCard task={task} />
    </div>
  )}
</Draggable>
  );
}