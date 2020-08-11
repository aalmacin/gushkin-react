import { Activity } from "models/Activity/Activity.types";

export interface Action {
  readonly id: number,
  readonly activity: Activity,
  readonly actionTimestamp: Date,
}

export interface PerformActivityInput {
  activityId: number
}

export interface ActionCount {
  readonly activityId: number,
  readonly count: number,
  readonly day: string,
}