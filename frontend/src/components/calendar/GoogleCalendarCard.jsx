import useGoogleCalendar from "../../hooks/useGoogleCalendar";
import GoogleSyncButton from "./GoogleSyncButton";

export default function GoogleCalendarCard() {

  const {
    connected,
    loading,
    connect,
    sync,
  } = useGoogleCalendar();

  return (
    <div className="rounded-xl border p-6 shadow">

      <h2 className="mb-3 text-xl font-semibold">

        Google Calendar

      </h2>

      <p className="mb-5 text-zinc-500">

        Connect your Google account
        to sync tasks.

      </p>

      {!connected ? (

        <GoogleSyncButton
          loading={loading}
          onClick={connect}
        />

      ) : (

        <GoogleSyncButton
          loading={loading}
          onClick={sync}
        />

      )}

    </div>
  );

}