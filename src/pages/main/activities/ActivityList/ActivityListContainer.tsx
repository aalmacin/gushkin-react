import React from "react";
import { useActivityListUILogic } from './useActivityListUILogic';
import ActivityList from './ActivityList';

export default function ActivityListContainer() {
  const { addActivity, activities, loading } = useActivityListUILogic();

  if (loading) {
    return null;
  }

  return (
    <ActivityList activities={activities} addActivity={addActivity} />
  );
}

