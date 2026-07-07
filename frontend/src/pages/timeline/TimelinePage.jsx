import { useEffect } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import TimelineHeader from "../../components/timeline/TimelineHeader";
import TimelineContainer from "../../components/timeline/TimelineContainer";
import TimelineGrid from "../../components/timeline/TimelineGrid";

import useTimeline from "../../hooks/useTimeline";

export default function TimelinePage() {

  const {
    loading,
    tasks,
    fetchTimeline,
  } = useTimeline();

  useEffect(() => {

    fetchTimeline();

  }, []);

  return (
    <DashboardLayout>

      <TimelineHeader />

      <TimelineContainer>

        {loading ? (

          <p className="py-10 text-center">

            Loading Timeline...

          </p>

        ) : (

          <TimelineGrid tasks={tasks} />

        )}

      </TimelineContainer>

    </DashboardLayout>
  );
}