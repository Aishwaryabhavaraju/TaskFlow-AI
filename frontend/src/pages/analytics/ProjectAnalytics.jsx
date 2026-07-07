import { useEffect } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import AnalyticsHeader from "../../components/analytics/AnalyticsHeader";
import OverviewCards from "../../components/analytics/OverviewCards";
import CompletionChart from "../../components/analytics/CompletionChart";
import StatusChart from "../../components/analytics/StatusChart";
import ProductivityCard from "../../components/analytics/ProductivityCard";
import DeadlineCard from "../../components/analytics/DeadlineCard";
import TimeTrackingCard from "../../components/analytics/TimeTrackingCard";
import RecentActivityCard from "../../components/analytics/RecentActivityCard";
import AIHealthCard from "../../components/analytics/AIHealthCard";

import useAnalytics from "../../hooks/useAnalytics";

export default function ProjectAnalytics() {

  const { projectId } = useParams();

  const {
    analytics,
    loading,
    fetchAnalytics,
  } = useAnalytics();

  useEffect(() => {
    fetchAnalytics(projectId);
  }, [projectId]);

  if (loading || !analytics) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <AnalyticsHeader />

      <OverviewCards analytics={analytics} />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <CompletionChart
          progress={analytics.progress}
        />

        <StatusChart
          analytics={analytics}
        />

        <ProductivityCard
          analytics={analytics}
        />

        <DeadlineCard
          analytics={analytics}
        />

        <TimeTrackingCard
          analytics={analytics}
        />

        <AIHealthCard
          analytics={analytics}
        />

      </div>

      <div className="mt-8">

        <RecentActivityCard
          analytics={analytics}
        />

      </div>

    </DashboardLayout>
  );
}