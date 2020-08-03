export interface ActivityInput {
  description: string;
  fundAmt: number;
  positive: boolean;
}

export interface Activity {
  readonly id: string,
  readonly description: string,
  readonly fundAmt: number,
  readonly positive: boolean,
  readonly userId: string
}

export interface ActivityToday {
  readonly activityId: number,
  readonly description: string,
  readonly fundAmt: number,
  readonly positive: boolean,
  readonly timestamp: number
}