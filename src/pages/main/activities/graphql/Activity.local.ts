import { Activity } from "graphql/types";
import { RemoveMaybe } from "graphql/utils";

export type ActivityItem = RemoveMaybe<Activity>;

export type GetActivitiesResponse = {
  activities: ActivityItem[];
};