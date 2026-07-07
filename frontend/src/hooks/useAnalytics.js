import { useState } from "react";
import analyticsService from "../services/analyticsService";

export default function useAnalytics() {
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  const fetchAnalytics = async (
    projectId,
    filters = {}
  ) => {
    try {
      setLoading(true);

      const data =
        await analyticsService.getProjectAnalytics(
          projectId,
          filters
        );

      setAnalytics(data);
    } finally {
      setLoading(false);
    }
  };

  const exportAnalytics = async (
    projectId,
    format,
    filters = {}
  ) => {
    try {
      setExporting(true);

      const blob =
        await analyticsService.exportProjectAnalytics(
          projectId,
          format,
          filters
        );

      const extension =
        format === "excel" ? "xls" : format;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `project-analytics.${extension}`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  return {
    loading,
    exporting,
    analytics,
    fetchAnalytics,
    exportAnalytics,
  };
}
