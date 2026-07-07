export default function TaskMetaInfo({
  task,
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2">

      <div>

        <p className="font-medium">
          Priority
        </p>

        <p>{task.priority}</p>

      </div>

      <div>

        <p className="font-medium">
          Status
        </p>

        <p>{task.status}</p>

      </div>

      <div>

        <p className="font-medium">
          Due Date
        </p>

        <p>
          {task.dueDate
            ? new Date(
                task.dueDate
              ).toLocaleDateString()
            : "-"}
        </p>

      </div>

      <div>

        <p className="font-medium">
          Estimated Hours
        </p>

        <p>
          {task.estimatedHours}
        </p>

      </div>

    </div>
  );
}