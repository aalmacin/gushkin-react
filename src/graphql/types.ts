export interface CreateWishInput {
  description: string;
  price: number;
  source?: string;
  priority: Priority;
  status: Status;
}

export enum Priority {
  VERY_HIGH = "VERY_HIGH",
  HIGH = "HIGH",
  MEDIUM = "MEDIUM",
  LOW = "LOW",
  VERY_LOW = "VERY_LOW",
}

export enum Status {
  bought = "bought",
  not_bought = "not_bought",
  disabled = "disabled",
}

export interface Wish {
  readonly id: string;
  readonly description: string;
  readonly userId: string;
  readonly price: number;
  readonly source?: string;
  readonly priority: string;
  readonly status: string;
}

export interface ActivityInput {
  description: string;
  fundAmt: number;
  positive: boolean;
}

export interface Activity {
  readonly id: string;
  readonly description: string;
  readonly fundAmt: number;
  readonly positive: boolean;
  readonly userId: string;
}

export interface ActivityToday {
  readonly activityId: number;
  readonly description: string;
  readonly fundAmt: number;
  readonly positive: boolean;
  readonly actionTimestamp: number;
}

export interface Action {
  readonly id: number;
  readonly activity: Activity;
  readonly actionTimestamp: Date;
}

export interface PerformActivityInput {
  activityId: number;
}

export interface ActionCount {
  readonly activityId: number;
  readonly count: number;
  readonly day: string;
}
