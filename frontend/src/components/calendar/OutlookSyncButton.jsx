export default function OutlookSyncButton({
  loading,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
    >
      {loading
        ? "Connecting..."
        : "Sync Outlook Calendar"}
    </button>
  );
}