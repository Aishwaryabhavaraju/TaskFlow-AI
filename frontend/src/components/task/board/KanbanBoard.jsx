import {
  DragDropContext,
} from "@hello-pangea/dnd";

import DroppableColumn from "./DroppableColumn";

import useTask from "../../../hooks/useTask";

export default function KanbanBoard({
  tasks,
}) {

  const { moveTask } =
    useTask();

  const columns = {
    Todo: tasks.filter(
      t => t.status === "Todo"
    ),

    "In Progress":
      tasks.filter(
        t =>
          t.status ===
          "In Progress"
      ),

    Review: tasks.filter(
      t =>
        t.status ===
        "Review"
    ),

    Done: tasks.filter(
      t => t.status === "Done"
    ),
  };

  const handleDragEnd =
    async (result) => {

      const {
        destination,
        draggableId,
      } = result;

      if (!destination)
        return;

      if (
        destination.droppableId ===
        result.source
          .droppableId
      )
        return;

      await moveTask(
        draggableId,
        destination.droppableId
      );

  };

  return (
    <DragDropContext
      onDragEnd={
        handleDragEnd
      }
    >
      <div className="flex gap-6 overflow-x-auto">

        <DroppableColumn
          status="Todo"
          title="Todo"
          tasks={columns.Todo}
        />

        <DroppableColumn
          status="In Progress"
          title="In Progress"
          tasks={
            columns[
              "In Progress"
            ]
          }
        />

        <DroppableColumn
          status="Review"
          title="Review"
          tasks={columns.Review}
        />

        <DroppableColumn
          status="Done"
          title="Done"
          tasks={columns.Done}
        />

      </div>
    </DragDropContext>
  );
}