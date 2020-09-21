export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Time: any;
};


export type Activity = {
  __typename?: 'Activity';
  id: Scalars['ID'];
  description: Scalars['String'];
  positive: Scalars['Boolean'];
  fundAmt: Scalars['Int'];
  actions: Array<Maybe<Action>>;
};

export type Action = {
  __typename?: 'Action';
  id: Scalars['ID'];
  actionTimestamp: Scalars['Time'];
  activity: Activity;
};

export type ActionCount = {
  __typename?: 'ActionCount';
  activity: Activity;
  count: Scalars['Int'];
  day: Scalars['String'];
};

export type Wish = {
  __typename?: 'Wish';
  id: Scalars['ID'];
  description: Scalars['String'];
  price: Scalars['Int'];
  source?: Maybe<Scalars['String']>;
  priority: Scalars['String'];
  status: Scalars['String'];
};

export type NewWishInput = {
  description: Scalars['String'];
  price: Scalars['Int'];
  source?: Maybe<Scalars['String']>;
  priority: Priority;
  status: Status;
};

export type UpdateWishInput = {
  id: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  source?: Maybe<Scalars['String']>;
  priority?: Maybe<Priority>;
  status?: Maybe<Status>;
};

export type NewActivityInput = {
  description: Scalars['String'];
  fundAmt: Scalars['Int'];
  positive?: Maybe<Scalars['Boolean']>;
};

export type PerformActivityInput = {
  activityId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createWish: Wish;
  updateWish: Wish;
  createActivity: Activity;
  performActivity: Action;
};


export type MutationCreateWishArgs = {
  input: NewWishInput;
};


export type MutationUpdateWishArgs = {
  input: UpdateWishInput;
};


export type MutationCreateActivityArgs = {
  input: NewActivityInput;
};


export type MutationPerformActivityArgs = {
  input: PerformActivityInput;
};

export enum Priority {
  VeryHigh = 'VERY_HIGH',
  High = 'HIGH',
  Medium = 'MEDIUM',
  Low = 'LOW',
  VeryLow = 'VERY_LOW'
}

export type GetWishInput = {
  filter?: Maybe<Scalars['String']>;
};

export type GetActionInput = {
  today?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  wishes: Array<Maybe<Wish>>;
  activities: Array<Maybe<Activity>>;
  actions: Array<Maybe<Action>>;
  currentFunds: Scalars['Int'];
  actionCount: Array<Maybe<ActionCount>>;
};


export type QueryWishesArgs = {
  input?: Maybe<GetWishInput>;
};


export type QueryActionsArgs = {
  input?: Maybe<GetActionInput>;
};

export enum Status {
  Bought = 'bought',
  NotBought = 'not_bought',
  Disabled = 'disabled'
}