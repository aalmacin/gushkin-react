import { Maybe } from "./types";

export type RemoveMaybe<T, O extends string = "__typename"> = {
  [k in keyof Omit<T, "__typename" | O>]-?: T[k] extends Maybe<infer G> ? G : T[k]
}

// type G1<T> = { [k in keyof RemoveMaybe<T>]-?: T[k] extends Maybe<infer G> ? G : T[k] };

// type DeepRemoveMaybe<T = Activity, O extends string = "__typename"> = { [k in keyof RemoveMaybe<T, O>]-?: RemoveMaybe<T[k]> extends Maybe<infer G> ? G : T[k] };
// type GG = DeepRemoveMaybe<Activity>;
// const a: GG = {
//   actions: [{}]
// };