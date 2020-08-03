export interface PerformActivityInput {
  activityId: number
}

export interface ActionCount {
  readonly activityId: number,
  readonly count: number,
  readonly day: string,
}