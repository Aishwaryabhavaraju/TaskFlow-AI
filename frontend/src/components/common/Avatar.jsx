export default function Avatar({
  user,
  size = "md",
}) {
  const sizes = {
    sm: "h-8 w-8 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-14 w-14 text-xl",
  };

  const initials = `${user?.firstName?.[0] || ""}${user?.lastName?.[0] || ""}`.toUpperCase();

  return (
    <div
      className={`
        ${sizes[size]}
        rounded-full
        bg-yellow-400
        text-black
        font-bold
        flex
        items-center
        justify-center
        select-none
      `}
    >
      {user?.profilePicture ? (
        <img
          src={user.profilePicture}
          alt={user.firstName}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        initials || "U"
      )}
    </div>
  );
}