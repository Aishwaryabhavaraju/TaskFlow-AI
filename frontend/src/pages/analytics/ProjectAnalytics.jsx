import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import AnalyticsHeader from "../../components/analytics/AnalyticsHeader";
import OverviewCards from "../../components/analytics/OverviewCards";
import CompletionChart from "../../components/analytics/CompletionChart";
import StatusChart from "../../components/analytics/StatusChart";
import PriorityChart from "../../components/analytics/PriorityChart";
import ProductivityCard from "../../components/analytics/ProductivityCard";
import DeadlineCard from "../../components/analytics/DeadlineCard";
import TimeTrackingCard from "../../components/analytics/TimeTrackingCard";
import RecentActivityCard from "../../components/analytics/RecentActivityCard";
import AIHealthCard from "../../components/analytics/AIHealthCard";
import CompletionTrendChart from "../../components/analytics/CompletionTrendChart";
import BurndownChart from "../../components/analytics/BurndownChart";
import WorkloadDistribution from "../../components/analytics/WorkloadDistribution";
import CustomReportFilters from "../../components/analytics/CustomReportFilters";

import useAnalytics from "../../hooks/useAnalytics";

const EMPTY_FILTERS = {
  startDate: "",
  endDate: "",
  status: "",
  priority: "",
};

export default function ProjectAnalytics() {
  const { projectId } = useParams();
  const [filters, setFilters] = useState(EMPTY_FILTERS);

  const {
    analytics,
    loading,
    exporting,
    fetchAnalytics,
    exportAnalytics,
  } = useAnalytics();

  const loadReport = () => {
    fetchAnalytics(projectId, filters);
  };

  useEffect(() => {
    loadReport();
  }, [projectId]);

  const resetFilters = () => {
    setFilters(EMPTY_FILTERS);
    fetchAnalytics(projectId, EMPTY_FILTERS);
  };

  return (
    <DashboardLayout>
      <AnalyticsHeader
        analytics={analytics}
        exporting={exporting}
        onExport={(format) =>
          exportAnalytics(projectId, format, filters)
        }
      />

      <CustomReportFilters
        filters={filters}
        onChange={setFilters}
        onApply={loadReport}
        onReset={resetFilters}
      />

      {loading || !analytics ? (
        <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-8 text-center dark:border-zinc-700 dark:bg-zinc-900">
          Loading analytics...
        </div>
      ) : (
        <>
          <div className="mt-6">
            <OverviewCards analytics={analytics} />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <CompletionChart
              progress={analytics.overview.progress}
            />
            <ProductivityCard analytics={analytics} />
            <StatusChart analytics={analytics} />
            <PriorityChart analytics={analytics} />
            <DeadlineCard analytics={analytics} />
            <TimeTrackingCard analytics={analytics} />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <CompletionTrendChart
              analytics={analytics}
            />
            <BurndownChart analytics={analytics} />
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-2">
            <WorkloadDistribution
              analytics={analytics}
            />
            <AIHealthCard analytics={analytics} />
          </div>

          <div className="mt-6">
            <RecentActivityCard analytics={analytics} />
          </div>
        </>
      )}
    </DashboardLayout>
  );
}
