import TaskHeader from "./TaskHeader";
import TaskDetailsForm from "./TaskDetailsForm";
import TaskMetaInfo from "./TaskMetaInfo";
import CommentsSection from "./CommentsSection";
import AttachmentsSection from "./AttachmentsSection";
import ActivityTimeline from "./ActivityTimeline";
import AISuggestions from "../ai/AISuggestions";

export default function TaskDrawer({
  open,
  task,
  onClose,
}) {

  if (!open || !task)
    return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40">

      <div className="h-full w-full max-w-2xl overflow-y-auto bg-white p-6 dark:bg-zinc-900">

        <TaskHeader
          title={task.title}
          onClose={onClose}
        />

        <div className="mt-6 space-y-8">

          <TaskMetaInfo
            task={task}
          />

          <TaskDetailsForm
            task={task}
          />
           <AISuggestions
                task={task}
            />

          <CommentsSection
            taskId={task._id}
            />

          <AttachmentsSection
                taskId={task._id}
           />

          <ActivityTimeline
                taskId={task._id}
            />

        </div>

      </div>

    </div>
  );
}