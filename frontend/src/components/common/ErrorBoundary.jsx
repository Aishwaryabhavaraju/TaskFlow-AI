import { Component } from "react";
import { RefreshCw, TriangleAlert } from "lucide-react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error, info) {
    console.error("Application error", error, info);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-100 p-6 text-zinc-900 dark:bg-zinc-950 dark:text-white">
        <div className="max-w-lg rounded-lg border border-zinc-200 bg-white p-8 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-300">
            <TriangleAlert size={24} />
          </div>

          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="mt-3 text-zinc-500">
            TaskFlow AI hit an unexpected UI error. Refreshing usually brings
            the workspace back.
          </p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-400 px-4 py-2 font-semibold text-black transition hover:bg-yellow-300"
          >
            <RefreshCw size={16} />
            Refresh app
          </button>
        </div>
      </div>
    );
  }
}
