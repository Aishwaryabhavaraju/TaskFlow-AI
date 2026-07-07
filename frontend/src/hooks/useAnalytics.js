import { useState } from "react";
import analyticsService from "../services/analyticsService";

export default function useAnalytics() {

  const [loading, setLoading] =
    useState(false);

  const [analytics, setAnalytics] =
    useState(null);

  const fetchAnalytics = async (
    projectId
  ) => {

    try {

      setLoading(true);

      const data =
        await analyticsService.getProjectAnalytics(
          projectId
        );

      setAnalytics(data);

    } finally {

      setLoading(false);

    }

  };

  return {
    loading,
    analytics,
    fetchAnalytics,
  };
}