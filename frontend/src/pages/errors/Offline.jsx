import { WifiOff } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import SEO from "../../components/common/SEO";

export default function Offline() {
  return (
    <DashboardLayout>
      <SEO
        title="Offline | TaskFlow AI"
        description="TaskFlow AI is waiting for your network connection to return."
      />

      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-lg rounded-lg border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            <WifiOff size={28} />
          </div>

          <h1 className="text-3xl font-bold">You are offline</h1>
          <p className="mt-3 text-zinc-500">
            Reconnect to the internet and TaskFlow AI will continue from where
            you left off.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
