export default function OnlineIndicator({
  online,
}) {
  return (
    <span
      className={`h-3 w-3 rounded-full ${
        online
          ? "bg-green-500"
          : "bg-zinc-400"
      }`}
    />
  );
}