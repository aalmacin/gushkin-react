import { RemoveMaybe } from "graphql/utils";
import { Activity } from "models/Activity/Activity.types";

export type ActivityItem = RemoveMaybe<Activity>;

export type GetActivitiesResponse = {
  activities: ActivityItem[];
};