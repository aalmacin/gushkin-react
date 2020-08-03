export interface CreateWishInput {
  description: string;
  price: number;
  source?: string;
  priority: Priority;
  status: Status;
}

export enum Priority {
  VERY_HIGH = 'VERY_HIGH',
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
  VERY_LOW = 'VERY_LOW',
}

export enum Status {
  bought = 'bought',
  not_bought = 'not_bought',
  disabled = 'disabled',
}

export interface Wish {
  readonly id: string,
  readonly description: string,
  readonly userId: string,
  readonly price: number,
  readonly source?: string,
  readonly priority: string,
  readonly status: string
}