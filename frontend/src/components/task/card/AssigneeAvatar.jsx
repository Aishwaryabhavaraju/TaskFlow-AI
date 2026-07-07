export default function AssigneeAvatar({
  user,
}) {
  return (
    <div
      title={user.name}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-sm font-bold text-white"
    >
      {user.name.charAt(0)}
    </div>
  );
}