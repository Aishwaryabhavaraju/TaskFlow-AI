export default function TaskAssignees({ value = "", onChange, members = [] }) {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Assignee
      </label>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none focus:border-yellow-500 dark:border-zinc-700 dark:bg-zinc-900"
      >
        <option value="">Select Assignee (Unassigned)</option>
        {members.map((member) => {
          const userObj = member.user || member;
          const id = userObj._id || userObj.id || member._id;
          const name = userObj.firstName
            ? `${userObj.firstName} ${userObj.lastName}`
            : userObj.username || userObj.email || "User";
          return (
            <option key={id} value={id}>
              {name} ({userObj.email || "member"})
            </option>
          );
        })}
      </select>
    </div>
  );
}