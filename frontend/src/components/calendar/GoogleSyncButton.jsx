export default function GoogleSyncButton({
  onClick,
  loading,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
    >
      {loading
        ? "Connecting..."
        : "Sync Google Calendar"}
    </button>
  );
}