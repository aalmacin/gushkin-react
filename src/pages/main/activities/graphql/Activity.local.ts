import { Activity } from "graphql/types";
import { Compact, DeepRemoveMaybe } from "graphql/utils";

export type ActivityItem = Compact<DeepRemoveMaybe<Activity> & {fundAmtDisplay: number}>

export type GetActivitiesResponse = {
  activities: ActivityItem[];
};