import { useState } from "react";

import PriorityBadge from "./PriorityBadge";
import LabelBadge from "./LabelBadge";
import AssigneeAvatar from "./AssigneeAvatar";
import DueDateBadge from "./DueDateBadge";
import TaskFooter from "./TaskFooter";
import TaskMenu from "./TaskMenu";
import AIBadge from "./AIBadge";

import TaskDrawer from "../drawer/TaskDrawer";

export default function TaskCard({ task }) {
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <div
        onClick={handleOpenDrawer}
        className="cursor-pointer rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-900"
      >
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <PriorityBadge priority={task.priority} />

          {/* Prevent menu click from opening drawer twice */}
          <div onClick={(e) => e.stopPropagation()}>
            <TaskMenu />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold">
          {task.title}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm text-zinc-500">
          {task.description}
        </p>

        {/* Labels */}
        {task.labels?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {task.labels.map((label) => (
              <LabelBadge
                key={label}
                label={label}
              />
            ))}
          </div>
        )}

        {/* Due Date & AI */}
        <div className="mt-5 flex items-center justify-between">
          <DueDateBadge dueDate={task.dueDate} />

          {task.aiGenerated && <AIBadge />}
        </div>

        {/* Assignees */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex -space-x-2">
            {task.assignees?.map((user) => (
              <AssigneeAvatar
                key={user._id}
                user={user}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <TaskFooter
          comments={task.comments?.length || 0}
          attachments={task.attachments?.length || 0}
          hours={task.estimatedHours || 0}
        />
      </div>

      {/* Task Details Drawer */}
      <TaskDrawer
        open={openDrawer}
        task={task}
        onClose={handleCloseDrawer}
      />
    </>
  );
}