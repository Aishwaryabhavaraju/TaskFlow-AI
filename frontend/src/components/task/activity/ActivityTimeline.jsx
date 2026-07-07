import { useEffect } from "react";

import useActivity from "../../../hooks/useActivity";

import ActivityItem from "./ActivityItem";
import EmptyActivity from "./EmptyActivity";

export default function ActivityTimeline({
  taskId,
}) {

  const {
    activities,
    loading,
    fetchActivities,
  } = useActivity();

  useEffect(() => {
    fetchActivities(taskId);
  }, [taskId]);

  if (loading) {
    return (
      <p>Loading activity...</p>
    );
  }

  if (activities.length === 0) {
    return <EmptyActivity />;
  }

  return (
    <div className="space-y-4">

      {activities.map(activity => (

        <ActivityItem
          key={activity._id}
          activity={activity}
        />

      ))}

    </div>
  );

}