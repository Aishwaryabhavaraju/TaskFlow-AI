export default function TimelineTaskRow({
  task,
}) {
  return (
    <div className="mb-4 flex items-center">

      <div className="w-64 font-medium">

        {task.title}

      </div>

      <div className="flex-1">

        <div
          className="h-8 rounded bg-blue-500 text-center text-sm leading-8 text-white"
          style={{
            width: `${task.duration * 40}px`,
          }}
        >
          {task.status}
        </div>

      </div>

    </div>
  );
}