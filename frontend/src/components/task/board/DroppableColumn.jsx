import { Droppable } from "@hello-pangea/dnd";

import KanbanColumn from "./KanbanColumn";

export default function DroppableColumn({
  status,
  title,
  tasks,
}) {
  return (
    <Droppable
      droppableId={status}
    >
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <KanbanColumn
            title={title}
            tasks={tasks}
          />

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}