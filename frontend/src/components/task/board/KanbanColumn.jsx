import ColumnHeader from "./ColumnHeader";
import AddTaskButton from "./AddTaskButton";
import BoardEmptyColumn from "./BoardEmptyColumn";

import DraggableTaskCard from "../card/DraggableTaskCard";

export default function KanbanColumn({
  title,
  tasks,
}) {
  return (
    <div className="flex w-[340px] flex-shrink-0 flex-col rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-900 transition-all duration-300">

      <ColumnHeader
        title={title}
        count={tasks.length}
      />

      <div className="flex-1 space-y-4">

        {tasks.length === 0 ? (

          <BoardEmptyColumn />

        ) : (

          tasks.map((task, index) => (

                <DraggableTaskCard
                    key={task._id}
                    task={task}
                    index={index}
                />

            ))

        )}

      </div>

      <div className="mt-5">

        <AddTaskButton />

      </div>

    </div>
  );
}