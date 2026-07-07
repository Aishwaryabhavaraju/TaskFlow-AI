import useOutlookCalendar from "../../hooks/useOutlookCalendar";
import OutlookSyncButton from "./OutlookSyncButton";

export default function OutlookCalendarCard() {
  const {
    connected,
    loading,
    connect,
    sync,
  } = useOutlookCalendar();

  return (
    <div className="rounded-xl border p-6 shadow dark:border-zinc-700 dark:bg-zinc-900">

      <h2 className="mb-3 text-xl font-semibold">
        Microsoft Outlook Calendar
      </h2>

      <p className="mb-5 text-zinc-500">
        Connect your Microsoft account to synchronize your tasks.
      </p>

      {!connected ? (
        <OutlookSyncButton
          loading={loading}
          onClick={connect}
        />
      ) : (
        <OutlookSyncButton
          loading={loading}
          onClick={sync}
        />
      )}
    </div>
  );
}