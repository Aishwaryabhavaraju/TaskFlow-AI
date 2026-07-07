export default function AssigneeFilter({
  members = [],
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="rounded-xl border p-3 dark:bg-zinc-900"
    >
      <option value="">All Assignees</option>

      {members.map((member) => (
        <option
          key={member._id}
          value={member._id}
        >
          {member.name}
        </option>
      ))}

    </select>
  );
}