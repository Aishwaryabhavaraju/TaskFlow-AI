import { Link } from "react-router-dom";
import { Home, SearchX } from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import SEO from "../../components/common/SEO";

export default function NotFound() {
  return (
    <DashboardLayout>
      <SEO
        title="Page not found | TaskFlow AI"
        description="The requested TaskFlow AI page could not be found."
      />

      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="max-w-lg rounded-lg border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
            <SearchX size={28} />
          </div>

          <h1 className="text-3xl font-bold">Page not found</h1>
          <p className="mt-3 text-zinc-500">
            This page may have moved, or the link may be incomplete.
          </p>

          <Link
            to="/dashboard"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:bg-yellow-300"
          >
            <Home size={16} />
            Back to dashboard
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
