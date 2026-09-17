import {
  DragDropContext,
} from "@hello-pangea/dnd";

import DroppableColumn from "./DroppableColumn";

import useTask from "../../../hooks/useTask";

export default function KanbanBoard({
  tasks = [],
  onAddTask,
}) {
  const { moveTask } = useTask();

  const columns = {
    Todo: tasks.filter(
      (t) => t.status === "Todo" || t.status === "To Do"
    ),
    "In Progress": tasks.filter(
      (t) => t.status === "In Progress"
    ),
    Review: tasks.filter(
      (t) => t.status === "Review"
    ),
    Done: tasks.filter(
      (t) => t.status === "Done" || t.status === "Completed"
    ),
  };

  const handleDragEnd = async (result) => {
    const { destination, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === result.source.droppableId) return;

    await moveTask(draggableId, destination.droppableId);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex gap-6 overflow-x-auto pb-4">
        <DroppableColumn
          status="To Do"
          title="To Do"
          tasks={columns.Todo}
          onAddTask={() => onAddTask && onAddTask("To Do")}
        />

        <DroppableColumn
          status="In Progress"
          title="In Progress"
          tasks={columns["In Progress"]}
          onAddTask={() => onAddTask && onAddTask("In Progress")}
        />

        <DroppableColumn
          status="Review"
          title="Review"
          tasks={columns.Review}
          onAddTask={() => onAddTask && onAddTask("Review")}
        />

        <DroppableColumn
          status="Done"
          title="Done"
          tasks={columns.Done}
          onAddTask={() => onAddTask && onAddTask("Done")}
        />
      </div>
    </DragDropContext>
  );
}