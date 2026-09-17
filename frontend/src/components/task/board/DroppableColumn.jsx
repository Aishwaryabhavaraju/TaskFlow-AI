import { Droppable } from "@hello-pangea/dnd";

import KanbanColumn from "./KanbanColumn";

export default function DroppableColumn({
  status,
  title,
  tasks,
  onAddTask,
}) {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <KanbanColumn
            title={title}
            tasks={tasks}
            onAddTask={onAddTask}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}