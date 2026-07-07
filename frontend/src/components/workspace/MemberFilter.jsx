export default function MemberFilter({
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      className="rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 p-3"
    >
      <option value="">All Roles</option>
      <option value="owner">Owner</option>
      <option value="admin">Admin</option>
      <option value="manager">Manager</option>
      <option value="member">Member</option>
      <option value="viewer">Viewer</option>
    </select>
  );
}