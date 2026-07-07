export default function MemberAvatar({
  member,
}) {
  return (
    <img
      src={
        member.profilePicture ||
        "https://ui-avatars.com/api/?name=" +
          member.name
      }
      alt={member.name}
      className="h-12 w-12 rounded-full"
    />
  );
}